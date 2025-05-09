import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './animations';

@Component({
    selector: 'money-sprouts-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeAnimation],
    imports: [RouterOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'Money Pig';

    constructor() {}
}
