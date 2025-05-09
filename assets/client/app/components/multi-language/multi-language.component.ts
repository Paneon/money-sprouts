import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-multi-language',
    templateUrl: './multi-language.component.html',
    styleUrls: ['./multi-language.component.scss'],
    imports: [TranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiLanguageComponent {
    langs: string[] = ['de', 'en'];

    currentLang = 'de';
    constructor(
        public translateService: TranslateService,
        private readonly cd: ChangeDetectorRef,
    ) {
        const browserLang = this.translateService.getBrowserLang() ?? 'de';
        this.currentLang = this.langs.includes(browserLang) ? browserLang : 'de';

        this.translateService.setDefaultLang(this.currentLang);
        this.translateService.use(this.currentLang);
    }

    switchLang(lang: string) {
        this.translateService.use(lang);
        this.currentLang = lang;
        this.cd.detectChanges();
    }
}
