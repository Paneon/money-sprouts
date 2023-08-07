import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '@money-sprouts/shared/domain';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
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

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions$;
}
}
