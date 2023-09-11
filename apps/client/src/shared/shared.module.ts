import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IconWithTextComponent } from './icon-with-text/icon-with-text.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FormatUrlPipe } from '../app/pipes/format-url.pipe';
import { AccountService } from '../app/services/account.service';
import { MultilanguageComponent } from './multilanguage/multilanguage.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, TranslateModule],
    declarations: [
        IconWithTextComponent,
        UserAvatarComponent,
        PageHeaderComponent,
        FormatUrlPipe,
        MultilanguageComponent,
    ],
    exports: [
        IconWithTextComponent,
        UserAvatarComponent,
        PageHeaderComponent,
        FormatUrlPipe,
        CommonModule,
        MultilanguageComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [AccountService],
})
export class SharedModule {}
