import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '@money-sprouts/shared/domain';
import { Observable, Subject, catchError, shareReplay, takeUntil, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions$ = this.api.getTransactions().pipe(
    tap(transactions => console.log('Fetched transactions:', transactions)),
    catchError(err => {
      console.error("Error fetching transactions: ", err);
      return throwError(() => err);
    }),
    shareReplay(1)
  )

  destroy$ = new Subject<Transaction>();

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions$;
  }

  getTransactionsByUserId(userId: number): Observable<Transaction[]> {
    return this.api.getTransactionsByUserId(userId)
    .pipe(
      takeUntil(this.destroy$),
      tap(transactions => console.log('Fetched transactions:', transactions)),
      catchError(err => {
        console.error("Error fetching transactions: ", err);
        return throwError(() => err);
      }))
  }
}
