import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserSelectionComponent} from "./user-selection/user-selection.component";
import {SharedModule} from "../../shared/shared.module";

const components = [
  UserSelectionComponent
];
const modules = [
  CommonModule,
  SharedModule
]

@NgModule({
  declarations: [ ...components ],
  imports: [ ...modules],
  exports: [ ...components, ...modules],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class PagesModule{}
