import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AccountStorageService } from '../../services/account-storage.service';
import { Locale } from '../../enum/Locale';

@Component({
    selector: 'money-sprouts-multi-language',
    templateUrl: './multi-language.component.html',
    styleUrls: ['./multi-language.component.scss'],
    imports: [TranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiLanguageComponent {
    readonly Locale = Locale;
    langs: Locale[] = [Locale.DE, Locale.EN];
    currentLang: Locale = Locale.DE;

    constructor(
        public translateService: TranslateService,
        private readonly cd: ChangeDetectorRef,
        private readonly accountStorageService: AccountStorageService,
    ) {
        const storedLang = this.accountStorageService.getSelectedLanguage();
        const browserLang = this.translateService.getBrowserLang() ?? Locale.DE;
        this.currentLang =
            storedLang ?? (this.langs.includes(browserLang as Locale) ? (browserLang as Locale) : Locale.DE);

        this.translateService.setDefaultLang(this.currentLang);
        this.translateService.use(this.currentLang);
    }

    switchLang(lang: Locale) {
        this.translateService.use(lang);
        this.currentLang = lang;
        this.accountStorageService.saveSelectedLanguage(lang);
        this.cd.detectChanges();
    }
}
