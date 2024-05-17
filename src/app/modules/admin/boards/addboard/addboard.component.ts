import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { BoardService } from '../boards.service';
import { BoardIn } from '../boards.types';

@Component({
    selector: 'board-add',
    templateUrl: './addboard.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone:true,
    imports        : [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],

})
export class AddBoardComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: any;
    board: BoardIn;
    boardForm: FormGroup;
    flashMessage: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    constructor(
        public matDialogRef: MatDialogRef<AddBoardComponent>,
        private _formBuilder: FormBuilder,
        private _boardService: BoardService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
     
        this.boardForm = this._formBuilder.group({
            title           :[''],
            description     : [''],
            icon            : [''],
            last_activity   :[''],
            projectID       : [''],

        });

      
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    addBoard(): void
    {
        // Get the project object
        const board =  this.boardForm.getRawValue();



        // Update the project on the server
        this._boardService.createBoard( board).subscribe(() =>
        { 
            this
            this._changeDetectorRef.markForCheck();
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
