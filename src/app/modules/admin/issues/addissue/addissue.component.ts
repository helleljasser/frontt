import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { ProjectService } from '../../projects/projects.service';
import { ProjectsList } from '../../projects/projects.types';
import { UserService } from '../../users/users.service';
import { UsersList } from '../../users/users.types';
import { IssueService } from '../issues.service';
import { IssuesIn } from '../issues.types';

@Component({
    selector: 'issue-add',
    templateUrl: './addissue.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone:true,
    imports        : [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],

})
export class AddIssueComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: any;
    issue: IssuesIn;
    issueForm: FormGroup;
    flashMessage: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    projects : ProjectsList[];
    users : UsersList[];

    constructor(
        public matDialogRef: MatDialogRef<AddIssueComponent>,
        private _formBuilder: FormBuilder,
        private _issueService: IssueService,
        private _changeDetectorRef: ChangeDetectorRef,
        private  _projectService : ProjectService , 
        private  _userService : UserService
    ) {}
    ngOnInit(): void {
        // Initialize the form with FormBuilder
        this.issueForm = this._formBuilder.group({
            start_date: [''],
            end_date: [''],
            status: [''],
            priority: [''],
            files_path: this._formBuilder.array([]),
            assigned_to: [''],
            project_id: [''],
            task_id: ['']
        });

    // Récupérer la liste des projets
    this._projectService.getProjectsList().subscribe((projects) => {
        this.projects = projects;
        console.log(this.projects);
        });
    this._userService.getUsersList().subscribe((users) => {
        this.users = users;
        console.log(this.users);
        });
    }

    // Function to add file paths to the FormArray
    addFilePath(): void {
        (this.issueForm.get('files_path') as FormArray).push(this._formBuilder.control(''));
    }

    // Function to remove file paths from the FormArray
    removeFilePath(index: number): void {
        (this.issueForm.get('files_path') as FormArray).removeAt(index);
    }

    ngOnDestroy(): void {
        // Implement ngOnDestroy logic if needed
    }
    CreateIssue(): void
    {
        // Get the project object
        const issue =  this.issueForm.getRawValue();



        // Update the project on the server
        this._issueService.createIssue( issue).subscribe(() =>
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
