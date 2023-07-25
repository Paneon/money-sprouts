import {Component, Input} from '@angular/core';

@Component({
  selector: 'money-sprouts-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() avatarFile = '';

  getAvatarFile(): string {
    return `url('${this.avatarFile}')`;
  }

}
