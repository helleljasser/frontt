import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { Issue_logsDetails } from '../issue_logs.types';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Issue_logService } from '../issue_logs.service';

@Component({
    selector: 'issue_log-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [MatDialog], // Removed imports from here
})
export class Issue_logDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    issue_log: Issue_logsDetails;
    issue_logForm: FormGroup; // No need to initialize here

    // Private
    private _unsubscribeAll: Subject<void> = new Subject<void>(); // Changed type to void
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<Issue_logDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _issue_logService: Issue_logService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        const issue_logID = this.data.issue_logid;

        // Fetch issue_log details
        this._issue_logService.getIssue_logDetails(issue_logID)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    // Assign fetched issue_log details
                    this.issue_log = response;
                    // Initialize issue_log form
                    this.initIssue_logForm();
                    // Trigger change detection
                    this._changeDetectorRef.markForCheck();
                },
                error => {
                    // Handle errors here
                }
            );
    }
        
    initIssue_logForm(): void {
        // Create form group with issue_log details
        this.issue_logForm = this._formBuilder.group({
            id              : [this.issue_log.id],
       
            companyID       : [this.issue_log.companyID],
            createdAt       : [this.issue_log.createdAt],
        });
        
        // Fill the form
        this.issue_logForm.patchValue({
            id              : this.issue_log.id,
            companyID       : this.issue_log.companyID,
            createdAt       : this.issue_log.createdAt,
        });
        
        // Subscribe to form value changes
        this.issue_logForm.valueChanges
            .pipe(
                tap((value) => {
                    // Update issue_log object when form values change
                    this.issue_log = { ...this.issue_log, ...value };
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                // Update issue_log on the server
         
                // Trigger change detection
                this._changeDetectorRef.markForCheck();
            });
    }
    

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    deleteIssue_log(): void {
        // Open confirmation dialog for issue_log deletion
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete issue_log',
            message: 'Are you sure you want to remove this issue_log? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If confirmed, delete the issue_log
            if (result === 'confirmed') {
                const issue_log = this.issue_logForm.getRawValue();
                this._issue_logService.deleteIssue_log(issue_log.id).subscribe(() => {
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
