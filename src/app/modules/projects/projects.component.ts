import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectsService } from 'app/modules/projects/projects.service';
import { merge } from 'lodash';
import { Subject, debounceTime, switchMap, takeUntil } from 'rxjs';
import { ProjectsPagination, ProjectsTable } from './projects.types';


@Component({
    selector: 'projects-list',
    templateUrl: './projects.component.html',
    styles: [
        /* language=SCSS */
        `
            .projects-grid {
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
    imports: [MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSortModule, MatPaginatorModule, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule,NgFor, ReactiveFormsModule,AsyncPipe,CommonModule],
})
export class ProjectsListComponent implements OnInit, AfterViewInit, OnDestroy {
    [x: string]: any;

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

   

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: ProjectsPagination;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProject: ProjectsTable | null = null;
    selectedProjectForm: UntypedFormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private _projectsService: ProjectsService,
    ) {}

    ngOnInit(): void {
        // Create the selected project form
        this.selectedProjectForm = this._formBuilder.group({
            id: [''],
            firstname: ['', [Validators.required]],
            lastname: [''],
            rolename: [''],
            phone_number: [''],
            email: [''],
            createdAt: [''],
        });

      // Get the pagination
      this._projectsService.pagination$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination: ProjectsPagination) => {
          // Update the pagination
          this.pagination = pagination;

          // Mark for check
          this._changeDetectorRef.markForCheck();
      });
        // Get the projects
        this.projects$ = this._projectsService.projects$;

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._projectsService.getProjects(0, 10, 'name', 'asc', query);
                })
            )
            .subscribe(() => {
                this.isLoading = false;
            });
    }

    ngAfterViewInit(): void {
        if (this._sort && this._paginator) {
            // Set the initial sort
            this._sort.sort({
                id: 'name',
                start: 'asc',
                disableClear: true,
            });

            // If the project changes the sort order...
            this._sort.sortChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
                // Reset back to the first page
                this._paginator.pageIndex = 0;

                // Close the details
                this.closeDetails();
            });

            // Get projects if sort or page changes
            merge(this._sort.sortChange, this._paginator.page)
                .pipe(
                    switchMap(() => {
                        this.closeDetails();
                        this.isLoading = true;
                        return this._projectsService.getProjects(
                            this._paginator.pageIndex,
                            this._paginator.pageSize,
                            this._sort.active,
                            this._sort.direction
                        );
                    
                    })
                )
                .subscribe(() => {
                    this.isLoading = false;
                });
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleDetails(projectId: string): void {
        // If the project is already selected...
        if (this.selectedProject && this.selectedProject.id === projectId) {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the project by id
        this._projectsService.getProjectById(projectId).subscribe((project) => {
            // Set the selected project
            this.selectedProject = project;

            // Fill the form
            this.selectedProjectForm.patchValue(project);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }
    createProject(): void
    {
        // Create the project
        this._projectsService.createProject().subscribe((newProject) =>
        {
            // Go to new project
            this.selectedProject = newProject;

            // Fill the form
            this.selectedProjectForm.patchValue(newProject);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Update the selected project using the form data
     */
    updateSelectedProject(): void
    {
        // Get the project object
        const project = this.selectedProjectForm.getRawValue();

        // Remove the currentImageIndex field
        delete project.currentImageIndex;

        // Update the project on the server
        this._projectsService.updateProject(project.id, project).subscribe(() =>
        {
            // Show a success message
            this.showFlashMessage('success');
        });
    }

    /**
     * Delete the selected project using the form data
     */
    deleteSelectedProject(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete project',
            message: 'Are you sure you want to remove this project? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) =>
        {
            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {
                // Get the project object
                const project = this.selectedProjectForm.getRawValue();

                // Delete the project on the server
                this._projectsService.deleteProject(project.id).subscribe(() =>
                {
                    // Close the details
                    this.closeDetails();
                });
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void
    {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() =>
        {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }





   

    

    closeDetails(): void {
        this.selectedProject = null;
    }

    trackByFn(index: number, item: ProjectsTable): string {
        return item.id;
    }
}


 const projects = [
    {
        id: "1",
        firstname: "John",
        lastname: "Doe",
        phone_number: "123456789",
        rolename: "Admin",
        email: "john.doe@example.com",
        createdAt: "2024-04-02T10:00:00Z"
    },
    {
        id: "2",
        firstname: "Alice",
        lastname: "Smith",
        phone_number: "987654321",
        rolename: "Project",
        email: "alice.smith@example.com",
        createdAt: "2024-04-01T15:30:00Z"
    },
    {
        id: "3",
        firstname: "Mohammed",
        lastname: "Abdullah",
        phone_number: "555555555",
        rolename: "Project",
        email: "m.abdullah@example.com",
        createdAt: "2024-03-30T08:45:00Z"
    },
    {
        id: "4",
        firstname: "Maria",
        lastname: "Garcia",
        phone_number: "444444444",
        rolename: "Admin",
        email: "maria.garcia@example.com",
        createdAt: "2024-04-02T14:20:00Z"
    },
    {
        id: "5",
        firstname: "Chen",
        lastname: "Wei",
        phone_number: "777777777",
        rolename: "Project",
        email: "chen.wei@example.com",
        createdAt: "2024-04-01T11:10:00Z"
    },
    {
        id: "6",
        firstname: "Emily",
        lastname: "Jones",
        phone_number: "666666666",
        rolename: "Admin",
        email: "emily.jones@example.com",
        createdAt: "2024-03-29T16:55:00Z"
    },
    {
        id: "7",
        firstname: "Luca",
        lastname: "Ricci",
        phone_number: "888888888",
        rolename: "Project",
        email: "luca.ricci@example.com",
        createdAt: "2024-03-31T09:25:00Z"
    },
    {
        id: "8",
        firstname: "Yuki",
        lastname: "Tanaka",
        phone_number: "999999999",
        rolename: "Project",
        email: "y.tanaka@example.com",
        createdAt: "2024-04-02T07:40:00Z"
    },
    {
        id: "9",
        firstname: "Fatima",
        lastname: "Khan",
        phone_number: "333333333",
        rolename: "Admin",
        email: "fatima.khan@example.com",
        createdAt: "2024-04-01T18:15:00Z"
    },
    {
        id: "10",
        firstname: "Alexandre",
        lastname: "Dupont",
        phone_number: "222222222",
        rolename: "Project",
        email: "a.dupont@example.com",
        createdAt: "2024-03-30T13:00:00Z"
    }
];

 const projectsPagination = {
    items: projects,
    page: 1,
    limit: 10,
    totalCount: projects.length
};

function Injectable(arg0: { providedIn: string; }): (target: typeof ProjectsListComponent) => void | typeof ProjectsListComponent {
    throw new Error('Function not implemented.');
}
