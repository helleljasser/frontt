import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PaginationData, UsersDetails, UsersList, UsersTable } from './users.types';



@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/api/users';
    private companyID :string;//= '4c40be29-6140-4f52-bc45-19d1e04d421d';

    private _pagination: BehaviorSubject<PaginationData | null> = new BehaviorSubject(null);
    private _usersList: BehaviorSubject<UsersList[] | null> = new BehaviorSubject(null);
    private _users: BehaviorSubject<UsersTable[] | null> = new BehaviorSubject(null);
    private _user: BehaviorSubject<UsersDetails | null> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {

      //this.userID = currentUser.ID;
      this.companyID = currentUser.workCompanyId;

    }else {
      //this.userID = "f8c3a4ca-c222-4f69-9b3e-d0227d4f92e8";
      this.companyID = "4c40be29-6140-4f52-bc45-19d1e04d421d";
    }
    }

    get pagination$(): Observable<PaginationData> {
        return this._pagination.asObservable();
    }

  

    get users$(): Observable<UsersTable[]> {
        return this._users.asObservable();
    }


    get usersList$():Observable<UsersList[]>{
      return this._usersList.asObservable();
    }

 /*

    * Setter & getter for user
    *
    * @param value
    */
   set user(value: UsersDetails)
   {
       // Store the value
       this._user.next(value);
   }

   get user$(): Observable<UsersDetails>
   {
       return this._user.asObservable();
   }
    
   getUsers(page: number = 0, limit: number = 10): Observable<void> {
    const url = `${this.apiUrl}/${this.companyID}`;
    return this._httpClient.get<{ responseKey: string, data: { items: UsersTable[], limit: number, page: number, totalCount: number } }>(url, {
      params: {
        page: page.toString(),
        limit: limit.toString()
      },
    }).pipe(
      tap((response) => {
        if (response.responseKey === 'Success') {
          this._users.next(response.data.items);
          const paginationData: PaginationData = {
            limit: response.data.limit,
            page: response.data.page,
            totalCount: response.data.totalCount
          };
          this._pagination.next(paginationData);
          
          
        } else {
          console.error('Une erreur est survenue dans la réponse.');
        }
      }),
      map(() => {})
    );
  }
  getUsersList(): Observable<UsersList[]> {
    const url = `${this.apiUrl}/${this.companyID}/list`;
    return this._httpClient.get<{ responseKey: string, data: UsersList[] }>(url).pipe(
      map((response) => {
          if (response.responseKey === 'Success') {
              console.log('Users list:', response.data);
              this._usersList.next(response.data);
              return response.data;
          } else {
              throw new Error('An error occurred in the response.');
          }
      }),

  );
}

  getUsersCount(companyID: string): Observable<void> {
    const url = `${this.apiUrl}/${companyID}/count`;
    return this._httpClient.get<{ responseKey: string, data: { count: number } }>(url).pipe(
      tap((response) => {
        if (response.responseKey === 'Success') {
          // Mettre à jour le nombre d'utilisateurs
          console.log('Nombre total d\'utilisateurs :', response.data.count);
        } else {
          console.error('Une erreur est survenue dans la réponse.');
        }
      }),
      map(() => {})
    );
  }
  
  getUser( userID: string): Observable<void> {
    const url = `${this.apiUrl}/${this.companyID}/${userID}`;
    return this._httpClient.get<{ responseKey: string, data: UsersDetails }>(url).pipe(
      tap((response) => {
        if (response.responseKey === 'Success') {
          this._user.next(response.data);
          console.log('Détails de l\'utilisateur :', response.data);
        } else {
          console.error('Une erreur est survenue dans la réponse.');
        }
      }),
      map(() => {})
    );
  }
  
  UpdateUser( userID: string, userData: any): Observable<void> {
    const url = `${this.apiUrl}/users/${this.companyID}/${userID}`;
    return this._httpClient.put<void>(url, userData).pipe(
      tap(() => {
        console.log('Utilisateur mis à jour avec succès.');
      }),
      map(() => {})
    );
  }
  
  deleteUser( userID: string): Observable<void> {
    const url = `${this.apiUrl}/users/${this.companyID}/${userID}`;
    return this._httpClient.delete<void>(url).pipe(
      tap(() => {
        console.log('Utilisateur supprimé avec succès.');
      }),
      map(() => {})
    );
  }
  
}


    
