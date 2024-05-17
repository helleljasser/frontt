import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { PermissionService } from '../permissions.service';
import { PermissionsDetails } from '../permissions.types';

@Component({
    selector: 'permission-add',
    templateUrl: './addpermission.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone:true,
    imports        : [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
})
export class AddPermissionComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: any;
    permission: PermissionsDetails;
    permissionForm: FormGroup;
    flashMessage: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public matDialogRef: MatDialogRef<AddPermissionComponent>,
        private _formBuilder: FormBuilder,
        private _permissionService: PermissionService,
    ) {}

    ngOnInit(): void {
        this.permissionForm = this._formBuilder.group({
            title: [''],
            position: [''],
            userStory: [''],
            startDate: [''],
            endDate: [''],
            // files_path: [''],
            categoriesID: [''],
            createdAt: [''],
        });

      
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    createPermission(): void
    {
        // Get the project object
        const permission =  this.permissionForm.getRawValue();



        // Update the project on the server
        this._permissionService.createPermission( permission).subscribe(() =>
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
