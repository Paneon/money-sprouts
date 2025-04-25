import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-multilanguage',
    templateUrl: './multilanguage.component.html',
    styleUrls: ['./multilanguage.component.scss'],
    imports: [TranslateModule]
})
export class MultilanguageComponent {
    langs: string[] = ['de', 'en'];

    currentLang = 'de';
    constructor(
        public translateService: TranslateService,
        private readonly cd: ChangeDetectorRef
    ) {
        const browserLang = this.translateService.getBrowserLang() ?? 'de';
        this.currentLang = this.langs.includes(browserLang)
            ? browserLang
            : 'de';

        this.translateService.setDefaultLang(this.currentLang);
        this.translateService.use(this.currentLang);
    }

    switchLang(lang: string) {
        this.translateService.use(lang);
        this.currentLang = lang;
        this.cd.detectChanges();
    }
}
