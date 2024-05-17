import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BoardsDetails, BoardsTable, PaginationData } from './boards.types';

@Injectable({
  providedIn: 'root'
})

export class BoardService {
  private apiUrl = 'http://localhost:8080/api';
  private companyID :string; //='4c40be29-6140-4f52-bc45-19d1e04d421d';
  private _pagination: BehaviorSubject<PaginationData | null> = new BehaviorSubject(null);
  private _boards: BehaviorSubject<BoardsTable[] | null> = new BehaviorSubject(null);


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
get boards$(): Observable<BoardsTable[]> {
    return this._boards.asObservable();
}
  createBoard( boardData: any): Observable<void> {
    const url = `${this.apiUrl}/boards/${this.companyID}`;
    return this._httpClient.post<void>(url, boardData).pipe(
      tap(() => {
        console.log('Board created successfully.');
      }),
      map(() => {})
    );
  }

  getBoards(page: number = 0, limit: number = 10): Observable<void> {
    const url = `${this.apiUrl}/boards/${this.companyID}`;
    return this._httpClient.get<{ responseKey: string, data: { items: BoardsTable[], limit: number, page: number, totalCount: number } }>(url, {
      params: {
        page: page.toString(),
        limit: limit.toString()
      },
    }).pipe(
      tap((response) => {
        if (response.responseKey === 'Success') {
          this._boards.next(response.data.items);
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
  
  
  
  

  getBoardDetails(boardID: string): Observable<BoardsDetails> {
    const url = `${this.apiUrl}/boards/${this.companyID}/${boardID}`;
    return this._httpClient.get<{ responseKey: string, data: BoardsDetails }>(url).pipe(
      map((response) => {
        if (response.responseKey === 'Success') {
          console.log('Board details:', response.data);
          return response.data; // Retournez les données de la réponse si la clé de réponse est 'Success'
        } else {
          throw new Error('An error occurred in the response.'); // Lancez une erreur si la clé de réponse n'est pas 'Success'
        }
      }),
      catchError((error) => {
        console.error('An error occurred while fetching board details:', error);
        return throwError(error); // Renvoyez l'erreur pour qu'elle puisse être gérée par l'observateur de l'appelant
      })
    );
  }
  

  updateBoard( boardID: string, boardData: any): Observable<void> {
    const url = `${this.apiUrl}/boards/${this.companyID}/${boardID}`;
    return this._httpClient.put<void>(url, boardData).pipe(
      tap(() => {
        console.log('Board updated successfully.');
      }),
      map(() => {})
    );
  }

  deleteBoard( boardID: string): Observable<void> {
    const url = `${this.apiUrl}/boards/${this.companyID}/${boardID}`;
    return this._httpClient.delete<void>(url).pipe(
      tap(() => {
        console.log('Board deleted successfully.');
      }),
      map(() => {})
    );
  }
}
