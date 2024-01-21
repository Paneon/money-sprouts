import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Account } from '@money-sprouts/shared/domain';
import {
    combineLatest,
    debounceTime,
    distinctUntilChanged,
    map,
    Observable,
} from 'rxjs';
import { AccountService } from '../../services/account.service';
import { DatePipe } from '@angular/common';
import { Loggable } from '../../services/loggable';

interface CombinedDataOverview {
    account: Account | null; // Replace 'any' with your Account type
    nextPayday: Date | null;
    formatedNextPayday: string;
    daysUntilNextPayday: string;
}

@Component({
    selector: 'money-sprouts-balance-overview',
    templateUrl: './balance-overview.component.html',
    styleUrls: ['./balance-overview.component.scss'],
})
export class BalanceOverviewComponent extends Loggable implements OnInit {
    private currentLang: string;
    account$: Observable<Account | null>;
    nextPayday$: Observable<Date | null>;
    combinedDataOverview$: Observable<CombinedDataOverview>;

    constructor(
        private readonly accountService: AccountService,
        private readonly datePipe: DatePipe,
        private readonly translate: TranslateService,
        private readonly cd: ChangeDetectorRef
    ) {
        super();
        this.currentLang = this.translate.currentLang;
    }

    ngOnInit() {
        console.log(this.translate.currentLang);

        this.account$ = this.accountService.currentAccount$.pipe(
            debounceTime(300), // waits 300ms between emisssions
            distinctUntilChanged((prev, current) => {
                return prev && current
                    ? prev.id === current.id
                    : prev === current;
            })
        );

        this.account$.subscribe((account) => {
            this.accountService.refreshAccount(account.id);
        });

        this.nextPayday$ = this.account$.pipe(
            map((account) => {
                this.log('next payday of this account: ', account?.nextPayday);
                return account ? account.nextPayday : null;
            })
        );

        this.combinedDataOverview$ = combineLatest([
            this.account$,
            this.nextPayday$,
        ]).pipe(
            map(([account, nextPayday]) => {
                return {
                    account,
                    nextPayday,
                    formatedNextPayday: this.getFormatedNextPayday(nextPayday),
                    daysUntilNextPayday:
                        this.getDaysUntilNextPayday(nextPayday),
                };
            })
        );
    }

    getFunnyImage(balance: number | undefined): string {
        switch (true) {
            case balance <= 0:
                return './assets/images/3d-empty-box.png';
            case balance < 250:
                return './assets/images/3d-cat-in-box.png';
            case balance < 500:
                return './assets/images/3d-cat-with-books-and-mouse.png';
            case balance < 1000:
                return './assets/images/3d-sitting-dog.png';
            case balance < 1500:
                return './assets/images/3d-dog-with-leash.png';
            case balance < 2000:
                return './assets/images/3d-dog-with-bag.png';
            case balance < 3500:
                return './assets/images/3d-cat-under-umbrella.png';
            case balance < 5000:
                return './assets/images/3d-man-playing-with-dog.png';
            case balance < 7500:
                return './assets/images/girl-hugging-dog.png';
            case balance < 10000:
                return './assets/images/dog-astronaut-floating.png';
            case balance < 15000:
                return './assets/images/3d-casual-life-cat-on-laptop.png';
            case balance < 17500:
                return './assets/images/3d-casual-life-cat-lies-on-open-books.png';
            default:
                return './assets/images/3d-dog-and-boy-jumping.png';
        }
    }

    getFormatedNextPayday(nextPayday: Date): string {
        if (!nextPayday) {
            return 'OVERVIEW.PAYDAY_WEEKDAY_UNKOWN';
        }
        const currentLanguage = this.translate.currentLang;
        const datePipe = new DatePipe(currentLanguage);

        const formattedDate = datePipe.transform(
            nextPayday,
            'dd. MMMM yyyy',
            undefined,
            currentLanguage
        );
        const dayName = datePipe.transform(
            nextPayday,
            'EEEE',
            undefined,
            currentLanguage
        );
        return `${dayName} (${formattedDate})`;
    }

    getDaysUntilNextPayday(nextPayday: Date): string {
        if (!nextPayday) {
            return 'OVERVIEW.PAYDAY_COUNTER_UNKOWN';
        }
        const dayDifference = this.calculateDaysUntilNextPayday(nextPayday);
        return `${dayDifference}`;
    }

    private calculateDaysUntilNextPayday(nextPayday: Date): number {
        if (!nextPayday) {
            this.log('nextPayday is: ', nextPayday);
            return 0;
        }

        const nowString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        const nextPaydayString = this.datePipe.transform(
            nextPayday,
            'yyyy-MM-dd'
        );

        // Convert the strings back to Date objects
        const now = new Date(nowString);
        const nextPaydayDate = new Date(nextPaydayString);

        const diffMilliseconds = nextPaydayDate.getTime() - now.getTime();

        const diffDays = Math.round(diffMilliseconds / (24 * 60 * 60 * 1000));

        return diffDays;
    }
}
