import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormatUrlPipe } from '../../pipes/format-url.pipe';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
    selector: 'money-sprouts-icon-with-text',
    templateUrl: './icon-with-text.component.html',
    styleUrls: ['./icon-with-text.component.scss'],
    imports: [CommonModule, TranslateModule, FormatUrlPipe, UserAvatarComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconWithTextComponent {
    @Input() avatarFile: string;
    @Input() name: string;
    @Output() readonly accountSelected = new EventEmitter<string>();

    onSelectAccount(): void {
        this.accountSelected.emit(this.name);
    }
}
