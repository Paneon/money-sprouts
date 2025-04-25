import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { MultilanguageComponent } from '../../components/multilanguage/multilanguage.component';

@Component({
    selector: 'money-sprouts-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss'],
    imports: [TranslateModule, MultilanguageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartComponent {
    constructor(private readonly router: Router) {}
}
