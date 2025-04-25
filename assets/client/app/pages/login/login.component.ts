import { Component } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [TranslateModule],
})
export class LoginComponent {}
