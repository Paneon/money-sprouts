import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../../app/services/user.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'money-sprouts-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  logout = 'Logout';
  username: string;
  user$: Observable<User | null>;
  urlSegments: string;

  constructor(private router: Router, private settings: UserService) {}

  ngOnInit() {
    const urlSegments = this.router.url.split('/');
    this.username = urlSegments[1];

    this.settings.user$.subscribe((user: User | null) => {
      // Only fetch the user if no user is present or the username has changed
      if (!user || user.username !== this.username) {
        this.settings
          .fetchUser(this.username)
          .subscribe((fetchedUser: User | null) => {
            this.user$ = of(fetchedUser);
          });
      } else {
        // Assign the user to this.user$
        this.user$ = of(user);
      }
    });
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
