import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { MultiLanguageComponent } from '../../components/multi-language/multi-language.component';

@Component({
    selector: 'money-sprouts-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss'],
    imports: [TranslateModule, MultiLanguageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartComponent {
    constructor(private readonly router: Router) {}
}
