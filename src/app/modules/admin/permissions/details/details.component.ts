import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { PermissionsDetails } from '../permissions.types';

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PermissionService } from '../permissions.service';

@Component({
    selector: 'permission-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports        : [CommonModule,MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, NgClass, NgIf, MatDatepickerModule, NgFor, MatCheckboxModule, DatePipe,MatSelectModule],
    providers: [MatDialog], // Removed imports from here
})
export class PermissionDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
   
    permission: PermissionsDetails;
    permissionForm: FormGroup; // No need to initialize here

    // Private
    private _unsubscribeAll: Subject<void> = new Subject<void>(); // Changed type to void
    flashMessage: string;
    

    constructor(
        public matDialogRef: MatDialogRef<PermissionDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _permissionService: PermissionService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        const permissionID = this.data.permissionid;

        // Fetch permission details
        this._permissionService.getPermissionDetails(permissionID)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    // Assign fetched permission details
                    this.permission = response;
                    // Initialize permission form
                    this.initPermissionForm();
                    // Trigger change detection
                    this._changeDetectorRef.markForCheck();
                },
                error => {
                    // Handle errors here
                }
            );
    }
        
    initPermissionForm(): void {

         this.permissionForm = this._formBuilder.group({
            id: [this.permission.id],
            roleID: [this.permission.roleID],
            companyID: [this.permission.companyID],
            featureID: [this.permission.featureID],
            featureName: [this.permission.featureName, Validators.required],
            createPerm: [this.permission.createPerm],
            readPerm: [this.permission.readPerm],
            updatePerm: [this.permission.updatePerm],
            deletePerm: [this.permission.deletePerm],
            createdByUser: [this.permission.createdByUser],
            createdAt: [this.permission.createdAt],
        });
        
        // Remplir le formulaire
        this.permissionForm.patchValue({
            id: this.permission.id,
            roleID: this.permission.roleID,
            companyID: this.permission.companyID,
            featureID: this.permission.featureID,
            featureName: this.permission.featureName,
            createPerm: this.permission.createPerm,
            readPerm: this.permission.readPerm,
            updatePerm: this.permission.updatePerm,
            deletePerm: this.permission.deletePerm,
            createdByUser: this.permission.createdByUser,
            createdAt: this.permission.createdAt,
        });
        

    
        // Subscribe to form value changes
        this.permissionForm.valueChanges
            .pipe(
                tap((value) => {
                    // Update permission object when form values change
                    this.permission = { ...this.permission, ...value };
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                // Update permission on the server
                this._permissionService.updatePermission(this.permission.id, value).subscribe();
                // Trigger change detection
                this._changeDetectorRef.markForCheck();
            });
    }
    

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    updatePermission(): void {
        // Update permission with form data
        const permission = this.permissionForm.getRawValue();
        this._permissionService.updatePermission(this.permission.id, permission).subscribe(() => {
            // Show success message
            this.showFlashMessage('success');
        });
    }

    deletePermission(): void {
        // Open confirmation dialog for permission deletion
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete permission',
            message: 'Are you sure you want to remove this permission? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If confirmed, delete the permission
            if (result === 'confirmed') {
                const permission = this.permissionForm.getRawValue();
                this._permissionService.deletePermission(permission.id).subscribe(() => {
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
