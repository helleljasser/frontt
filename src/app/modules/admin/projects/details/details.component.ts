import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { ProjectsDetails } from '../projects.types';

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectService } from '../projects.service';

@Component({
    selector: 'project-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports        : [CommonModule,MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [MatDialog], // Removed imports from here
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    project: ProjectsDetails;
    projectForm: FormGroup; // No need to initialize here

    // Private
    private _unsubscribeAll: Subject<void> = new Subject<void>(); // Changed type to void
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<ProjectDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _projectService: ProjectService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        const projectID = this.data.projectid;

        // Fetch project details
        this._projectService.getProjectDetails(projectID)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    // Assign fetched project details
                    this.project = response;
                    // Initialize project form
                    this.initProjectForm();
                    // Trigger change detection
                    this._changeDetectorRef.markForCheck();
                },
                error => {
                    // Handle errors here
                }
            );
    }
        
    initProjectForm(): void {
        // Create form group with project details
         // Prepare the project form
         this.projectForm = this._formBuilder.group({
            id: [this.project.id],
            name: [this.project.name, Validators.required],
            type: [this.project.type, Validators.required],
            description: [this.project.description],
            status: [this.project.status],
            start_date: [this.project.start_date],
            end_date: [this.project.end_date],
            budget: [this.project.budget],
            priority: [this.project.priority],
            // categories: [this.project.categories],
            product_ownerName: [this.project.product_owner_name],
            companyID: [this.project.company_id],
            companyName: [this.project.companyName],
            createdAt: [this.project.createdAt],
        });
        
        // Fill the form
        this.projectForm.patchValue({
            id: this.project.id,
            name: this.project.name,
            type: this.project.type,
            description: this.project.description,
            status: this.project.status,
            start_date: this.project.start_date,
            end_date: this.project.end_date,
            budget: this.project.budget,
            priority: this.project.priority,
            // categories: this.project.categories,
            
            product_ownerName: this.project.product_owner_name,
            companyID: this.project.company_id,
            companyName: this.project.companyName,
            createdAt: this.project.createdAt,
            // Add other properties if needed
        });
        

    
        // Subscribe to form value changes
        this.projectForm.valueChanges
            .pipe(
                tap((value) => {
                    // Update project object when form values change
                    this.project = { ...this.project, ...value };
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                // Update project on the server
                this._projectService.updateProject(this.project.id, value).subscribe();
                // Trigger change detection
                this._changeDetectorRef.markForCheck();
            });
    }
    

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    updateProject(): void {
        // Update project with form data
        const project = this.projectForm.getRawValue();
        this._projectService.updateProject(this.project.id, project).subscribe(() => {
            // Show success message
            this.showFlashMessage('success');
        });
    }

    deleteProject(): void {
        // Open confirmation dialog for project deletion
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete project',
            message: 'Are you sure you want to remove this project? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If confirmed, delete the project
            if (result === 'confirmed') {
                const project = this.projectForm.getRawValue();
                this._projectService.deleteProject(project.id).subscribe(() => {
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
