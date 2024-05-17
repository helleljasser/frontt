import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { PermissionsPermissionComponent } from 'app/modules/admin/permissions/permissions.component';
import { PermissionService } from './permissions.service';

export default [
  
    {
        path     : '',
        component: PermissionsPermissionComponent,
        resolve  : {
               
            permissions  : () => inject(PermissionService).getPermissions(),
      
        },
      
        
    },
] as Routes;
