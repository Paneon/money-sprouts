import { Injectable } from '@angular/core';
import { Account } from '../types/account';
import { Avatar } from '../types/avatar';
import { Loggable } from './loggable';
import { Locale } from '../enum/Locale';

enum LocalStorageField {
    ACCOUNT = 'selectedAccount',
    LANGUAGE = 'selectedLanguage',
}

@Injectable({
    providedIn: 'root',
})
export class AccountStorageService extends Loggable {
    getCurrentAccount() {
        const storedValue = localStorage.getItem(LocalStorageField.ACCOUNT) || '{}';
        const account = JSON.parse(storedValue);

        if (!this.isValidAccount(account)) {
            this.error('Invalid account stored in LocalStorage');
            return null;
        }

        return account;
    }

    saveSelectedAccount(account: Account) {
        const string = JSON.stringify(account);
        localStorage.setItem(LocalStorageField.ACCOUNT, string);
    }

    clearSelectedAccount() {
        localStorage.removeItem(LocalStorageField.ACCOUNT);
    }

    getSelectedLanguage(): Locale | null {
        const lang = localStorage.getItem(LocalStorageField.LANGUAGE);
        return lang === Locale.DE || lang === Locale.EN ? lang : null;
    }

    saveSelectedLanguage(lang: Locale) {
        localStorage.setItem(LocalStorageField.LANGUAGE, lang);
    }

    clearSelectedLanguage() {
        localStorage.removeItem(LocalStorageField.LANGUAGE);
    }

    isValidAvatar(object: Partial<Avatar>): object is Avatar {
        return typeof object === 'object' && typeof object.id === 'number' && typeof object.url === 'string';
    }

    isValidDate(value: unknown): value is Date {
        return value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)));
    }

    isValidAccount(object: Partial<Account>): object is Account {
        return (
            typeof object === 'object' &&
            typeof object.id === 'number' &&
            typeof object.user === 'string' &&
            typeof object.name === 'string' &&
            (typeof object.avatar === 'undefined' || this.isValidAvatar(object.avatar)) &&
            typeof object.balance === 'number' &&
            typeof object.allowance === 'number' &&
            (typeof object.firstPayday === 'undefined' || this.isValidDate(object.firstPayday)) &&
            (typeof object.nextPayday === 'undefined' || this.isValidDate(object.nextPayday))
        );
    }
}
