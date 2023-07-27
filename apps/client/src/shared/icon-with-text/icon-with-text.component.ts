import {Component, Input} from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'ms-icon-with-text',
  templateUrl: './icon-with-text.component.html',
  styleUrls: ['./icon-with-text.component.scss'],
})
export class IconWithTextComponent {
  @Input() avatarFile: string;
  @Input() username: string;
}
