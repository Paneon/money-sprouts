import { ConfettiService } from './../../services/confetti.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Account } from '../../types/account';
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
import { balanceImageMap } from '../../../shared/balance-image-map';

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
    showConfettiText = false;
    showTreasureButton = false;

    constructor(
        private readonly accountService: AccountService,
        private readonly datePipe: DatePipe,
        private readonly translate: TranslateService,
        private readonly cd: ChangeDetectorRef,
        private readonly confettiService: ConfettiService
    ) {
        super();
        this.currentLang = this.translate.currentLang;
    }

    ngOnInit() {
        console.log(this.translate.currentLang);

        this.account$ = this.accountService.currentAccount$.pipe(
            debounceTime(300),
            distinctUntilChanged((prev, current) => {
                return prev && current
                    ? prev.id === current.id
                    : prev === current;
            })
        );

        this.account$.subscribe((account) => {
            this.accountService.refreshAccount(account.id);
            this.triggerConfettiIfNeeded(account);
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
        if (typeof balance === 'undefined') {
            return balanceImageMap[balanceImageMap.length - 1].imagePath;
        }

        if (balance === 0) {
            return (
                balanceImageMap.find((item) => item.threshold === 0)
                    ?.imagePath || ''
            );
        }

        const imagePath = balanceImageMap.find(
            (item) => balance <= item.threshold
        )?.imagePath;
        return (
            imagePath || balanceImageMap[balanceImageMap.length - 1].imagePath
        );
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

    private triggerConfettiIfNeeded(account: Account | null): void {
        if (!account) return;

        balanceImageMap.forEach((item) => {
            if (item.threshold === Infinity) return;

            const confettiTriggeredKey = `confettiTriggeredFor${item.threshold}`;

            if (account.balance >= item.threshold) {
                const hasConfettiBeenTriggered =
                    localStorage.getItem(confettiTriggeredKey);

                if (!hasConfettiBeenTriggered) {
                    this.resetOtherConfettiTriggerKeys(confettiTriggeredKey);

                    this.showConfettiText = true;
                    this.confettiService.startConfetti();
                    localStorage.setItem(confettiTriggeredKey, 'true');
                    setTimeout(() => {
                        this.showConfettiText = false;
                    }, 4000);
                    this.showTreasureButton = true;
                }
            }
        });
    }

    private resetOtherConfettiTriggerKeys(exceptKey: string): void {
        balanceImageMap.forEach((item) => {
            const key = `confettiTriggeredFor${item.threshold}`;
            if (key !== exceptKey && item.threshold !== Infinity) {
                localStorage.removeItem(key);
            }
        });
    }

    get ConfettiText(): string {
        return 'OVERVIEW.CONFETTI_TEXT';
    }
}
