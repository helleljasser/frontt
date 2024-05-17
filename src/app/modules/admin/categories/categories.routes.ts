import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { CategoriesListComponent } from 'app/modules/admin/categories/categories.component';
import { CategoryService } from './categories.service';

export default [
  
    {
        path     : '',
        component: CategoriesListComponent,
        resolve  : {
               
            categories  : () => inject(CategoryService).getCategories(),
      
        },
      
        
    },
] as Routes;
