import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDetailsComponent } from './user/details/details.component';
import { UserComponent } from './user/user.component';
import { UsersListComponent } from './users.component';
import { UserService } from './users.service';

const userResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.getUser(route.paramMap.get('id')).pipe(
        catchError(error => {
            console.error(error);
            const parentUrl = state.url.split('/').slice(0, -1).join('/');
            router.navigateByUrl(parentUrl);
            return throwError(error);
        })
    );
};

// Resolveur pour le composant UserComponent
const userComponentResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const dialogRefClosed = route.queryParams['dialogClosed'];

    if (dialogRefClosed) {
        // Le popup de détails utilisateur est fermé, naviguer vers la liste des utilisateurs
        const parentUrl = state.url.split('/').slice(0, -1).join('/');
        inject(Router).navigateByUrl(parentUrl);
    }

    // Si le popup de détails utilisateur est ouvert, ne rien faire
    return null;
};

const routes: Routes = [
    {
        path: '',
        component: UsersListComponent,
        resolve: {
            users: () => inject(UserService).getUsers(),
        },
    },
    {
        path: '',
        component: UserComponent,
        resolve: {
            // Utilisez le résolveur pour le composant UserComponent
            userComponentResolver,
        },
        children: [
            {
                path: ':id',
                component: UserDetailsComponent,
                resolve: {
                    user: userResolver,
                },
            },
        ],
    },
];

export default routes;
