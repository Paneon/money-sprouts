import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {IconWithTextComponent} from "./icon-with-text/icon-with-text.component";
import {UserAvatarComponent} from "./user-avatar/user-avatar.component";
import {CommonModule} from "@angular/common";

const components = [
  IconWithTextComponent,
  UserAvatarComponent
];
const modules = [
  CommonModule
]

@NgModule({
  declarations: [ ...components ],
  imports: [ ...modules],
  exports: [ ...components, ...modules], 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class SharedModule{}
