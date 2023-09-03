import { Injectable } from '@angular/core';
import { Account, Avatar } from '@money-sprouts/shared/domain';
import { Loggable } from './loggable';

enum LocalStorageField {
    ACCOUNT = 'selectedAccount',
}

@Injectable({
    providedIn: 'root',
})
export class AccountStorageService extends Loggable {
    getCurrentAccount() {
        const storedValue =
            localStorage.getItem(LocalStorageField.ACCOUNT) || '{}';
        const account = JSON.parse(storedValue);

        if (!this.isValidAccount(account)) {
            this.error('Invalid account stored in LocalStorage');
            return null;
        }

        return account;
    }

    saveSelectedAccount(account: Account) {
        const string = JSON.stringify(account);
        this.log('Storing selected account in local storage: ', string);
        localStorage.setItem(LocalStorageField.ACCOUNT, string);
    }

    clearSelectedAccount() {
        localStorage.removeItem(LocalStorageField.ACCOUNT);
    }

    isValidAvatar(object: Partial<Avatar>): object is Avatar {
        return (
            typeof object === 'object' &&
            typeof object.id === 'number' &&
            typeof object.url === 'string'
        );
    }

    isValidDate(value: unknown): value is Date {
        return (
            value instanceof Date ||
            (typeof value === 'string' && !isNaN(Date.parse(value)))
        );
    }

    isValidAccount(object: Partial<Account>): object is Account {
        return (
            typeof object === 'object' &&
            typeof object.id === 'number' &&
            typeof object.user === 'string' &&
            typeof object.name === 'string' &&
            (typeof object.avatar === 'undefined' ||
                this.isValidAvatar(object.avatar)) &&
            typeof object.balance === 'number' &&
            typeof object.allowance === 'number' &&
            (typeof object.firstPayday === 'undefined' ||
                this.isValidDate(object.firstPayday)) &&
            (typeof object.nextPayday === 'undefined' ||
                this.isValidDate(object.nextPayday))
        );
    }
}
