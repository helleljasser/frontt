import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Card_commentsDetails, Card_commentsTable, PaginationData } from './card_comments.types';

@Injectable({
  providedIn: 'root'
})

export class Card_commentService {
  private apiUrl = 'http://localhost:8080/api';
  private companyID :string; 
  private cardID = '4c40be29-6140-4f52-bc45-19d1e04d421d';
  private _pagination: BehaviorSubject<PaginationData | null> = new BehaviorSubject(null);
  private _card_comments: BehaviorSubject<Card_commentsTable[] | null> = new BehaviorSubject(null);


  constructor(private _httpClient: HttpClient) {
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {

      //this.userID = currentUser.ID;
      this.companyID = currentUser.workCompanyId;

    }else {
      //this.userID = "f8c3a4ca-c222-4f69-9b3e-d0227d4f92e8";
      this.companyID = "4c40be29-6140-4f52-bc45-19d1e04d421d";
    }}
  
  get pagination$(): Observable<PaginationData> {
    return this._pagination.asObservable();
  }
  
  get card_comments$(): Observable<Card_commentsTable[]> {
    return this._card_comments.asObservable();
  }

  createCard_comment(card_commentData: any): Observable<void> {
    const url = `${this.apiUrl}/card_comments/${this.companyID}`;
    return this._httpClient.post<void>(url, card_commentData).pipe(
      tap(() => {
        console.log('Card_comment created successfully.');
      }),
      map(() => {})
    );
  }

  getCard_comments( page: number = 0, limit: number = 10): Observable<void> {
    const url = `${this.apiUrl}/card_comments/${this.companyID}`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this._httpClient.get<{ responseKey: string, data: { items: Card_commentsTable[], limit: number, page: number, totalCount: number } }>(url, { params })
      .pipe(
        tap((response) => {
          if (response.responseKey === 'Success') {
            this._card_comments.next(response.data.items);
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

  getCard_commentDetails(card_commentID: string): Observable<Card_commentsDetails> {
    const url = `${this.apiUrl}/card_comments/${this.companyID}/${this.cardID}/${card_commentID}`;
    return this._httpClient.get<{ responseKey: string, data: Card_commentsDetails }>(url).pipe(
      map((response) => {
        if (response.responseKey === 'Success') {
          console.log('Card_comment details:', response.data);
          return response.data; 
        } else {
          throw new Error('An error occurred in the response.'); 
        }
      }),
      catchError((error) => {
        console.error('An error occurred while fetching card_comment details:', error);
        return throwError(error); 
      })
    );
  }

  updateCard_comment( card_commentID: string, card_commentData: any): Observable<void> {
    const url = `${this.apiUrl}/card_comments/${this.companyID}/${this.cardID}/${card_commentID}`;
    return this._httpClient.put<void>(url, card_commentData).pipe(
      tap(() => {
        console.log('Card_comment updated successfully.');
      }),
      map(() => {})
    );
  }

  deleteCard_comment( card_commentID: string): Observable<void> {
    const url = `${this.apiUrl}/card_comments/${this.companyID}/${this.cardID}/${card_commentID}`;
    return this._httpClient.delete<void>(url).pipe(
      tap(() => {
        console.log('Card_comment deleted successfully.');
      }),
      map(() => {})
    );
  }
}
