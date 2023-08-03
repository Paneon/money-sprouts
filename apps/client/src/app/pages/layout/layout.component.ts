import { Component, OnInit } from '@angular/core';
import {
    Router,
    NavigationStart,
    NavigationEnd,
    NavigationError,
} from '@angular/router';

@Component({
    selector: 'money-sprouts-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                console.log('Navigation started');
            }

            if (event instanceof NavigationEnd) {
                console.log('Navigation ended');
            }

            if (event instanceof NavigationError) {
                console.log('Navigation error', event.error);
            }
        });
    }
}
