import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule],
    exports: [CommonModule, FormsModule, TranslateModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [AccountService],
})
export class PagesModule {}
