import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { assign } from 'lodash-es';
import { DateTime } from 'luxon';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { UsersDetails } from '../../users.types';

import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';
import { UsersListComponent } from '../../users.component';
import { UserService } from '../../users.service';



@Component({
    selector       : 'user-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatDialogModule ,MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [{ 
        provide: MatDialogRef,
        useValue: []
         },MatDrawer]
})
export class UserDetailsComponent implements OnInit, OnDestroy
{ 
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;

    user: UsersDetails;
    userForm: UntypedFormGroup;
 

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    flashMessage: string;
    selectedProjectForm: any;
    private _fuseConfirmationService: any;
    private _usersListComponent: UsersListComponent;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<UserDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _userService: UserService,
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
       
        // this.user =this._userService.user
        // console.log(this.user);
        

//    // Prepare the user form
// this.userForm = this._formBuilder.group({
//     id          : [this.user.id],
//     firstname   : [this.user.firstname, Validators.required],
//     lastname    : [this.user.lastname, Validators.required],
//     email       : [this.user.email, Validators.email],
//     country     : [this.user.country],
//     status      : [this.user.status],
//     createdAt   : [this.user.createdAt],
//     dateOfBirth : [this.user.dateOfBirth],
//     gender      : [this.user.gender],
//     address     : [this.user.address],
//     phoneNumber : [this.user.phoneNumber],
//     dateOfHire  : [this.user.dateOfHire],
//     lastLogin   : [this.user.lastLogin],
//     department_name : [this.user.department_name],
//     role     : [this.user.role],
//     company_id  : [this.user.company_id],
// });

// // Fill the form
// this.userForm.patchValue({
//     id          : this.user.id,
//     firstname   : this.user.firstname,
//     lastname    : this.user.lastname,
//     email       : this.user.email,
//     country     : this.user.country,
//     status      : this.user.status,
//     createdAt   : this.user.createdAt,
//     dateOfBirth : this.user.dateOfBirth,
//     gender      : this.user.gender,
//     address     : this.user.address,
//     phoneNumber : this.user.phoneNumber,
//     dateOfHire  : this.user.dateOfHire,
//     lastLogin   : this.user.lastLogin,
//     department_name : this.user.department_name,
//     role     : this.user.role,
//     company_id  : this.user.company_id,
// });


        // Update user when there is a value change on the user form
        this.userForm.valueChanges
            .pipe(
                tap((value) =>
                {
                    // Update the user object
                    this.user = assign(this.user, value);
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) =>
            {
                // Update the user on the server
                this._userService.UpdateUser(this.user.id,  value).subscribe();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }
 thsi
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
     * Return whether the user has the given label
   
    /**
     * Filter labels
     *
    
    /**
     * Filter labels input key down event
     *
   

    /**
     * Toggle user label
     *
     * @param label
     * @param change
     */
    

    /**
     * Add label to the user
     *
     * @param label
     */
  

    /**
     * Remove label from the user
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
                 this._userService.deleteUser(this.user.id).subscribe(() =>
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
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._usersListComponent.matDrawer.close();
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
