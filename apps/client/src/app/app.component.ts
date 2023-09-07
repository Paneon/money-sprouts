import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
    title = 'Money Pig';

    constructor(
        private router: Router,
        private translateService: TranslateService
    ) {
        translateService.setDefaultLang('de');
        translateService.use('de');
    }

    ngOnInit(): void {
        this.router.initialNavigation();
    }
}
