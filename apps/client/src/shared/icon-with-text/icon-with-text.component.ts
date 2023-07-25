import {Component} from '@angular/core';

@Component({
  selector: 'money-sprouts-icon-with-text',
  templateUrl: './icon-with-text.component.html',
  styleUrls: ['./icon-with-text.component.scss'],
})
export class IconWithTextComponent {
  content = '';
  userAvatarFiles = [
    'assets/images/avatar_male.png',
    'assets/images/avatar_female.png'
  ]
}
