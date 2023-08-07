import { Component, OnInit } from '@angular/core';
import { User } from '@money-sprouts/shared/domain';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'money-sprouts-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {

  user$: Observable<User | null>;



  constructor(
 
  private userService: UserService
  ) {}

  ngOnInit() {
    this.user$ = this.userService.currentUser$;
  }
}
