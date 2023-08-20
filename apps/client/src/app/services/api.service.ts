import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import {
    Account,
    PagedCollection,
    Transaction,
} from '@money-sprouts/shared/domain';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = environment.apiUrl;

    private accountsCache: Account[] = [];
    private transactionCache: Transaction[] = [];

    constructor(private http: HttpClient) {}

    getAccounts(forceRefresh = false): Observable<Account[]> {
        if (this.accountsCache.length && !forceRefresh) {
            return of(this.accountsCache);
        }

        return this.http.get<Account[]>(`${this.baseUrl}/accounts.json`).pipe(
            map((response) => {
                console.log({ response });
                this.accountsCache = response;
                return this.accountsCache;
            })
        );
    }
    getAccountById(id: number): Observable<Account> {
        console.log('refresh account ', id);
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
                    this.transactionCache = response['hydra:member'];
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
            `${this.baseUrl}/transactions.json?account.id=${accountId}`
        );
    }
}
