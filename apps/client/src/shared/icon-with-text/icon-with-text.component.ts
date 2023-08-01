import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'money-sprouts-icon-with-text',
  templateUrl: './icon-with-text.component.html',
  styleUrls: ['./icon-with-text.component.scss'],
})
export class IconWithTextComponent {
  @Input() avatarFile: string;
  @Input() username: string;
  @Output() userSelected: EventEmitter<string> = new EventEmitter<string>();

  onUserSelected(): void {
    this.userSelected.emit(this.username);
  }
}
