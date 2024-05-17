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
import { Issue_logService } from 'app/modules/admin/issue_logs/issue_logs.service';
import { merge } from 'lodash';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Issue_logDetailsComponent } from './details/details.component';
import { Issue_logsTable, PaginationData } from './issue_logs.types';


@Component({
    selector: 'issue_logs-list',
    templateUrl: './issue_logs.component.html',
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
export class Issue_logsListComponent implements OnInit, AfterViewInit, OnDestroy {
    [x: string]: any;

    @ViewChild(MatPaginator) private _paginator: MatPaginator;


   

    flashMessage: 'success' | 'error' | null = null;
    pagination: PaginationData;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProject: Issue_logsTable | null = null;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _issue_logService: Issue_logService,
        private _matDialog: MatDialog,
  
        
    ) {}

    ngOnInit(): void {
        this._issue_logService.pagination$
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

    // Get the issues
    this.issue_logs$ = this._issue_logService.issue_logs$;

     console.log( this.issue_logs$);
        }
    
        openissue_logDetails(id: string): void {
            // Pass data to the dialog component
            const dialogRef = this._matDialog.open(Issue_logDetailsComponent, {
                autoFocus: false,
                data: { issue_logid: id } // Pass issue data to the dialog
            });
        
            // Subscribe to afterClosed() to perform navigation after modal is closed
            dialogRef.afterClosed().subscribe(() => {
            console.log("donne");
            this.issue_logs$ = this._issue_logService.issue_logs$;
            this._changeDetectorRef.markForCheck();
          
            });
      }


        
    
    refreshData(): void {
        // Rafraîchir les données de pagination
        this._issue_logService.pagination$
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
        this.issue_logs$ = this._issue_logService.issue_logs$;
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
                    return this.issue_logService.getIssue_logs(params.page, params.limit, params.sort, params.order);
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


    trackByFn(index: number, item: Issue_logsTable): string {
        return item.id;
    }
}


 