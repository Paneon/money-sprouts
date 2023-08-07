import { Component, OnInit } from '@angular/core';
import { User } from '@money-sprouts/shared/domain';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'money-sprouts-balance-overview',
  templateUrl: './balance-overview.component.html',
  styleUrls: ['./balance-overview.component.scss'],
})
export class BalanceOverviewComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user$ = this.userService.currentUser$;
    
  }
}
