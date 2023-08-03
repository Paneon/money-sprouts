import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../app/services/user.service';
import { Observable } from 'rxjs';
import { User } from '@money-sprouts/shared/domain';

@Component({
  selector: 'money-sprouts-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  username: string;
  user$: Observable<User | null>;
  urlSegments: string;

  constructor(private router: Router, private settings: UserService) {}

  ngOnInit() {
    const urlSegments = this.router.url.split('/');
    this.username = urlSegments[1];
    this.user$ = this.settings.fetchUser(this.username);
  }

  backToDashboard() {
    if (this.urlSegments !== 'dashboard') {
      this.router.navigate([`${this.username}/dashboard`]);
    } else {
      return;
    }
  }

  backToSelection() {
    this.router.navigate(['userselection']);
  }

  get pageTitle(): string {
    const pageName = this.router.url.split('/')[2];
    switch (pageName) {
      case 'dashboard':
        return 'Dashboard';
      case 'overview':
        return 'Overview';
      case 'history':
        return 'History';
      case 'plan':
        return 'Plan';
      default:
        return '';
    }
  }
}
