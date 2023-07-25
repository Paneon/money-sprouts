import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { User } from '../../services/settings.service'

@Component({
  selector: 'money-sprouts-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss'],
})
export class UserSelectionComponent implements OnInit{


  users: User[] = [];

  constructor(
    private router: Router,
    public readonly route: ActivatedRoute,
    private settings: SettingsService
  ){}

  ngOnInit(): void {
      this.settings.getUsers().subscribe(users => {
        this.users = users;
      })
  }
 
  proceed(username: string){
    if (!username) {
      console.log('Username is not defined.');
      return;
    }
    console.log('navigated');
    this.router.navigate([`${username}/overview`], {relativeTo: this.route});
  }
}
