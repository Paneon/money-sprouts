import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Transaction,
  User,
  PagedCollection,
} from '@money-sprouts/shared/domain';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * TODO replace with .env variable
   */
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<PagedCollection<User>> {
    return this.http.get<PagedCollection<User>>(`${this.baseUrl}/api/users/`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/users/${id}`);
  }

  getTransactions(): Observable<PagedCollection<Transaction>> {
    return this.http.get<PagedCollection<Transaction>>(
      `${this.baseUrl}/api/transactions/`
    );
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/api/transactions/${id}`);
  }

  getTransactionsByUserId(userId: string): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${this.baseUrl}/api/users/${userId}/transactions`
    );
  }
}
