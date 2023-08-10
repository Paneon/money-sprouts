import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IconWithTextComponent } from './icon-with-text/icon-with-text.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FormatUrlPipe } from '../app/pipes/format-url.pipe';
import { UserService } from '../app/services/user.service';

@NgModule({
    imports: [CommonModule],
    declarations: [
        IconWithTextComponent,
        UserAvatarComponent,
        PageHeaderComponent,
        FormatUrlPipe,
    ],
    exports: [
        IconWithTextComponent,
        UserAvatarComponent,
        PageHeaderComponent,
        FormatUrlPipe,
        CommonModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [UserService],
})
export class SharedModule {}
