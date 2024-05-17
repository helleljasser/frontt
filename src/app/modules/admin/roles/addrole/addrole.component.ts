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
import { RoleService } from '../roles.service';
import { RolesDetails } from '../roles.types';

@Component({
    selector: 'role-add',
    templateUrl: './addrole.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone:true,
    imports        : [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
})
export class AddRoleComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: any;
    role: RolesDetails;
    roleForm: FormGroup;
    flashMessage: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public matDialogRef: MatDialogRef<AddRoleComponent>,
        private _formBuilder: FormBuilder,
        private _roleService: RoleService,
    ) {}

    ngOnInit(): void {
        this.roleForm = this._formBuilder.group({
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
    createRole(): void
    {
        // Get the project object
        const role =  this.roleForm.getRawValue();



        // Update the project on the server
        this._roleService.createRole( role).subscribe(() =>
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
