import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '@/app/types/transaction';
import {
    catchError,
    Observable,
    of,
    shareReplay,
    Subject,
    tap,
    throwError,
} from 'rxjs';
import { ApiService } from '@/app/services/api.service';
import { Loggable } from '@/app/services/loggable';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    private transactionCache: { [accountId: number]: Transaction[] } = {};

    private transactions$ = this.api.getTransactions().pipe(
        tap((transactions) =>
            console.log('Fetched transactions:', transactions)
        ),
        catchError((err) => {
            console.error('Error fetching transactions: ', err);
            return throwError(() => err);
        }),
        shareReplay(1)
    );

    destroy$ = new Subject<Transaction>();

    constructor(private http: HttpClient, private api: ApiService) {}

    getTransactions(): Observable<Transaction[]> {
        return this.transactions$;
    }

    getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
        if (this.transactionCache[accountId]) {
            return of(this.transactionCache[accountId]);
        }

        return this.api.getTransactionsByAccountId(accountId).pipe(
            tap((transactions) => {
                console.log('Fetched transactions:', transactions);
                this.transactionCache[accountId] = transactions;
            }),
            catchError((err) => {
                console.error('Error fetching transactions: ', err);
                return throwError(() => err);
            })
        );
    }

    addTransaction(title: string, value: number, accountId: number): void {
        this.http
            .post('/api/transactions', {
                title,
                value,
                account: '/api/accounts/' + accountId,
            })
            .subscribe({
                next: () => {
                    console.log('transaction added successfully');
                },
                error: (error) => {
                    console.error('Error updating balance: ', error);
                },
            });
    }
}
