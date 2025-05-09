import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, shareReplay, tap, throwError, map, distinctUntilChanged } from 'rxjs';
import { Account } from '../types/account';
import { ApiService } from './api.service';
import { AccountStorageService } from './account-storage.service';
import { Loggable } from './loggable';

@Injectable({
    providedIn: 'root',
})
export class AccountService extends Loggable {
    private currentAccountSubject = new BehaviorSubject<Account | null>(null);
    currentAccount$ = this.currentAccountSubject.asObservable().pipe(shareReplay(1));
    loading = new BehaviorSubject<boolean>(false);

    // Declare accounts$ as an Observable using shareReplay and cache last emitted value
    private accounts$ = this.api.getAccounts().pipe(
        tap((accounts) => this.log('Fetched accounts: ', accounts)),
        catchError((err) => {
            this.error('Error fetching accounts:', err);
            return throwError(() => err);
        }),
        shareReplay(1),
    );

    private originalBalance: number | null = null;
    private currentBalance: number | null = null;

    setInitialBalance(balance: number): void {
        this.originalBalance = balance;
        this.currentBalance = balance;
    }

    private balanceUpdateStatus = new BehaviorSubject<string>('');
    public balanceUpdateStatus$ = this.balanceUpdateStatus.asObservable();

    constructor(
        private http: HttpClient,
        private api: ApiService,
        private storage: AccountStorageService,
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
        return this.getAccount(id).subscribe((account) => {
            this.setAccount(account);
        });
    }

    setAccount(account: Account) {
        this.storage.saveSelectedAccount(account);
        this.currentAccountSubject.next(account);

        this.setInitialBalance(account.balance as number);
    }

    getAvatarForAccount(account: Account | null): string {
        return account?.avatar?.url ?? '';
    }

    getCurrentBalance(): number | null {
        const currentAccount = this.currentAccountSubject.getValue();
        return currentAccount?.balance || null;
    }

    getCurrentAccountId(): number | null {
        const currentAccount = this.currentAccountSubject.getValue();
        return currentAccount?.id ?? null;
    }

    logoutOrDeselectAccount() {
        this.loading.next(true);
        this.storage.clearSelectedAccount();
        this.currentAccountSubject.next(null);
        this.loading.next(false);
    }
}
