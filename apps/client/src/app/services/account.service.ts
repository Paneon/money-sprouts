import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    BehaviorSubject,
    catchError,
    Observable,
    shareReplay,
    tap,
    throwError,
} from 'rxjs';
import { Account } from '@money-sprouts/shared/domain';
import { ApiService } from './api.service';

enum LocalStorageField {
    USER = 'selectedUser',
}

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private currentAccountSubject = new BehaviorSubject<Account | null>(null);
    currentUser$ = this.currentAccountSubject.asObservable().pipe(
        tap((user) => console.log('Emission from currentUser$: ', user)),
        shareReplay(1)
    );
    loading = new BehaviorSubject<boolean>(false);

    // Declare users$ as an Observable using shareReplay and cache last emitted value
    private accounts$ = this.api.getAccounts().pipe(
        tap((users) => console.log('Fetched accounts: ', users)),
        catchError((err) => {
            console.error('Error fetching accounts:', err);
            return throwError(() => err);
        }),
        shareReplay(1)
    );

    constructor(private http: HttpClient, private api: ApiService) {
        const savedUser = localStorage.getItem(LocalStorageField.USER);
        if (savedUser) {
            this.currentAccountSubject.next(JSON.parse(savedUser));
        }
    }

    // fetch all users and use tap to store them locally
    getUsers(): Observable<Account[]> {
        return this.accounts$;
    }

    getAccountByName(name: string): void {
        this.accounts$.subscribe((accounts) => {
            const account = accounts.find((a: Account) => a.name === name);
            // currentUserSubject only emits new value if user is not the same as the current one
            if (
                !this.currentAccountSubject.getValue() ||
                (account &&
                    account.id !== this.currentAccountSubject.getValue().id)
            ) {
                this.currentAccountSubject.next(account);
            }
        });
    }

    setAccount(account: Account) {
        console.log(
            'Storing selected account in local storage: ',
            JSON.stringify(account)
        );
        localStorage.setItem(LocalStorageField.USER, JSON.stringify(account));
        console.log('Setting user:', account);
        this.currentAccountSubject.next(account);
    }

    getAvatarForAccount(account: Account | null): string {
        return account?.avatar?.url ?? '';
    }

    logoutOrDeselectUser() {
        this.loading.next(true);
        localStorage.removeItem(LocalStorageField.USER);
        this.currentAccountSubject.next(null);
        this.loading.next(false);
    }
}
