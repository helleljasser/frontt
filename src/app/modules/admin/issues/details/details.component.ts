import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { IssuesDetails } from '../issues.types';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { IssueService } from '../issues.service';

@Component({
    selector: 'issue-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [MatDialog], // Removed imports from here
})
export class IssueDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    issue: IssuesDetails;
    issueForm: FormGroup; // No need to initialize here

    // Private
    private _unsubscribeAll: Subject<void> = new Subject<void>(); // Changed type to void
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<IssueDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _issueService: IssueService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        const issueID = this.data.issueid;

        // Fetch issue details
        this._issueService.getIssueDetails(issueID)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    // Assign fetched issue details
                    this.issue = response;
                    // Initialize issue form
                    this.initIssueForm();
                    // Trigger change detection
                    this._changeDetectorRef.markForCheck();
                },
                error => {
                    // Handle errors here
                }
            );
    }
        
    initIssueForm(): void {
        // Create form group with issue details
        this.issueForm = this._formBuilder.group({
            start_date: [this.issue.start_date],
            end_date: [this.issue.end_date],
            status: [this.issue.status],
            priority: [this.issue.priority],
            assigned_to: [this.issue.assigned_to],
            project_id: [this.issue.project_id],
            task_id: [this.issue.task_id],
        });

        // Subscribe to form value changes
        this.issueForm.valueChanges
            .pipe(
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                // Update issue on the server
                this._issueService.updateIssue(this.issue.id, value).subscribe();
            });
    }
    
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    updateIssue(): void {
        // Update issue with form data
        const issue = this.issueForm.getRawValue();
        this._issueService.updateIssue(issue.id, issue).subscribe(() => {
            // Show success message
            this.showFlashMessage('success');
        });
    }

    deleteIssue(): void {
        // Open confirmation dialog for issue deletion
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete issue',
            message: 'Are you sure you want to remove this issue? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If confirmed, delete the issue
            if (result === 'confirmed') {
                const issue = this.issueForm.getRawValue();
                this._issueService.deleteIssue(issue.id).subscribe(() => {
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
