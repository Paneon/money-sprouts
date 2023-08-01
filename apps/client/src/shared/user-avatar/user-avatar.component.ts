import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'money-sprouts-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {
  @Input() avatarFile = '';
  urlSegment = '';
  smallPaths: string[] = ['dashboard', 'overview', 'history', 'plan'];

  constructor(private router: Router) {}

  ngOnInit() {
    this.urlSegment = this.router.url.split('/')[2];
  }

  getAvatarFile(): string {
    return this.avatarFile;
  }

  getClass(): string {
    if (this.urlSegment === 'userselection') {
      return 'avatar-icon';
    } else if (this.smallPaths.includes(this.urlSegment)) {
      return 'avatar-icon-small';
    } else {
      return '';
    }
  }
}
