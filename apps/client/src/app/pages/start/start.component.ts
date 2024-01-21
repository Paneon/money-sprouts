import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'money-sprouts-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss'],
})
export class StartComponent {
    constructor(private readonly router: Router) {}
}
