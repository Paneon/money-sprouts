import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../app/services/user.service';
import { Observable, Subject, distinctUntilChanged, filter, map, takeUntil } from 'rxjs';
import { User } from '@money-sprouts/shared/domain';

@Component({
  selector: 'money-sprouts-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  childClass: string;
  username: string;
  user$: Observable<User | null>
  urlSegment: string;
  logout = 'Logout';
  avatar: string;
  id: number;

  private destroy$ = new Subject<void>();


  constructor(
    private router: Router,
    private userService: UserService,
    ) {}

  ngOnInit() {
    const urlSegments = this.router.url.split('/');
    this.urlSegment = urlSegments[urlSegments.length - 1];
    this.username = urlSegments[2];

    this.user$ = this.userService.currentUser$;
    
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.url.split('/')[1]), // assuming username is the second part of url
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
       .subscribe(username => {
        this.username = username;
        this.userService.getUserByUsername(username)
      });
  }

  goBack() {
      if (this.urlSegment === 'dashboard') {
          this.router.navigate(['userselection']);
      } else if (this.urlSegment === 'history' || this.urlSegment === 'plan' || this.urlSegment === 'overview'){
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
