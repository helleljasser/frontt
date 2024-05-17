import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private _companyID: string = '';

  setCompanyID(companyID: string): void {
    this._companyID = companyID;
  }

  get companyID(): string {
    return this._companyID;
  }
}