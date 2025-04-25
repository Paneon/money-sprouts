import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [TranslateModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
