import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { Issue_commentsDetails } from '../issue_comments.types';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Issue_commentService } from '../issue_comments.service';

@Component({
    selector: 'issue_comment-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [MatDialog], // Removed imports from here
})
export class Issue_commentDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    issue_comment: Issue_commentsDetails;
    issue_commentForm: FormGroup; // No need to initialize here

    // Private
    private _unsubscribeAll: Subject<void> = new Subject<void>(); // Changed type to void
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<Issue_commentDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _issue_commentService: Issue_commentService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        const issue_commentID = this.data.issue_commentid;

        // Fetch issue_comment details
        this._issue_commentService.getIssue_commentDetails(issue_commentID)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    // Assign fetched issue_comment details
                    this.issue_comment = response;
                    // Initialize issue_comment form
                    this.initIssue_commentForm();
                    // Trigger change detection
                    this._changeDetectorRef.markForCheck();
                },
                error => {
                    // Handle errors here
                }
            );
    }
        
    initIssue_commentForm(): void {
        // Create form group with issue_comment details
        this.issue_commentForm = this._formBuilder.group({
          
            content: [this.issue_comment.content, Validators.required],

            projectID: [this.issue_comment.projectID],
            companyID: [this.issue_comment.companyID],
  
            createdAt: [this.issue_comment.createdAt],
        });
        
        // Remplissez le formulaire avec les valeurs existantes
        this.issue_commentForm.patchValue({
            id: this.issue_comment.id,
            content: this.issue_comment.content,
            projectID: this.issue_comment.projectID,
  
   
            createdAt: this.issue_comment.createdAt,
        });
        // Subscribe to form value changes
        this.issue_commentForm.valueChanges
            .pipe(
                tap((value) => {
                    // Update issue_comment object when form values change
                    this.issue_comment = { ...this.issue_comment, ...value };
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                // Update issue_comment on the server
                this._issue_commentService.updateIssue_comment(this.issue_comment.id, value).subscribe();
                // Trigger change detection
                this._changeDetectorRef.markForCheck();
            });
    }
    

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    updateIssue_comment(): void {
        // Update issue_comment with form data
        const issue_comment = this.issue_commentForm.getRawValue();
        this._issue_commentService.updateIssue_comment(this.issue_comment.id, issue_comment).subscribe(() => {
            // Show success message
            this.showFlashMessage('success');
        });
    }

    deleteIssue_comment(): void {
        // Open confirmation dialog for issue_comment deletion
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete issue_comment',
            message: 'Are you sure you want to remove this issue_comment? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If confirmed, delete the issue_comment
            if (result === 'confirmed') {
                const issue_comment = this.issue_commentForm.getRawValue();
                this._issue_commentService.deleteIssue_comment(issue_comment.id).subscribe(() => {
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
