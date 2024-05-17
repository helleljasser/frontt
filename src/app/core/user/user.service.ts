import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService
{
    private _user: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);
    private localStorageKey = 'currentUser';

    constructor(private _httpClient: HttpClient)
    {
        // Au moment de l'initialisation du service, vérifiez s'il y a des données utilisateur dans le localStorage
        const savedUser = localStorage.getItem(this.localStorageKey);
        if (savedUser) {
            // Si des données utilisateur sont disponibles dans le localStorage, mettez-les à jour dans le ReplaySubject
            this._user.next(JSON.parse(savedUser));
        }
    }

    // Setter & getter pour l'utilisateur
    set user(value: User | null)
    {
        // Mettre à jour la valeur
        this._user.next(value);
        // Stocker les données utilisateur dans le localStorage
        if (value) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(value));
        } else {
            localStorage.removeItem(this.localStorageKey);
        }
    }

    get user$(): Observable<User | null>
    {
        return this._user.asObservable();
    }

    // Méthodes publiques

    /**
     * Obtenir les données de l'utilisateur actuellement connecté
     */
    get(): Observable<User>
    {
        return this._httpClient.get<User>('http://localhost:8080/api/users/4c40be29-6140-4f52-bc45-19d1e04d421d/f8c3a4ca-c222-4f69-9b3e-d0227d4f92e8').pipe(
            tap((user) =>
            {
                this.user = user; // Stocker localement les données de l'utilisateur
            }),
        );
    }

    /**
     * Mettre à jour l'utilisateur
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            tap((response) =>
            {
                this.user = response; // Stocker localement les données mises à jour de l'utilisateur
            }),
        );
    }
}
