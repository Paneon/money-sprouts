import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../app/services/user.service';
import { Observable, of, switchMap, tap } from 'rxjs';
import { User } from '@money-sprouts/shared/domain';

@Component({
  selector: 'money-sprouts-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  childClass: string;
  username: string;
  user$: Observable<User | null>;
  urlSegment: string;
  logout = 'Logout';
  smallPaths: string[] = ['dashboard', 'overview', 'history', 'plan'];
  showImages = false;
  avatar: string;

  constructor(private router: Router, private settings: UserService) {}

  ngOnInit() {
    const urlSegments = this.router.url.split('/');
    this.username = urlSegments[2];

    this.settings.user$.subscribe((user: User | null) => {
      // Only fetch the user if no user is present or the username has changed
      if (!user || user.name !== this.username) {
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
      this.router.navigate([`user/${this.username}/dashboard`]);
    } else {
      return;
    }
  }

  backToSelection() {
    this.router.navigate(['userselection']);
  }

  get pageTitle(): string {
    const pageName = this.router.url.split('/')[3];
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

  handleClassChange(cssClass: string) {
    this.childClass = cssClass;
  }
}
