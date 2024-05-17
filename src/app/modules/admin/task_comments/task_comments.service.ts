import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Task_comment, Task_commentsPagination, Task_commentsTable } from './task_comments.types';

@Injectable({
    providedIn: 'root'
})
export class Task_commentService {
    private _pagination: BehaviorSubject<Task_commentsPagination | null> = new BehaviorSubject(null);
    private _project: BehaviorSubject<Task_commentsTable | null> = new BehaviorSubject(null);
    private _Task_comments: BehaviorSubject<Task_commentsTable[] | null> = new BehaviorSubject(null);
    private _Task_comment: BehaviorSubject<Task_comment | null> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient) {}

    get pagination$(): Observable<Task_commentsPagination> {
        return this._pagination.asObservable();
    }

    get project$(): Observable<Task_commentsTable> {
        return this._project.asObservable();
    }

    get Task_comments$(): Observable<Task_commentsTable[]> {
        return this._Task_comments.asObservable();
    }

 /*

    * Setter & getter for Task_comment
    *
    * @param value
    */
   set Task_comment(value: Task_comment)
   {
       // Store the value
       this._Task_comment.next(value);
   }

   get Task_comment$(): Observable<Task_comment>
   {
       return this._Task_comment.asObservable();
   }
    


    getTask_comments(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''): Observable<void> {
   

        return this._httpClient.get<{ pagination: Task_commentsPagination}>('api/apps/ecommerce/inventory/card_comments', ).pipe(
            tap((response) => {
                console.log(response);
                this._pagination.next(response.pagination);
                this._Task_comments.next(response.pagination.items);
            }),
            map(() => {})
        );
    }


    getProjectById(id: string): Observable<Task_commentsTable> {
        return this._Task_comments.pipe(
            take(1),
            map((Task_comments) => {
                const project = Task_comments.find((item) => item.id === id) || null;
                this._project.next(project);
                return project;
            }),
            switchMap((project) => {
                if (!project) {
                    return throwError('Could not find project with id of ' + id + '!');
                }
                return new Observable<Task_commentsTable>((observer) => {
                    observer.next(project);
                    observer.complete();
                });
            })
        );
    }

    createProject(): Observable<Task_commentsTable> {
        return this._Task_comments.pipe(
            take(1),
            switchMap((Task_comments) =>
                this._httpClient.post<Task_commentsTable>('api/apps/ecommerce/inventory/project', {}).pipe(
                    map((newProject) => {
                        this._Task_comments.next([newProject, ...Task_comments]);
                        return newProject;
                    }),
                    catchError((error) => throwError(error))
                )
            )
        );
    }

    updateProject(id: string, project: Task_commentsTable): Observable<Task_commentsTable> {
        return this._Task_comments.pipe(
            take(1),
            switchMap((Task_comments) =>
                this._httpClient.patch<Task_commentsTable>('api/apps/Task_comments/inventory/project', { id, project }).pipe(
                    map((updatedProject) => {
                        const index = Task_comments.findIndex((item) => item.id === id);
                        Task_comments[index] = updatedProject;
                        this._Task_comments.next(Task_comments);
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
        return this._Task_comments.pipe(
            take(1),
            switchMap((Task_comments) =>
                this._httpClient.delete('api/apps/ecommerce/inventory/project', { params: { id } }).pipe(
                    map((isDeleted: boolean) => {
                        const index = Task_comments.findIndex((item) => item.id === id);
                        Task_comments.splice(index, 1);
                        this._Task_comments.next(Task_comments);
                        return isDeleted;
                    }),
                    catchError((error) => throwError(error))
                )
            )
        );
    }
    
    /**
 

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in Task_comment data
     */
    get(): Observable<Task_comment>
    {
        return this._httpClient.get<Task_comment>('api/common/Task_comment').pipe(
            tap((Task_comment) =>
            {
                this._Task_comment.next(Task_comment);
            }),
        );
    }

    /**
     * Update the Task_comment
     *
     * @param Task_comment
     */
    update(Task_comment: Task_comment): Observable<any>
    {
        return this._httpClient.patch<Task_comment>('api/common/Task_comment', {Task_comment}).pipe(
            map((response) =>
            {
                this._Task_comment.next(response);
            }),
        );
    }
}


    




    

