import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './animations';

@Component({
    selector: 'money-sprouts-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
    title = 'Money Pig';

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.initialNavigation();
    }
}
