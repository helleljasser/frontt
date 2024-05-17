import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject, takeUntil } from 'rxjs';
import { BoardService } from '../boards.service';
import { BoardsDetails } from '../boards.types';

@Component({
    selector: 'board-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    
    standalone : true ,
    imports        : [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],

    providers: [MatDialog],
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
    
   
    board: BoardsDetails;
    boardForm: FormGroup;

    private _unsubscribeAll: Subject<void> = new Subject<void>();
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<BoardDetailsComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _boardService: BoardService,
        private _fuseConfirmationService: FuseConfirmationService,
        private cdr: ChangeDetectorRef 
    ) {}

    ngOnInit(): void {
        this.boardForm = this._formBuilder.group({
            id: [''],
            title: ['', Validators.required],
            icon: [''],
            description: [''],
            last_activity: [''],
            projectID: [''],
            companyID: [''],
            createdAt: ['']
        });

        const boardID = this.data.boardid;

        // Fetch board details
        this._boardService.getBoardDetails(boardID)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    // Assign fetched board details
                    this.board = response;
                    // Update board form with fetched data
                    this.boardForm.patchValue({
                        id: this.board.id,
                        title: this.board.title,
                        icon: this.board.icon,
                        description: this.board.description,
                        last_activity: this.board.last_activity,
                        projectID: this.board.projectID,
                        companyID: this.board.companyID,
                        createdAt: this.board.createdAt
                    });
                  
                },
                error => {
                    // Handle errors here
                }
            );
    }
        
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    updateBoard(): void {
        // Update board with form data
        const board = this.boardForm.getRawValue();
        this._boardService.updateBoard(board.id, board).subscribe(() => {
            // Show success message
            this.showFlashMessage('success');
        });
    }

    deleteBoard(): void {
        // Open confirmation dialog for board deletion
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete board',
            message: 'Are you sure you want to remove this board? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If confirmed, delete the board
            if (result === 'confirmed') {
                const board = this.boardForm.getRawValue();
                this._boardService.deleteBoard(board.id).subscribe(() => {
                    
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
       
        

        // Hide message after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;
        }, 3000);
    }
}
