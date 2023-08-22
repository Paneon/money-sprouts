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
import { AccountStorageService } from './account-storage.service';
import { Loggable } from './loggable';

@Injectable({
    providedIn: 'root',
})
export class AccountService extends Loggable {
    private currentAccountSubject = new BehaviorSubject<Account | null>(null);
    currentAccount$ = this.currentAccountSubject.asObservable().pipe(
        tap((account) => this.log('Emission from currentAccount$: ', account)),
        shareReplay(1)
    );
    loading = new BehaviorSubject<boolean>(false);

    // Declare accounts$ as an Observable using shareReplay and cache last emitted value
    private accounts$ = this.api.getAccounts().pipe(
        tap((accounts) => this.log('Fetched accounts: ', accounts)),
        catchError((err) => {
            this.error('Error fetching accounts:', err);
            return throwError(() => err);
        }),
        shareReplay(1)
    );

    constructor(
        private api: ApiService,
        private storage: AccountStorageService
    ) {
        super();
        const savedAccount = this.storage.getCurrentAccount();
        if (savedAccount) {
            this.currentAccountSubject.next(savedAccount);
        }
    }

    // fetch all accounts and use tap to store them locally
    getAccounts(): Observable<Account[]> {
        return this.accounts$;
    }

    getAccount(id: number): Observable<Account> {
        return this.api.getAccountById(id);
    }

    /**
     * Refreshes data of a single account
     */
    refreshAccount(id: number) {
        this.getAccount(id).subscribe((account) => {
            this.setAccount(account);
        });
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
        this.storage.saveSelectedAccount(account);
        this.currentAccountSubject.next(account);
    }

    getAvatarForAccount(account: Account | null): string {
        return account?.avatar?.url ?? '';
    }

    logoutOrDeselectAccount() {
        this.loading.next(true);
        this.storage.clearSelectedAccount();
        this.currentAccountSubject.next(null);
        this.loading.next(false);
    }
}
