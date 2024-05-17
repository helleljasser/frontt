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
import { task } from '../tasks.types';

import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../tasks.service';



@Component({
    selector       : 'task-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
})
export class TaskDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    task: task;
    taskForm: UntypedFormGroup;
 

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    flashMessage: string;
    selectedProjectForm: any;
    private _fuseConfirmationService: any;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<TaskDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
   
        private _testService: TaskService,
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

        this.task = {
            id: '1',
            name: 'Sample Task',
            description: 'This is a sample task description.',
            start_date: new Date('2024-04-11'),
            end_date: new Date('2024-04-30'),
            status: 'In Progress',
            priority: 'High',
            done_ratio: 50,
            files_path: ['/path/to/file1', '/path/to/file2'],
            categories: ['Category1', 'Category2'],
            assignedTo: 'user1',
            projectID: 'project1',
            task_parentID: 'parentTask1',
            categoryID: 'category1',
            createdAt: new Date('2024-04-10T10:00:00'),
          };
        

       this.taskForm = this._formBuilder.group({
            id: [this.task.id],
            name: [this.task.name, Validators.required],
            description: [this.task.description],
            start_date: [this.task.start_date],
            end_date: [this.task.end_date],
            status: [this.task.status],
            priority: [this.task.priority],
            done_ratio: [this.task.done_ratio],
            files_path: [this.task.files_path],
            categories: [this.task.categories],
            assignedTo: [this.task.assignedTo],
            projectID: [this.task.projectID],
            task_parentID: [this.task.task_parentID],
            categoryID: [this.task.categoryID],
            createdAt: [this.task.createdAt],
          });
          
          // Fill the form with task data
          this.taskForm.patchValue({
            id: this.task.id,
            name: this.task.name,
            description: this.task.description,
            start_date: this.task.start_date,
            end_date: this.task.end_date,
            status: this.task.status,
            priority: this.task.priority,
            done_ratio: this.task.done_ratio,
            files_path: this.task.files_path,
            categories: this.task.categories,
            assignedTo: this.task.assignedTo,
            projectID: this.task.projectID,
            task_parentID: this.task.task_parentID,
            categoryID: this.task.categoryID,
            createdAt: this.task.createdAt,
          });


        // Update task when there is a value change on the task form
        this.taskForm.valueChanges
            .pipe(
                tap((value) =>
                {
                    // Update the task object
                    this.task = assign(this.task, value);
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) =>
            {
                // Update the task on the server
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
     * Return whether the task has the given label
   
    /**
     * Filter labels
     *
    
    /**
     * Filter labels input key down event
     *
   

    /**
     * Toggle task label
     *
     * @param label
     * @param change
     */
    

    /**
     * Add label to the task
     *
     * @param label
     */
  

    /**
     * Remove label from the task
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
