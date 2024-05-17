import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { assign } from 'lodash-es';
import { DateTime } from 'luxon';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { notification } from '../notifications.types';

import { MatSelectModule } from '@angular/material/select';
import { NotificationService } from '../notifications.service';



@Component({
    selector       : 'notification-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
})
export class NotificationDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    notification: notification;
    notificationForm: UntypedFormGroup;
 

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    flashMessage: string;
    selectedProjectForm: any;
    private _fuseConfirmationService: any;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<NotificationDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
   
        private _testService: NotificationService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the board

         // Get the board
this.notification = {
    id: '1',
    type: 'email',
    content: 'You have a new email.',
    seen: 'false',
    createdAt: '2024-04-08T12:00:00Z',
};

   // Prepare the notification form
this.notificationForm = this._formBuilder.group({
    id          : [this.notification.id],
    type   : [this.notification.type, Validators.required],
    content    : [this.notification.content, Validators.required],
    seen       : [this.notification.seen, Validators.email],
    createdAt   : [this.notification.createdAt],
});

// Fill the form
this.notificationForm.patchValue({
    id          : this.notification.id,
    type   : this.notification.type,
    content    : this.notification.content,
    seen       : this.notification.seen,
    createdAt   : this.notification.createdAt,
  
});


        // Update notification when there is a value change on the notification form
        this.notificationForm.valueChanges
            .pipe(
                tap((value) =>
                {
                    // Update the notification object
                    this.notification = assign(this.notification, value);
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) =>
            {
                // Update the notification on the server
                this._testService.update(value).subscribe();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Return whether the notification has the given label
   
    /**
     * Filter labels
     *
    
    /**
     * Filter labels input key down event
     *
   

    /**
     * Toggle notification label
     *
     * @param label
     * @param change
     */
    

    /**
     * Add label to the notification
     *
     * @param label
     */
  

    /**
     * Remove label from the notification
     *
     * @param label
     */
    

    /**
     * Check if the given date is overdue
     */
    isOverdue(date: string): boolean
    {
        return DateTime.fromISO(date).startOf('day') < DateTime.now().startOf('day');
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read the given file for demonstration purposes
     *
     * @param file
     */
    private _readAsDataURL(file: File): Promise<any>
    {
        // Return a new promise
        return new Promise((resolve, reject) =>
        {
            // Create a new reader
            const reader = new FileReader();

            // Resolve the promise on success
            reader.onload = (): void =>
            {
                resolve(reader.result);
            };

            // Reject the promise on error
            reader.onerror = (e): void =>
            {
                reject(e);
            };

            // Read the file as the
            reader.readAsDataURL(file);
        });
    }



     /**
     * Update the selected project using the form data
     */
     updateSelectedProject(): void
     {
         // Get the project object
         const project = this.selectedProjectForm.getRawValue();
 
         // Remove the currentImageIndex field
         delete project.currentImageIndex;
 
         // Update the project on the server
         this._testService.updateProject(project.id, project).subscribe(() =>
         {
             // Show a success message
             this.showFlashMessage('success');
         });
     }
 
     /**
      * Delete the selected project using the form data
      */
     deleteSelectedProject(): void
     {
         // Open the confirmation dialog
         const confirmation = this._fuseConfirmationService.open({
             title  : 'Delete project',
             message: 'Are you sure you want to remove this project? This action cannot be undone!',
             actions: {
                 confirm: {
                     label: 'Delete',
                 },
             },
         });
 
         // Subscribe to the confirmation dialog closed action
         confirmation.afterClosed().subscribe((result) =>
         {
             // If the confirm button pressed...
             if ( result === 'confirmed' )
             {
                 // Get the project object
                 const project = this.selectedProjectForm.getRawValue();
 
                 // Delete the project on the server
                 this._testService.deleteProject(project.id).subscribe(() =>
                 {
                     // Close the details
                     this.closeDetails();
                 });
             }
         });
     }
    closeDetails() {
        throw new Error('Method not implemented.');
    }
 
     /**
      * Show flash message
      */
     showFlashMessage(type: 'success' | 'error'): void
     {
         // Show the message
         this.flashMessage = type;
 
         // Mark for check
         this._changeDetectorRef.markForCheck();
 
         // Hide it after 3 seconds
         setTimeout(() =>
         {
             this.showFlashMessage = null;
 
             // Mark for check
             this._changeDetectorRef.markForCheck();
         }, 3000);
     }
}
