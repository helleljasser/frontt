import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { TasksPagination, TasksTable, task } from './tasks.types';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private _pagination: BehaviorSubject<TasksPagination | null> = new BehaviorSubject(null);
    private _project: BehaviorSubject<TasksTable | null> = new BehaviorSubject(null);
    private _tasks: BehaviorSubject<TasksTable[] | null> = new BehaviorSubject(null);
    private _task: BehaviorSubject<task | null> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient) {}

    get pagination$(): Observable<TasksPagination> {
        return this._pagination.asObservable();
    }

    get project$(): Observable<TasksTable> {
        return this._project.asObservable();
    }

    get tasks$(): Observable<TasksTable[]> {
        return this._tasks.asObservable();
    }

 /*

    * Setter & getter for task
    *
    * @param value
    */
   set task(value: task)
   {
       // Store the value
       this._task.next(value);
   }

   get task$(): Observable<task>
   {
       return this._task.asObservable();
   }
    


    getTasks(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''): Observable<void> {
   

        return this._httpClient.get<{ pagination: TasksPagination}>('api/apps/ecommerce/inventory/tasks', ).pipe(
            tap((response) => {
                console.log(response);
                this._pagination.next(response.pagination);
                this._tasks.next(response.pagination.items);
            }),
            map(() => {})
        );
    }


    getProjectById(id: string): Observable<TasksTable> {
        return this._tasks.pipe(
            take(1),
            map((tasks) => {
                const project = tasks.find((item) => item.id === id) || null;
                this._project.next(project);
                return project;
            }),
            switchMap((project) => {
                if (!project) {
                    return throwError('Could not find project with id of ' + id + '!');
                }
                return new Observable<TasksTable>((observer) => {
                    observer.next(project);
                    observer.complete();
                });
            })
        );
    }

    createProject(): Observable<TasksTable> {
        return this._tasks.pipe(
            take(1),
            switchMap((tasks) =>
                this._httpClient.post<TasksTable>('api/apps/ecommerce/inventory/project', {}).pipe(
                    map((newProject) => {
                        this._tasks.next([newProject, ...tasks]);
                        return newProject;
                    }),
                    catchError((error) => throwError(error))
                )
            )
        );
    }

    updateProject(id: string, project: TasksTable): Observable<TasksTable> {
        return this._tasks.pipe(
            take(1),
            switchMap((tasks) =>
                this._httpClient.patch<TasksTable>('api/apps/ecommerce/inventory/project', { id, project }).pipe(
                    map((updatedProject) => {
                        const index = tasks.findIndex((item) => item.id === id);
                        tasks[index] = updatedProject;
                        this._tasks.next(tasks);
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
        return this._tasks.pipe(
            take(1),
            switchMap((tasks) =>
                this._httpClient.delete('api/apps/ecommerce/inventory/project', { params: { id } }).pipe(
                    map((isDeleted: boolean) => {
                        const index = tasks.findIndex((item) => item.id === id);
                        tasks.splice(index, 1);
                        this._tasks.next(tasks);
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
     * Get the current logged in task data
     */
    get(): Observable<task>
    {
        return this._httpClient.get<task>('api/common/task').pipe(
            tap((task) =>
            {
                this._task.next(task);
            }),
        );
    }

    /**
     * Update the task
     *
     * @param task
     */
    update(task: task): Observable<any>
    {
        return this._httpClient.patch<task>('api/common/task', {task}).pipe(
            map((response) =>
            {
                this._task.next(response);
            }),
        );
    }
}


    




    

