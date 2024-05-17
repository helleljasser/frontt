import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { CategoriesDetails } from '../categories.types';

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CategoryService } from '../categories.service';

@Component({
    selector: 'category-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [CommonModule,MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [MatDialog], // Removed imports from here
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    category: CategoriesDetails;
    categoryForm: FormGroup; // No need to initialize here

    // Private
    private _unsubscribeAll: Subject<void> = new Subject<void>(); // Changed type to void
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<CategoryDetailsComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _categoryService: CategoryService,
        private _fuseConfirmationService: FuseConfirmationService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const categoryID = this.data.categoryid;
      this.categoryForm= this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            description: ['', Validators.required],
            color: [''],
            companyID: [''],
            createdAt: ['']
        });
        // Fetch category details
        this._categoryService.getCategoryDetails(categoryID)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            (response) => {
                this.category = response;
                this.initCategoryForm(); // Initialize form
    
                this.cdr.detectChanges(); // Trigger change detection manually
            },
            (error) => {
                // Handle errors
            }
        );
    }
        
    initCategoryForm(): void {
        // Create form group with category details
        this.categoryForm = this._formBuilder.group({
            id              : [this.category.id],
            name           : [this.category.name, Validators.required],
            description     : [this.category.description, Validators.required],
            color            : [this.category.color],
            companyID       : [this.category.companyID],
            createdAt       : [this.category.createdAt],
        });
        
        // Fill the form
        this.categoryForm.patchValue({
            id              : this.category.id,
            name           : this.category.name,
            description     : this.category.description,
            color            : this.category.color,
            companyID       : this.category.companyID,
            createdAt       : this.category.createdAt,
        });
        // Subscribe to form value changes
        this.categoryForm.valueChanges
            .pipe(
                tap((value) => {
                    // Update category object when form values change
                    this.category = { ...this.category, ...value };
                }),
                debounceTime(300),  
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                // Update category on the server
                this._categoryService.updateCategory(this.category.id, value).subscribe();
                // Trigger change detection
                
            });
    }
    

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    updateCategory(): void {
        // Update category with form data
        const category = this.categoryForm.getRawValue();
        this._categoryService.updateCategory(this.category.id, category).subscribe(() => {
            // Show success message
            this.showFlashMessage('success');
        });
    }

    deleteCategory(): void {
        // Open confirmation dialog for category deletion
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete category',
            message: 'Are you sure you want to remove this category? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If confirmed, delete the category
            if (result === 'confirmed') {
                const category = this.categoryForm.getRawValue();
                this._categoryService.deleteCategory(category.id).subscribe(() => {
                    // Trigger change detection and close dialog
                    this.closeDetails();
                });
            }
        });
    }

    closeDetails(): void {
        // Close dialog
        this.matDialogRef.close(); 
    }

    showFlashMessage(type: 'success' | 'error'): void {
        // Show flash message
        this.flashMessage = type;
        // Trigger change detection

        // Hide message after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;
            // Trigger change detection
        }, 3000);
    }
}
