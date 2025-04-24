import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MultilanguageComponent } from '../../components/multilanguage/multilanguage.component';

@Component({
    selector: 'money-sprouts-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslateModule, MultilanguageComponent],
})
export class StartComponent {
    constructor(private readonly router: Router) {}
}
