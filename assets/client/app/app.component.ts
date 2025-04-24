import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeAnimation],
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
    title = 'Money Pig';

    constructor(private translateService: TranslateService) {
        translateService.setDefaultLang('de');
        translateService.use('de');
    }

    ngOnInit(): void {
        // Router initialization is handled by the RouterModule
    }
}
