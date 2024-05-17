import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Issue_logsDetails, Issue_logsTable, PaginationData } from './issue_logs.types';

@Injectable({
  providedIn: 'root'
})

export class Issue_logService {
  private apiUrl = 'http://localhost:8080/api';
  private companyID :string; // = '4c40be29-6140-4f52-bc45-19d1e04d421d';
  private issueID = '4c40be29-6140-4f52-bc45-19d1e04d421d';
  private _pagination: BehaviorSubject<PaginationData | null> = new BehaviorSubject(null);
  private _issue_logs: BehaviorSubject<Issue_logsTable[] | null> = new BehaviorSubject(null);


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
  
  get issue_logs$(): Observable<Issue_logsTable[]> {
    return this._issue_logs.asObservable();
  }



  getIssue_logs( page: number = 0, limit: number = 10): Observable<void> {
    const url = `${this.apiUrl}/issue_logs/${this.companyID}`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this._httpClient.get<{ responseKey: string, data: { items: Issue_logsTable[], limit: number, page: number, totalCount: number } }>(url, { params })
      .pipe(
        tap((response) => {
          if (response.responseKey === 'Success') {
            this._issue_logs.next(response.data.items);
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

  getIssue_logDetails(issue_logID: string): Observable<Issue_logsDetails> {
    const url = `${this.apiUrl}/issue_logs/${this.companyID}/${this.issueID}/${issue_logID}`;
    return this._httpClient.get<{ responseKey: string, data: Issue_logsDetails }>(url).pipe(
      map((response) => {
        if (response.responseKey === 'Success') {
          console.log('Issue_log details:', response.data);
          return response.data; 
        } else {
          throw new Error('An error occurred in the response.'); 
        }
      }),
      catchError((error) => {
        console.error('An error occurred while fetching issue_log details:', error);
        return throwError(error); 
      })
    );
  }

  deleteIssue_log( issue_logID: string): Observable<void> {
    const url = `${this.apiUrl}/issue_logs/${this.companyID}/${this.issueID}/${issue_logID}`;
    return this._httpClient.delete<void>(url).pipe(
      tap(() => {
        console.log('Issue_log deleted successfully.');
      }),
      map(() => {})
    );
  }
}
