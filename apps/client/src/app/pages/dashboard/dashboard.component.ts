import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
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

  constructor(private router: Router, private settings: UserService) {}

  ngOnInit() {
    this.sections;
    const urlSegments = this.router.url.split('/');
    this.username = urlSegments[2];
    this.user$ = this.settings.fetchUser(this.username).pipe(
      tap((user: User) => {
        if (user) {
          this.username = user.name;
          console.log('User data:', user);
        } else {
          console.error('User data not available');
        }
      })
    );
  }

  goToSection(section: string) {
    if (!this.username) {
      console.error('No username available!');
      return;
    }
    this.router.navigate([`user/${this.username}/${section}`]);
  }
}
