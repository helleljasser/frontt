import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { CompaniesDetails } from '../companies.types';

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CompanyService } from '../companies.service';

@Component({
    selector: 'company-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports        : [CommonModule,MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [MatDialog], // Removed imports from here
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    company: CompaniesDetails;
    companyForm: FormGroup; // No need to initialize here

    // Private
    private _unsubscribeAll: Subject<void> = new Subject<void>(); // Changed type to void
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<CompanyDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _companyService: CompanyService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        const companyID = this.data.Companyid;

        this._companyService.getCompanyDetails(companyID)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.company = response;
                    this.initCompanyForm(); // Initialize form after fetching company details
                    this._changeDetectorRef.markForCheck();
                },
                error => {
                    // Handle errors here
                }
            );
    }
        
    initCompanyForm(): void {
        this.companyForm = this._formBuilder.group({
            name: [this.company?.name || '', Validators.required],
            website: [this.company?.website || '', Validators.required],
            email: [this.company?.email || '', Validators.email],
            phone_number: [this.company?.phone_number || ''],
            country_code: [this.company?.country_code || ''],
            address: [this.company?.address || ''],
            createdAt: [this.company?.createdAt || ''],
        });

        this.companyForm.valueChanges
            .pipe(
                tap((value) => {
                    this.company = { ...this.company, ...value };
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                this._companyService.updateCompany(this.company.id, value).subscribe();
            });
    }
    

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    updateCompany(): void {
        const company = this.companyForm.getRawValue();
        this._companyService.updateCompany(this.company.id, company).subscribe(() => {
            this.showFlashMessage('success');
        });
    }

    deleteCompany(): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete company',
            message: 'Are you sure you want to remove this company? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                const company = this.companyForm.getRawValue();
                this._companyService.deleteCompany(company.id).subscribe(() => {
                    this.closeDetails();
                });
            }
        });
    }

    closeDetails(): void {
        this.matDialogRef.close(); 
    }

    showFlashMessage(type: 'success' | 'error'): void {
        this.flashMessage = type;

        setTimeout(() => {
            this.flashMessage = null;
        }, 3000);
    }
}