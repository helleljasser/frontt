import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf, } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { CategoryService } from '../categories.service';
import { CategoryIn } from '../categories.types';

@Component({
    selector: 'category-add',
    templateUrl: './addcategory.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone:true,
    imports        : [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],

})
export class AddCategoryComponent implements OnInit, OnDestroy {
    
    category: CategoryIn;
    categoryForm: FormGroup;
    flashMessage: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
color: string;


    constructor(
        public matDialogRef: MatDialogRef<AddCategoryComponent>,
        private _formBuilder: FormBuilder,
        private _categoryService: CategoryService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        

        this.color='#0000000'
        this.category = {
            name: '',
            description: '',
            color: ''
        };
    
        // Initialize the form with FormGroup instance
        this.categoryForm = this._formBuilder.group({
            name: [this.category.name, Validators.required],
            description: [this.category.description, Validators.required],
            color: [this.color]
        });

      
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    

    addCategory(): void
    {
        // Get the project object
        const category =  this.categoryForm.getRawValue();



        // Update the project on the server
        this._categoryService.createCategory( category).subscribe(() =>
        { this._changeDetectorRef.markForCheck();
            // Show a success message
            this.showFlashMessage('success');
        });
    }

   


    
    
    closeDetails(): void {
        // Close dialog
        this.matDialogRef.close(); 
        // Force change detection
        this._changeDetectorRef.markForCheck(); 
    }
    

    showFlashMessage(type: 'success' | 'error'): void {
        this.flashMessage = type;
        setTimeout(() => {
            this.flashMessage = null;
        }, 3000);
    }
}
