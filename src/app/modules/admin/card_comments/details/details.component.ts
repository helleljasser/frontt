import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { Card_commentsDetails } from '../card_comments.types';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Card_commentService } from '../card_comments.service';

@Component({
    selector: 'card_comment-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [MatDialog], // Removed imports from here
})
export class Card_commentDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    card_comment: Card_commentsDetails;
    card_commentForm: FormGroup; // No need to initialize here

    // Private
    private _unsubscribeAll: Subject<void> = new Subject<void>(); // Changed type to void
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<Card_commentDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _card_commentService: Card_commentService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        const card_commentID = this.data.card_commentid;

        // Fetch card_comment details
        this._card_commentService.getCard_commentDetails(card_commentID)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    // Assign fetched card_comment details
                    this.card_comment = response;
                    // Initialize card_comment form
                    this.initCard_commentForm();
                    // Trigger change detection
                    this._changeDetectorRef.markForCheck();
                },
                error => {
                    // Handle errors here
                }
            );
    }
        
    initCard_commentForm(): void {
        // Create form group with card_comment details
        this.card_commentForm = this._formBuilder.group({
          
            content: [this.card_comment.content, Validators.required],

            projectID: [this.card_comment.projectID],
            companyID: [this.card_comment.companyID],
  
            createdAt: [this.card_comment.createdAt],
        });
        
        // Remplissez le formulaire avec les valeurs existantes
        this.card_commentForm.patchValue({
            id: this.card_comment.id,
            content: this.card_comment.content,
            projectID: this.card_comment.projectID,
  
   
            createdAt: this.card_comment.createdAt,
        });
        // Subscribe to form value changes
        this.card_commentForm.valueChanges
            .pipe(
                tap((value) => {
                    // Update card_comment object when form values change
                    this.card_comment = { ...this.card_comment, ...value };
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                // Update card_comment on the server
                this._card_commentService.updateCard_comment(this.card_comment.id, value).subscribe();
                // Trigger change detection
                this._changeDetectorRef.markForCheck();
            });
    }
    

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    updateCard_comment(): void {
        // Update card_comment with form data
        const card_comment = this.card_commentForm.getRawValue();
        this._card_commentService.updateCard_comment(this.card_comment.id, card_comment).subscribe(() => {
            // Show success message
            this.showFlashMessage('success');
        });
    }

    deleteCard_comment(): void {
        // Open confirmation dialog for card_comment deletion
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete card_comment',
            message: 'Are you sure you want to remove this card_comment? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If confirmed, delete the card_comment
            if (result === 'confirmed') {
                const card_comment = this.card_commentForm.getRawValue();
                this._card_commentService.deleteCard_comment(card_comment.id).subscribe(() => {
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
