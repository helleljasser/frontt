import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CardsDetails, CardsTable, PaginationData } from './cards.types';

@Injectable({
  providedIn: 'root'
})

export class CardService {
  private apiUrl = 'http://localhost:8080/api';
  private companyID: string; //='4c40be29-6140-4f52-bc45-19d1e04d421d';
  private _pagination: BehaviorSubject<PaginationData | null> = new BehaviorSubject(null);
  private _cards: BehaviorSubject<CardsTable[] | null> = new BehaviorSubject(null);


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
get cards$(): Observable<CardsTable[]> {
    return this._cards.asObservable();
}
  createCard( cardData: any): Observable<void> {
    const url = `${this.apiUrl}/cards/${this.companyID}`;
    return this._httpClient.post<void>(url, cardData).pipe(
      tap(() => {
        console.log('Card created successfully.');
      }),
      map(() => {})
    );
  }

  getCards(page: number = 0, limit: number = 10): Observable<void> {
    const url = `${this.apiUrl}/cards/${this.companyID}`;
    return this._httpClient.get<{ responseKey: string, data: { items: CardsTable[], limit: number, page: number, totalCount: number } }>(url, {
      params: {
        page: page.toString(),
        limit: limit.toString()
      },
    }).pipe(
      tap((response) => {
        if (response.responseKey === 'Success') {
          this._cards.next(response.data.items);
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
  
  
  
  

  getCardDetails(cardID: string): Observable<CardsDetails> {
    const url = `${this.apiUrl}/cards/${this.companyID}/${cardID}`;
    return this._httpClient.get<{ responseKey: string, data: CardsDetails }>(url).pipe(
      map((response) => {
        if (response.responseKey === 'Success') {
          console.log('Card details:', response.data);
          return response.data; // Retournez les données de la réponse si la clé de réponse est 'Success'
        } else {
          throw new Error('An error occurred in the response.'); // Lancez une erreur si la clé de réponse n'est pas 'Success'
        }
      }),
      catchError((error) => {
        console.error('An error occurred while fetching card details:', error);
        return throwError(error); // Renvoyez l'erreur pour qu'elle puisse être gérée par l'observateur de l'appelant
      })
    );
  }
  

  updateCard( cardID: string, cardData: any): Observable<void> {
    const url = `${this.apiUrl}/cards/${this.companyID}/${cardID}`;
    return this._httpClient.put<void>(url, cardData).pipe(
      tap(() => {
        console.log('Card updated successfully.');
      }),
      map(() => {})
    );
  }

  deleteCard( cardID: string): Observable<void> {
    const url = `${this.apiUrl}/cards/${this.companyID}/${cardID}`;
    return this._httpClient.delete<void>(url).pipe(
      tap(() => {
        console.log('Card deleted successfully.');
      }),
      map(() => {})
    );
  }
}
