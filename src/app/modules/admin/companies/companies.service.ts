import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CompaniesDetails, CompaniesTable, PaginationData } from './companies.types';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private apiUrl = 'http://localhost:8080/api';
  private companyID:string //  ='4c40be29-6140-4f52-bc45-19d1e04d421d';
  private _pagination: BehaviorSubject<PaginationData | null> = new BehaviorSubject(null);
  private _companies: BehaviorSubject<CompaniesTable[] | null> = new BehaviorSubject(null);


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
get companies$(): Observable<CompaniesTable[]> {
    return this._companies.asObservable();
}
  createCompany( companyData: any): Observable<void> {
    const url = `${this.apiUrl}/companies/${this.companyID}`;
    return this._httpClient.post<void>(url, companyData).pipe(
      tap(() => {
        console.log('Company created successfully.');
      }),
      map(() => {})
    );
  }

  getCompanies(page: number = 0, limit: number = 10): Observable<void> {
    const url = `${this.apiUrl}/companies`;
    return this._httpClient.get<{ responseKey: string, data: { items: CompaniesTable[], limit: number, page: number, totalCount: number } }>(url, {
      params: {
        page: page.toString(),
        limit: limit.toString()
      },
    }).pipe(
      tap((response) => {
        if (response.responseKey === 'Success') {
          this._companies.next(response.data.items);
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
  
  
  
  

  getCompanyDetails(companyID: string): Observable<CompaniesDetails> {
    const url = `${this.apiUrl}/companies/${companyID}`;
    return this._httpClient.get<{ responseKey: string, data: CompaniesDetails }>(url).pipe(
      map((response) => {
        if (response.responseKey === 'Success') {
          console.log('Company details:', response.data);
          return response.data; // Retournez les données de la réponse si la clé de réponse est 'Success'
        } else {
          throw new Error('An error occurred in the response.'); // Lancez une erreur si la clé de réponse n'est pas 'Success'
        }
      }),
      catchError((error) => {
        console.error('An error occurred while fetching company details:', error);
        return throwError(error); // Renvoyez l'erreur pour qu'elle puisse être gérée par l'observateur de l'appelant
      })
    );
  }
  

  updateCompany( companyID: string, companyData: any): Observable<void> {
    const url = `${this.apiUrl}/companies/${companyID}`;
    return this._httpClient.put<void>(url, companyData).pipe(
      tap(() => {
        console.log('Company updated successfully.');
      }),
      map(() => {})
    );
  }

  deleteCompany( companyID: string): Observable<void> {
    const url = `${this.apiUrl}/companies/${companyID}`;
    return this._httpClient.delete<void>(url).pipe(
      tap(() => {
        console.log('Company deleted successfully.');
      }),
      map(() => {})
    );
  }
}
