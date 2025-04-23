import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environments';
import { Loggable } from './loggable';
import { Account } from '@/app/types/account';
import { Transaction } from '@/app/types/transaction';
import { PagedCollection } from '@/app/types/Collection';

@Injectable({
    providedIn: 'root',
})
export class ApiService extends Loggable {
    private baseUrl = environment.apiUrl;

    private accountsCache: Account[] = [];
    private transactionCache: Transaction[] = [];

    constructor(private http: HttpClient) {
        super();
    }

    getAccounts(forceRefresh = false): Observable<Account[]> {
        if (this.accountsCache.length && !forceRefresh) {
            return of(this.accountsCache);
        }

        return this.http.get<Account[]>(`${this.baseUrl}/accounts.json`).pipe(
            map((response) => {
                this.log({ response });
                this.accountsCache = response;
                return this.accountsCache;
            })
        );
    }
    getAccountById(id: number): Observable<Account> {
        this.log('refresh account ', id);
        return this.http.get<Account>(`${this.baseUrl}/accounts/${id}.json`);
    }

    getTransactions(forceRefresh = false): Observable<Transaction[]> {
        if (this.transactionCache.length && !forceRefresh) {
            return of(this.transactionCache);
        }

        return this.http
            .get<PagedCollection<Transaction>>(`${this.baseUrl}/transactions/`)
            .pipe(
                map((response) => {
                    this.transactionCache = response['hydra:member']!;
                    return this.transactionCache;
                })
            );
    }

    getTransactionById(id: number): Observable<Transaction> {
        return this.http.get<Transaction>(
            `${this.baseUrl}/transactions/${id}.json`
        );
    }

    getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(
            `${this.baseUrl}/transactions.json?account.id=${accountId}&order[effectiveOn]=desc`
        );
    }
}
