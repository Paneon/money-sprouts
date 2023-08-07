import { Component, OnInit } from '@angular/core';
import { User } from '@money-sprouts/shared/domain';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'money-sprouts-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {

  user$: Observable<User | null>;

  transactions = [
    // Example data
    /** 
    { type: '+', title: 'pocket money', value: 2000 },
    { type: '+', title: 'interest', value: 50 },
    { type: '-', title: 'books', value: 1500 },
    { type: '-', title: 'toys', value: 800 },
    { type: '+', title: 'interest', value: 50 },
    */
  ];

  incomes: any[] = [];
  expenses: any[] = [];

  maxLength = 0;


  constructor(
    private userService: UserService,
    private transactionService: TransactionService,
  ) {}

  ngOnInit() {
    this.user$ = this.userService.currentUser$;
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;

      this.filterTransactions();
    })
  }

  filterTransactions() {
    this.incomes = this.transactions.filter(t => t.type === 1);
    this.expenses = this.transactions.filter(t => t.type === 2);

    this.maxLength = Math.max(this.incomes.length, this.expenses.length);
  }



  loadMore() {
    // logic will be added
  }
}
