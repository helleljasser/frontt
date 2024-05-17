import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { NotificationsPagination, NotificationsTable, notification } from './notifications.types';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private _pagination: BehaviorSubject<NotificationsPagination | null> = new BehaviorSubject(null);
    private _project: BehaviorSubject<NotificationsTable | null> = new BehaviorSubject(null);
    private _notifications: BehaviorSubject<NotificationsTable[] | null> = new BehaviorSubject(null);
    private _notification: BehaviorSubject<notification | null> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient) {}

    get pagination$(): Observable<NotificationsPagination> {
        return this._pagination.asObservable();
    }

    get project$(): Observable<NotificationsTable> {
        return this._project.asObservable();
    }

    get notifications$(): Observable<NotificationsTable[]> {
        return this._notifications.asObservable();
    }

 /*

    * Setter & getter for notification
    *
    * @param value
    */
   set notification(value: notification)
   {
       // Store the value
       this._notification.next(value);
   }

   get notification$(): Observable<notification>
   {
       return this._notification.asObservable();
   }
    


    getNotifications(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''): Observable<void> {
   

        return this._httpClient.get<{ pagination: NotificationsPagination}>('api/apps/ecommerce/inventory/notifications', ).pipe(
            tap((response) => {
                console.log(response);
                this._pagination.next(response.pagination);
                this._notifications.next(response.pagination.items);
            }),
            map(() => {})
        );
    }


    getProjectById(id: string): Observable<NotificationsTable> {
        return this._notifications.pipe(
            take(1),
            map((notifications) => {
                const project = notifications.find((item) => item.id === id) || null;
                this._project.next(project);
                return project;
            }),
            switchMap((project) => {
                if (!project) {
                    return throwError('Could not find project with id of ' + id + '!');
                }
                return new Observable<NotificationsTable>((observer) => {
                    observer.next(project);
                    observer.complete();
                });
            })
        );
    }

    createProject(): Observable<NotificationsTable> {
        return this._notifications.pipe(
            take(1),
            switchMap((notifications) =>
                this._httpClient.post<NotificationsTable>('api/apps/ecommerce/inventory/project', {}).pipe(
                    map((newProject) => {
                        this._notifications.next([newProject, ...notifications]);
                        return newProject;
                    }),
                    catchError((error) => throwError(error))
                )
            )
        );
    }

    updateProject(id: string, project: NotificationsTable): Observable<NotificationsTable> {
        return this._notifications.pipe(
            take(1),
            switchMap((notifications) =>
                this._httpClient.patch<NotificationsTable>('api/apps/ecommerce/inventory/project', { id, project }).pipe(
                    map((updatedProject) => {
                        const index = notifications.findIndex((item) => item.id === id);
                        notifications[index] = updatedProject;
                        this._notifications.next(notifications);
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
        return this._notifications.pipe(
            take(1),
            switchMap((notifications) =>
                this._httpClient.delete('api/apps/ecommerce/inventory/project', { params: { id } }).pipe(
                    map((isDeleted: boolean) => {
                        const index = notifications.findIndex((item) => item.id === id);
                        notifications.splice(index, 1);
                        this._notifications.next(notifications);
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
     * Get the current logged in notification data
     */
    get(): Observable<notification>
    {
        return this._httpClient.get<notification>('api/common/notification').pipe(
            tap((notification) =>
            {
                this._notification.next(notification);
            }),
        );
    }

    /**
     * Update the notification
     *
     * @param notification
     */
    update(notification: notification): Observable<any>
    {
        return this._httpClient.patch<notification>('api/common/notification', {notification}).pipe(
            map((response) =>
            {
                this._notification.next(response);
            }),
        );
    }
}


    




    

