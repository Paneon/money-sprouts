import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@money-sprouts/shared/domain';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'money-sprouts-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss'],
})
export class UserSelectionComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(
    private router: Router,
    public readonly route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.users$ = this.api.getUsers();
  }

  proceed(username: string) {
    if (!username) {
      return;
    }

    this.router.navigate([`${username}/dashboard`]);
  }
}
