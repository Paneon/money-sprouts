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

  transactions = [];

  incomes: any[] = [];
  expenses: any[] = [];

  maxLength = 0;
  displayedItems = 5;

  Math = Math;


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



  showMore() {
    if(this.displayedItems < this.maxLength) {
      this.displayedItems = Math.min(this.displayedItems + 5, this.maxLength);
    }
  }

  hideExtra(){
      this.displayedItems = 5;
  }
}
