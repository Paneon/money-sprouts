import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IconWithTextComponent } from './icon-with-text/icon-with-text.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FormatUrlPipe } from '../app/pipes/format-url.pipe';

const components = [
  IconWithTextComponent,
  UserAvatarComponent,
  PageHeaderComponent,
  FormatUrlPipe,
];
const modules = [CommonModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class SharedModule {}
