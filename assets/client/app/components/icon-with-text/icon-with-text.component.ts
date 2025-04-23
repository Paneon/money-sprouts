import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'money-sprouts-icon-with-text',
    templateUrl: './icon-with-text.component.html',
    styleUrls: ['./icon-with-text.component.scss'],
})
export class IconWithTextComponent {
    @Input() avatarFile: string = '';
    @Input() name: string = '';
    @Output() accountSelected: EventEmitter<string> =
        new EventEmitter<string>();

    onSelectAccount(): void {
        this.accountSelected.emit(this.name);
    }

    getAvatarPath(): string {
        return this.avatarFile
            ? `/assets/avatars/${this.avatarFile}`
            : '/assets/avatars/default.png';
    }
}
