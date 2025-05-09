import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [TranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
