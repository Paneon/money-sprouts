import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-multilanguage',
    templateUrl: './multilanguage.component.html',
    styleUrls: ['./multilanguage.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslateModule],
})
export class MultilanguageComponent implements OnInit {
    langs = ['en', 'de'];
    currentLang: string = 'en';

    constructor(private translate: TranslateService) {}

    ngOnInit() {
        const browserLang = this.translate.getBrowserLang();
        this.currentLang =
            browserLang && this.langs.includes(browserLang)
                ? browserLang
                : this.langs[0];
        this.translate.use(this.currentLang);
    }

    switchLanguage(lang: string) {
        this.currentLang = lang;
        this.translate.use(lang);
    }
}
