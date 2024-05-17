import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { Task_logsDetails } from '../task_logs.types';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Task_logService } from '../task_logs.service';

@Component({
    selector: 'task_log-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [MatDialog], // Removed imports from here
})
export class Task_logDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    task_log: Task_logsDetails;
    task_logForm: FormGroup; // No need to initialize here

    // Private
    private _unsubscribeAll: Subject<void> = new Subject<void>(); // Changed type to void
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<Task_logDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _task_logService: Task_logService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        const task_logID = this.data.task_logid;

        // Fetch task_log details
        this._task_logService.getTask_logDetails(task_logID)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    // Assign fetched task_log details
                    this.task_log = response;
                    // Initialize task_log form
                    this.initTask_logForm();
                    // Trigger change detection
                    this._changeDetectorRef.markForCheck();
                },
                error => {
                    // Handle errors here
                }
            );
    }
        
    initTask_logForm(): void {
        // Create form group with task_log details
        this.task_logForm = this._formBuilder.group({
            id              : [this.task_log.id],
       
            companyID       : [this.task_log.companyID],
            createdAt       : [this.task_log.createdAt],
        });
        
        // Fill the form
        this.task_logForm.patchValue({
            id              : this.task_log.id,
            companyID       : this.task_log.companyID,
            createdAt       : this.task_log.createdAt,
        });
        
        // Subscribe to form value changes
        this.task_logForm.valueChanges
            .pipe(
                tap((value) => {
                    // Update task_log object when form values change
                    this.task_log = { ...this.task_log, ...value };
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                // Update task_log on the server
         
                // Trigger change detection
                this._changeDetectorRef.markForCheck();
            });
    }
    

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    deleteTask_log(): void {
        // Open confirmation dialog for task_log deletion
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete task_log',
            message: 'Are you sure you want to remove this task_log? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If confirmed, delete the task_log
            if (result === 'confirmed') {
                const task_log = this.task_logForm.getRawValue();
                this._task_logService.deleteTask_log(task_log.id).subscribe(() => {
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
