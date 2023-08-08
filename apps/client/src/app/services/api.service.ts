import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import {
  PagedCollection,
  Transaction,
  User,
} from '@money-sprouts/shared/domain';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  private usersCache: User[] = [];
  private transactionCache: Transaction[] = [];

  constructor(private http: HttpClient) {}

  getUsers(forceRefresh = false): Observable<User[]> {
    if (this.usersCache.length && !forceRefresh) {
      return of(this.usersCache);
    }

    return this.http
      .get<User[]>(`${this.baseUrl}/users.json?tracked=true`)
      .pipe(
        map((response) => {
          console.log({ response });
          this.usersCache = response;
          return this.usersCache;
        })
      );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}.json`);
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
    return this.http.get<Transaction>(`${this.baseUrl}/transactions/${id}.json`);
  }

  getTransactionsByUserId(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction>(
      `${this.baseUrl}/transactions.json?user.id=${userId}`
    );
  }
}
