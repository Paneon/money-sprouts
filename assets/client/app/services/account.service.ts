import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    BehaviorSubject,
    catchError,
    Observable,
    shareReplay,
    tap,
    throwError,
    map,
} from 'rxjs';
import { Account } from '../types/account';
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
        return this.getAccount(id).subscribe((account) => {
            this.setAccount(account);
        });
    }

    getAccountByName(name: string): Observable<Account> {
        return this.accounts$.pipe(
            map((accounts) => {
                const account = accounts.find((a: Account) => a.name === name);
                if (!account) {
                    throw new Error(`Account with name ${name} not found`);
                }
                // currentAccountSubject only emits new value if account is not the same as the current one
                if (
                    !this.currentAccountSubject.getValue() ||
                    (account &&
                        account.id !==
                            this.currentAccountSubject.getValue()?.id)
                ) {
                    this.currentAccountSubject.next(account);
                }
                return account;
            })
        );
    }

    setAccount(account: Account) {
        this.storage.saveSelectedAccount(account);
        this.currentAccountSubject.next(account);

        this.setInitialBalance(account.balance as number);
    }

    getAvatarForAccount(account: Account): string {
        if (typeof account.id !== 'number') {
            return 'assets/images/avatars/default-0.png';
        }

        if (account.avatar?.url) {
            return account.avatar.url;
        }

        return this.getDefaultAvatar(account.id as number);
    }

    private getDefaultAvatar(id: number): string {
        return `assets/images/avatars/default-${id % 5}.png`;
    }

    getCurrentBalance(): Observable<number | null> {
        return this.currentAccountSubject.pipe(
            map((account) => {
                if (!account || typeof account.balance !== 'number') {
                    return null;
                }
                return account.balance as number;
            })
        );
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
