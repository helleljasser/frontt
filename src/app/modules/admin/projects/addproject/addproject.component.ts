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
import { ProjectService } from '../projects.service';
import { ProjectsDetails } from '../projects.types';

@Component({
    selector: 'project-add',
    templateUrl: './addproject.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone:true,
    imports        : [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
})
export class AddProjectComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: any;
    project: ProjectsDetails;
    projectForm: FormGroup;
    flashMessage: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public matDialogRef: MatDialogRef<AddProjectComponent>,
        private _formBuilder: FormBuilder,
        private _projectService: ProjectService,
    ) {}

    ngOnInit(): void {
        this.projectForm = this._formBuilder.group({
            name: ["", Validators.required],  // Ce champ est requis
            type: ["", Validators.required],  // Ce champ est requis
            description: [""],  // Champ optionnel
            status: [""],  // Champ optionnel
            start_date: [""],  // Champ optionnel
            end_date: [""],  // Champ optionnel
            budget: [""],  // Champ optionnel
            priority: [""],  // Champ optionnel
            // categories: [[]],  // Champ optionnel
            // product_ownerName: [""],  // Champ optionnel
            product_owner: [""],  // Champ optionnel
            companyID: [""],  // Champ optionnel
            companyName: [""],  // Champ optionnel
            createdAt: [""],  // Champ optionnel
            files_path: [[]],  // Champ optionnel (tableau de chaînes)
        });
        

      
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    createProject(): void
    {
        // Get the project object
        const project =  this.projectForm.getRawValue();



        // Update the project on the server
        this._projectService.createProject( project).subscribe(() =>
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
