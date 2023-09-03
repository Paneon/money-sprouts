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

        this.setInitialBalance(account.balance);
    }

    getAvatarForAccount(account: Account | null): string {
        return account?.avatar?.url ?? '';
    }

    // Method to get the current balance
    getCurrentBalance(): number | null {
        // TODO rename
        const currentUser = this.currentAccountSubject.getValue();
        return currentUser?.balance || null;
    }

    // Method to update the balance temporarily
    updateBalanceTemporarily(amount: number): void {
        // TODO rename
        const currentUser = this.currentAccountSubject.getValue();
        if (currentUser && typeof currentUser.balance === 'number') {
            currentUser.balance -= amount;
            this.currentAccountSubject.next(currentUser);
        }
    }

    // Method to reset the balance to the original value
    resetBalanceToOriginal(): void {
        console.log('resetBalanceToOriginal triggered');
        // TODO rename
        const currentUser = this.currentAccountSubject.getValue();
        this.originalBalance = currentUser.balance;

        // Log the values and conditions
        console.log('currentUser:', currentUser);
        console.log('typeof currentUser.balance:', typeof currentUser.balance);
        console.log('this.originalBalance:', this.originalBalance);

        if (
            currentUser &&
            typeof currentUser.balance === 'number' &&
            this.originalBalance !== null
        ) {
            currentUser.balance = this.originalBalance;
            console.log('resetBalance: ', currentUser.balance);
            this.currentAccountSubject.next(currentUser);
        }
    }

    applyBalanceChange(): void {
        const currentUserBalance = this.getCurrentBalance();
        if (currentUserBalance !== null) {
            this.http
                .patch('/api/transactions/:userId', {
                    newBalance: currentUserBalance,
                })
                .subscribe({
                    next: () => {
                        this.balanceUpdateStatus.next('success');
                        this.originalBalance = this.currentBalance;
                    },
                    error: (error) => {
                        console.error('Error updating balance: ', error);
                        this.balanceUpdateStatus.next('error');
                        const currentBalance = this.getCurrentBalance();
                        if (currentBalance !== null) {
                            this.updateBalanceTemporarily(
                                this.originalBalance - currentBalance
                            );
                        }
                    },
                });
        }
    }

    logoutOrDeselectAccount() {
        this.loading.next(true);
        this.storage.clearSelectedAccount();
        this.currentAccountSubject.next(null);
        this.loading.next(false);
    }
}
