import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'money-sprouts-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Money Pig';

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.initialNavigation();
    }
}
