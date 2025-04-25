import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeAnimation],
    imports: [RouterOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'Money Pig';

    constructor(private translateService: TranslateService) {
        translateService.setDefaultLang('de');
        translateService.use('de');
    }
}
