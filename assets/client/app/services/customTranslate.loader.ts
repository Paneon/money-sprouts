import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class customTranslate implements TranslateLoader {
    constructor(private http: HttpClient) {}
    getTranslation(lang: string): Observable<unknown> {
        return this.http
            .get(`/build/i18n/${lang}.json`)
            .pipe(catchError((/*_*/) => this.http.get(`/build/i18n/en.json`)));
    }
}
