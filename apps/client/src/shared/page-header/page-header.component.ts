import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../app/services/user.service';
import { Observable, Subject, of, switchMap, takeUntil, tap } from 'rxjs';
import { User } from '@money-sprouts/shared/domain';

@Component({
  selector: 'money-sprouts-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  childClass: string;
  username: string;
  user$: Observable<User | null>;
  urlSegment: string;
  logout = 'Logout';
  avatar: string;

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private settings: UserService) {}

  ngOnInit() {
    const urlSegments = this.router.url.split('/');
    this.urlSegment = urlSegments[urlSegments.length - 1];
    this.username = urlSegments[2];

    this.settings.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: User | null) => {
      // Only fetch the user if no user is present or the username has changed
      if (!user || user.name !== this.username) {
        this.settings
          .fetchUser(this.username)
          .pipe(takeUntil(this.destroy$))
          .subscribe((fetchedUser: User | null) => {
            if(fetchedUser){
              this.avatar = fetchedUser.avatar;
              this.user$ = of(fetchedUser);
            }
          });
      } else if (user) {
        // Assign the user to this.user$
        this.user$ = of(user);
        this.avatar = user.avatar;
      }
    });
  }

  backToDashboard() {
    if (this.urlSegment !== 'dashboard') {
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

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
