import { ConfettiService } from '@/app/services/confetti.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Account } from '@/app/types/account';
import {
    combineLatest,
    debounceTime,
    distinctUntilChanged,
    map,
    Observable,
    tap,
} from 'rxjs';
import { AccountService } from '@/app/services/account.service';
import { DatePipe, CommonModule } from '@angular/common';
import { Loggable } from '@/app/services/loggable';
import { balanceImageMap } from '@/app/components/balance-image-map';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from '@/app/components/page-header/page-header.component';

interface CombinedDataOverview {
    account: Account | null;
    nextPayday: Date | null;
    formatedNextPayday: string;
    daysUntilNextPayday: string;
}

@Component({
    selector: 'money-sprouts-balance-overview',
    templateUrl: './balance-overview.component.html',
    styleUrls: ['./balance-overview.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslateModule, PageHeaderComponent],
    providers: [ConfettiService],
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
        this.account$ = this.accountService.currentAccount$;
    }

    ngOnInit() {
        console.log(this.translate.currentLang);

        this.account$
            .pipe(
                debounceTime(300),
                distinctUntilChanged((prev, current) => {
                    return prev && current
                        ? prev.id === current.id
                        : prev === current;
                })
            )
            .subscribe((account) => {
                if (account) {
                    this.accountService.refreshAccount(account.id);
                    this.triggerConfettiIfNeeded(account);
                }
            });

        this.nextPayday$ = this.account$.pipe(
            map((account) => account?.nextPayday ?? null)
        );

        this.combinedDataOverview$ = combineLatest([
            this.account$,
            this.nextPayday$,
        ]).pipe(
            map(([account, nextPayday]) => {
                return {
                    account,
                    nextPayday,
                    formatedNextPayday: nextPayday
                        ? this.getFormatedNextPayday(nextPayday)
                        : 'OVERVIEW.PAYDAY_WEEKDAY_UNKNOWN',
                    daysUntilNextPayday: nextPayday
                        ? this.getDaysUntilNextPayday(nextPayday)
                        : 'OVERVIEW.PAYDAY_COUNTER_UNKNOWN',
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
            return 'OVERVIEW.PAYDAY_WEEKDAY_UNKNOWN';
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
        try {
            const dayDifference = this.calculateDaysUntilNextPayday(nextPayday);
            return `${dayDifference}`;
        } catch (error) {
            this.log('Error calculating days until next payday:', error);
            return 'OVERVIEW.PAYDAY_COUNTER_UNKOWN';
        }
    }

    private calculateDaysUntilNextPayday(nextPayday: Date): number {
        if (!nextPayday) {
            throw new Error('No next payday date provided');
        }

        const now = new Date();
        const nextPaydayDate = new Date(nextPayday);

        // Reset time part to compare only dates
        now.setHours(0, 0, 0, 0);
        nextPaydayDate.setHours(0, 0, 0, 0);

        const diffMilliseconds = nextPaydayDate.getTime() - now.getTime();
        return Math.round(diffMilliseconds / (24 * 60 * 60 * 1000));
    }

    private triggerConfettiIfNeeded(account: Account | null): void {
        if (!account || account.balance === undefined) return;
        const balance = account.balance;

        balanceImageMap.forEach((item) => {
            if (item.threshold === Infinity) return;

            const confettiTriggeredKey = `confettiTriggeredFor${item.threshold}`;

            if (balance >= item.threshold) {
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
