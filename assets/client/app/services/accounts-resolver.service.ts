import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from '@/app/types/account';
import { AccountService } from './account.service';

export const accountsResolver: ResolveFn<Observable<Account[]>> = () => {
    const accountService = inject(AccountService);
    return accountService.getAccounts();
};
