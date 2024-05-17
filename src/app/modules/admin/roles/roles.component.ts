import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { RoleService } from 'app/modules/admin/roles/roles.service';
import { merge } from 'lodash';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { AddRoleComponent } from './addrole/addrole.component';
import { RoleDetailsComponent } from './details/details.component';
import { PaginationData, RolesTable } from './roles.types';


@Component({
    selector: 'roles-role',
    templateUrl: './roles.component.html',
    styles: [
        /* language=SCSS */
        `
            .test-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: fuseAnimations,
    standalone: true,
    imports: [MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSortModule, MatPaginatorModule, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule,NgFor, ReactiveFormsModule,AsyncPipe,CommonModule],
})
export class RolesListComponent implements OnInit, AfterViewInit, OnDestroy {
    [x: string]: any;

    @ViewChild(MatPaginator) private _paginator: MatPaginator;


   

    flashMessage: 'success' | 'error' | null = null;
    pagination: PaginationData;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProject: RolesTable | null = null;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _roleService: RoleService,
        private _matDialog: MatDialog,
  
        
    ) {}

    ngOnInit(): void {
        this._roleService.pagination$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((pagination: PaginationData) => {
            // Update the pagination
            this.pagination = {
                limit: pagination.limit,
                page: pagination.page,
                totalCount: pagination.totalCount
            };

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });

    // Get the roles
    this.roles$ = this._roleService.roles$;

     console.log( this.roles$);
        }
    
        openRoleDetails(id: string): void {
            // Pass data to the dialog component
            const dialogRef = this._matDialog.open(RoleDetailsComponent, {
                autoFocus: false,
                data: { roleid: id } // Pass role data to the dialog
            });
        
            // Subscribe to afterClosed() to perform navigation after modal is closed
            dialogRef.afterClosed().subscribe(() => {
            console.log("donne");
            this.roles$ = this._roleService.roles$;
            this._changeDetectorRef.markForCheck();
          
            });
      }

      addRole(): void {
        // Launch the modal
        const dialogRef = this._matDialog.open(AddRoleComponent, { autoFocus: false });
  
        // Subscribe to afterClosed() to perform navigation after modal is closed
        dialogRef.afterClosed().subscribe(() => {
            console.log("donne1");
            
            this._changeDetectorRef.markForCheck();
          
        });
       
    }
        
    
    refreshData(): void {
        // Rafraîchir les données de pagination
        this._roleService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: PaginationData) => {
                // Update the pagination
                this.pagination = {
                    limit: pagination.limit,
                    page: pagination.page,
                    totalCount: pagination.totalCount
                };
    
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    
        // Rafraîchir les données des cartes
        this.roles$ = this._roleService.roles$;
        console.log("donne2");
    }
ngAfterViewInit(): void {
    if (this._sort && this._paginator) {
        merge(this._sort.sortChange, this._paginator.page)
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    const params = { page: 1, limit: 10, sort: 'name', order: 'asc' };
                    return this.roleService.getRoles(params.page, params.limit, params.sort, params.order);
                })
            )
            .subscribe(() => {
                this.isLoading = false;
            });

        this._sort.sortChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._paginator.pageIndex = 0;
                this.closeDetails();
            });
    }
    this.refreshData();
}

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


    trackByFn(index: number, item: RolesTable): string {
        return item.id;
    }
}


 