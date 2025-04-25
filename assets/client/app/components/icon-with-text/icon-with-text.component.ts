import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormatUrlPipe } from '../../pipes/format-url.pipe';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
    selector: 'money-sprouts-icon-with-text',
    templateUrl: './icon-with-text.component.html',
    styleUrls: ['./icon-with-text.component.scss'],
    imports: [FormatUrlPipe, UserAvatarComponent]
})
export class IconWithTextComponent {
    @Input() avatarFile: string;
    @Input() name: string;
    @Output() accountSelected: EventEmitter<string> =
        new EventEmitter<string>();

    onSelectAccount(): void {
        this.accountSelected.emit(this.name);
    }
}
