import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { CompaniesListComponent } from 'app/modules/admin/companies/companies.component';
import { CompanyService } from './companies.service';

export default [
  
    {
        path     : '',
        component: CompaniesListComponent,
        resolve  : {
               
            companies  : () => inject(CompanyService).getCompanies(),
      
        },
      
        
    },
] as Routes;
