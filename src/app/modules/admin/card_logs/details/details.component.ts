import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { Card_logsDetails } from '../card_logs.types';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Card_logService } from '../card_logs.service';

@Component({
    selector: 'card_log-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [MatDialog], // Removed imports from here
})
export class Card_logDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    card_log: Card_logsDetails;
    card_logForm: FormGroup; // No need to initialize here

    // Private
    private _unsubscribeAll: Subject<void> = new Subject<void>(); // Changed type to void
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<Card_logDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _card_logService: Card_logService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        const card_logID = this.data.card_logid;

        // Fetch card_log details
        this._card_logService.getCard_logDetails(card_logID)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    // Assign fetched card_log details
                    this.card_log = response;
                    // Initialize card_log form
                    this.initCard_logForm();
                    // Trigger change detection
                    this._changeDetectorRef.markForCheck();
                },
                error => {
                    // Handle errors here
                }
            );
    }
        
    initCard_logForm(): void {
        // Create form group with card_log details
        this.card_logForm = this._formBuilder.group({
            id              : [this.card_log.id],
       
            companyID       : [this.card_log.companyID],
            createdAt       : [this.card_log.createdAt],
        });
        
        // Fill the form
        this.card_logForm.patchValue({
            id              : this.card_log.id,
            companyID       : this.card_log.companyID,
            createdAt       : this.card_log.createdAt,
        });
        
        // Subscribe to form value changes
        this.card_logForm.valueChanges
            .pipe(
                tap((value) => {
                    // Update card_log object when form values change
                    this.card_log = { ...this.card_log, ...value };
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                // Update card_log on the server
         
                // Trigger change detection
                this._changeDetectorRef.markForCheck();
            });
    }
    

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    deleteCard_log(): void {
        // Open confirmation dialog for card_log deletion
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete card_log',
            message: 'Are you sure you want to remove this card_log? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If confirmed, delete the card_log
            if (result === 'confirmed') {
                const card_log = this.card_logForm.getRawValue();
                this._card_logService.deleteCard_log(card_log.id).subscribe(() => {
                    // Trigger change detection and close dialog
                    this._changeDetectorRef.detectChanges();
                    this.closeDetails();
                });
            }
        });
    }

    closeDetails(): void {
        // Close dialog
        this.matDialogRef.close(); 
        this._changeDetectorRef.markForCheck();
    }

    showFlashMessage(type: 'success' | 'error'): void {
        // Show flash message
        this.flashMessage = type;
        // Trigger change detection
        this._changeDetectorRef.detectChanges();

        // Hide message after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;
            // Trigger change detection
            this._changeDetectorRef.detectChanges();
        }, 3000);
    }
}
