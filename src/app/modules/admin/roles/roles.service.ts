import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PaginationData, RolesDetails, RolesTable } from './roles.types';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  private apiUrl = 'http://localhost:8080/api';
  private companyID :string;//='4c40be29-6140-4f52-bc45-19d1e04d421d';
  private _pagination: BehaviorSubject<PaginationData | null> = new BehaviorSubject(null);
  private _roles: BehaviorSubject<RolesTable[] | null> = new BehaviorSubject(null);


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
get roles$(): Observable<RolesTable[]> {
    return this._roles.asObservable();
}
  createRole( roleData: any): Observable<void> {
    const url = `${this.apiUrl}/roles/${this.companyID}`;
    return this._httpClient.post<void>(url, roleData).pipe(
      tap(() => {
        console.log('Role created successfully.');
      }),
      map(() => {})
    );
  }

  getRoles(page: number = 0, limit: number = 10): Observable<void> {
    const url = `${this.apiUrl}/roles/${this.companyID}`;
    return this._httpClient.get<{ responseKey: string, data: { items: RolesTable[], limit: number, page: number, totalCount: number } }>(url, {
      params: {
        page: page.toString(),
        limit: limit.toString()
      },
    }).pipe(
      tap((response) => {
        if (response.responseKey === 'Success') {
          this._roles.next(response.data.items);
          console.log(response.data.items);
          console.log(response);
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
  
  
  
  

  getRoleDetails(roleID: string): Observable<RolesDetails> {
    const url = `${this.apiUrl}/roles/${this.companyID}/${roleID}`;
    return this._httpClient.get<{ responseKey: string, data: RolesDetails }>(url).pipe(
      map((response) => {
        if (response.responseKey === 'Success') {
          console.log('Role details:', response.data);
          return response.data; // Retournez les données de la réponse si la clé de réponse est 'Success'
        } else {
          throw new Error('An error occurred in the response.'); // Lancez une erreur si la clé de réponse n'est pas 'Success'
        }
      }),
      catchError((error) => {
        console.error('An error occurred while fetching role details:', error);
        return throwError(error); // Renvoyez l'erreur pour qu'elle puisse être gérée par l'observateur de l'appelant
      })
    );
  }
  

  updateRole( roleID: string, roleData: any): Observable<void> {
    const url = `${this.apiUrl}/roles/${this.companyID}/${roleID}`;
    return this._httpClient.put<void>(url, roleData).pipe(
      tap(() => {
        console.log('Role updated successfully.');
      }),
      map(() => {})
    );
  }

  deleteRole( roleID: string): Observable<void> {
    const url = `${this.apiUrl}/roles/${this.companyID}/${roleID}`;
    return this._httpClient.delete<void>(url).pipe(
      tap(() => {
        console.log('Role deleted successfully.');
      }),
      map(() => {})
    );
  }
}
