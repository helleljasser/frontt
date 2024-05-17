import { AsyncPipe, CommonModule } from '@angular/common';
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
import { MatDrawer } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from 'app/modules/admin/users/users.service';
import { merge } from 'lodash';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { PaginationData, UsersTable } from './users.types';


@Component({
    selector: 'users-list',
    templateUrl: './users.component.html',
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatRippleModule,
        ReactiveFormsModule,
        AsyncPipe,
        RouterLink,
        RouterModule,
        
    
    ],
  
   
   
})
export class UsersListComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
user: any;




createUser() {
throw new Error('Method not implemented.');
}
openserDetails() {
throw new Error('Method not implemented.');
}
createProject() {
throw new Error('Method not implemented.');
}


    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

  

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: PaginationData;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    users$: any;

    constructor(
        
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,
    ) {}

    ngOnInit(): void {
        // Get the pagination
        this._userService.pagination$
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
    
        // Get the users
        this.users$ = this._userService.users$;
 
     
    
        }
        
        
        

 
ngAfterViewInit(): void {
    if (this._sort && this._paginator) {
        merge(this._sort.sortChange, this._paginator.page)
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._userService.getUsers();
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
}
    closeDetails() {
        throw new Error('Method not implemented.');
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


    trackByFn(item: UsersTable): string {
        return item.id;
    }
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}


 