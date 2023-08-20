import { Injectable } from '@angular/core';
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
    ACCOUNT = 'selectedAccount',
}

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private currentAccountSubject = new BehaviorSubject<Account | null>(null);
    currentAccount$ = this.currentAccountSubject.asObservable().pipe(
        tap((account) =>
            console.log('Emission from currentAccount$: ', account)
        ),
        shareReplay(1)
    );
    loading = new BehaviorSubject<boolean>(false);

    // Declare accounts$ as an Observable using shareReplay and cache last emitted value
    private accounts$ = this.api.getAccounts().pipe(
        tap((accounts) =>
            console.log('[AccountService] Fetched accounts: ', accounts)
        ),
        catchError((err) => {
            console.error('Error fetching accounts:', err);
            return throwError(() => err);
        }),
        shareReplay(1)
    );

    constructor(private api: ApiService) {
        const savedAccount = localStorage.getItem(LocalStorageField.ACCOUNT);
        if (savedAccount) {
            this.currentAccountSubject.next(JSON.parse(savedAccount));
        }
    }

    // fetch all accounts and use tap to store them locally
    getAccounts(): Observable<Account[]> {
        return this.accounts$;
    }

    getAccountByName(name: string): void {
        this.accounts$.subscribe((accounts) => {
            const account = accounts.find((a: Account) => a.name === name);
            // currentAccountSubject only emits new value if account is not the same as the current one
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
        localStorage.setItem(
            LocalStorageField.ACCOUNT,
            JSON.stringify(account)
        );
        console.log('Setting account:', account);
        this.currentAccountSubject.next(account);
    }

    getAvatarForAccount(account: Account | null): string {
        return account?.avatar?.url ?? '';
    }

    logoutOrDeselectAccount() {
        this.loading.next(true);
        localStorage.removeItem(LocalStorageField.ACCOUNT);
        this.currentAccountSubject.next(null);
        this.loading.next(false);
    }
}
