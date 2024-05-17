import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { ProjectsPagination, ProjectsTable } from './projects.types';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    private _pagination: BehaviorSubject<ProjectsPagination | null> = new BehaviorSubject(null);
    private _project: BehaviorSubject<ProjectsTable | null> = new BehaviorSubject(null);
    private _projects: BehaviorSubject<ProjectsTable[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) {}

    get pagination$(): Observable<ProjectsPagination> {
        return this._pagination.asObservable();
    }

    get project$(): Observable<ProjectsTable> {
        return this._project.asObservable();
    }

    get projects$(): Observable<ProjectsTable[]> {
        return this._projects.asObservable();
    }

    getProjects(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''): Observable<void> {
   

        return this._httpClient.get<{ pagination: ProjectsPagination}>('api/apps/ecommerce/inventory/projects', ).pipe(
            tap((response) => {
                console.log(response);
                this._pagination.next(response.pagination);
                this._projects.next(response.pagination.items);
            }),
            map(() => {})
        );
    }

    getProjectById(id: string): Observable<ProjectsTable> {
        return this._projects.pipe(
            take(1),
            map((projects) => {
                const project = projects.find((item) => item.id === id) || null;
                this._project.next(project);
                return project;
            }),
            switchMap((project) => {
                if (!project) {
                    return throwError('Could not find project with id of ' + id + '!');
                }
                return new Observable<ProjectsTable>((observer) => {
                    observer.next(project);
                    observer.complete();
                });
            })
        );
    }

    createProject(): Observable<ProjectsTable> {
        return this._projects.pipe(
            take(1),
            switchMap((projects) =>
                this._httpClient.post<ProjectsTable>('api/apps/ecommerce/inventory/project', {}).pipe(
                    map((newProject) => {
                        this._projects.next([newProject, ...projects]);
                        return newProject;
                    }),
                    catchError((error) => throwError(error))
                )
            )
        );
    }

    updateProject(id: string, project: ProjectsTable): Observable<ProjectsTable> {
        return this._projects.pipe(
            take(1),
            switchMap((projects) =>
                this._httpClient.patch<ProjectsTable>('api/apps/ecommerce/inventory/project', { id, project }).pipe(
                    map((updatedProject) => {
                        const index = projects.findIndex((item) => item.id === id);
                        projects[index] = updatedProject;
                        this._projects.next(projects);
                        return updatedProject;
                    }),
                    switchMap((updatedProject) =>
                        this.project$.pipe(
                            take(1),
                            tap((selectedProject) => {
                                if (selectedProject && selectedProject.id === id) {
                                    this._project.next(updatedProject);
                                }
                            })
                        )
                    ),
                    catchError((error) => throwError(error))
                )
            )
        );
    }

    deleteProject(id: string): Observable<boolean> {
        return this._projects.pipe(
            take(1),
            switchMap((projects) =>
                this._httpClient.delete('api/apps/ecommerce/inventory/project', { params: { id } }).pipe(
                    map((isDeleted: boolean) => {
                        const index = projects.findIndex((item) => item.id === id);
                        projects.splice(index, 1);
                        this._projects.next(projects);
                        return isDeleted;
                    }),
                    catchError((error) => throwError(error))
                )
            )
        );
    }
}
