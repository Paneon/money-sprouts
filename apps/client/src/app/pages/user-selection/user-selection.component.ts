import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { User } from '@money-sprouts/shared/domain';
import { UserService } from '../../services/user.service';


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
        private userService: UserService
    ) {}

  ngOnInit(): void {
    const users: User[] = this.route.snapshot.data['users'];
    for (const user of users) {
      user.avatar = this.userService.getAvatarForUser(user);
    }
    this.users$ = of(users);
  }

  proceed(username: string) {
    if (!username) {
      return;
    }

    this.users$.pipe(take(1)).subscribe(users => {
      const selectedUser = users.find(user => user.name === username);
  
      if (selectedUser) {
        this.userService.setUser(selectedUser);
        setTimeout(() => {
          this.router.navigate([`user/${username}/dashboard`]);
        })
      }
    });
  }
}


