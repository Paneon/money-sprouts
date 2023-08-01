import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserService } from '../../services/user.service';

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
  user$: Observable<User | null>;
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
    const urlSegments = this.router.url.split('/');
    this.username = urlSegments[1];
    this.user$ = this.settings.fetchUser(this.username);
  }

  goToSection(section: string) {
    this.router.navigate([`${this.username}/${section}`]);
  }
}
