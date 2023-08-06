import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, distinctUntilChanged, filter, map, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '@money-sprouts/shared/domain';

interface Section {
  name: string;
  image: string;
}

@Component({
  selector: 'money-sprouts-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username: string;
  user$: Observable<User>;
  users$: Observable<User[]>;
  urlSegments: string;

  sections: Section[] = [
    {
      name: 'overview',
      image: './assets/images/overview.png',
    },
    {
      name: 'history',
      image: './assets/images/history.png',
    },
    {
      name: 'plan',
      image: './assets/images/plan.png',
    },
  ];

  private destroy$ = new Subject<void>();


  constructor(
    private router: Router, 
    private userService: UserService
    ) {}

  ngOnInit() {
    this.sections;
    const urlSegments = this.router.url.split('/');
    this.username = urlSegments[2];
    this.user$ = this.userService.currentUser$;
    
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.url.split('/')[2]),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(username => {
        this.username = username;
        this.userService.getUserByUsername(username)
      });
  }

  goToSection(section: string) {
    if (!this.username) {
      console.error('No username available!');
      return;
    }
    this.router.navigate([`user/${this.username}/${section}`]);
  }
}
