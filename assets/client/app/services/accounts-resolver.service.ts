import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from '@/app/types/account';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class AccountsResolver implements Resolve<Account[]> {
    constructor(private accountService: AccountService) {}

    resolve(): Observable<Account[]> {
        return this.accountService.getAccounts();
    }
}
