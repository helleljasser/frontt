import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { ListService } from '../lists.service';
import { ListsDetails } from '../lists.types';

@Component({
    selector: 'list-add',
    templateUrl: './addlist.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone:true,
    imports        : [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
})
export class AddListComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: any;
    list: ListsDetails;
    listForm: FormGroup;
    flashMessage: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public matDialogRef: MatDialogRef<AddListComponent>,
        private _formBuilder: FormBuilder,
        private _listService: ListService,
    ) {}

    ngOnInit(): void {
        this.listForm = this._formBuilder.group({
            // Prepare the list form
            id          : [this.list.id],
            title   : [this.list.title, Validators.required],
            position    : [this.list.position, Validators.required]

});

// Fill the form
this.listForm.patchValue({
    id          : this.list.id,
    title   : this.list.title,
    position    : this.list.position,


});
      
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    addList(): void
    {
        // Get the project object
        const list =  this.listForm.getRawValue();



        // Update the project on the server
        this._listService.createList( list).subscribe(() =>
        {
            // Show a success message
            this.showFlashMessage('success');
        });
    }

   


    
    

    closeDialog(): void {
        this.matDialogRef.close();
    }

    showFlashMessage(type: 'success' | 'error'): void {
        this.flashMessage = type;
        setTimeout(() => {
            this.flashMessage = null;
        }, 3000);
    }
}
