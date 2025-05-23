import { ConfettiService } from '@/app/services/confetti.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Account } from '@/app/types/account';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { AccountService } from '@/app/services/account.service';
import { DatePipe, CommonModule } from '@angular/common';
import { Loggable } from '@/app/services/loggable';
import { balanceImageMap } from '@/app/components/balance-image-map';
import { PageHeaderComponent } from '@/app/components/page-header/page-header.component';
import { TranslationKey } from '@/app/enum/TranslationKey';

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
    imports: [CommonModule, TranslatePipe, PageHeaderComponent],
    providers: [ConfettiService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceOverviewComponent extends Loggable implements OnInit {
    protected currentAccount: Account | null = null;
    account$: Observable<Account | null>;
    nextPayday$: Observable<Date | null>;
    combinedDataOverview$: Observable<CombinedDataOverview>;
    showConfettiText = false;
    showTreasureButton = false;
    readonly ConfettiText: TranslationKey = 'OVERVIEW.CONFETTI_TEXT';

    private readonly PAYDAY_WEEKDAY_UNKNOWN: TranslationKey = 'OVERVIEW.PAYDAY_WEEKDAY_UNKNOWN';
    private readonly PAYDAY_COUNTER_UNKNOWN: TranslationKey = 'OVERVIEW.PAYDAY_COUNTER_UNKNOWN';

    constructor(
        private readonly accountService: AccountService,
        private readonly translate: TranslateService,
        private readonly cd: ChangeDetectorRef,
        private readonly confettiService: ConfettiService,
    ) {
        super();
        this.account$ = this.accountService.currentAccount$;
    }

    ngOnInit() {
        this.account$
            .pipe(
                debounceTime(300),
                distinctUntilChanged((prev, current) => {
                    return prev && current ? prev.id === current.id : prev === current;
                }),
                tap((account) => {
                    this.currentAccount = account;
                    this.cd.markForCheck();
                }),
            )
            .subscribe((account) => {
                if (account) {
                    this.accountService.refreshAccount(account.id);
                    this.handleConfetti(account);
                }
            });

        this.nextPayday$ = this.account$.pipe(map((account) => account?.nextPayday ?? null));

        this.combinedDataOverview$ = combineLatest([this.account$, this.nextPayday$]).pipe(
            map(([account, nextPayday]) => {
                return {
                    account,
                    nextPayday,
                    formatedNextPayday: nextPayday
                        ? this.getFormatedNextPayday(nextPayday)
                        : this.PAYDAY_WEEKDAY_UNKNOWN,
                    daysUntilNextPayday: nextPayday
                        ? this.getDaysUntilNextPayday(nextPayday)
                        : this.PAYDAY_COUNTER_UNKNOWN,
                };
            }),
        );
    }

    get funnyImage(): string {
        if (!this.currentAccount || typeof this.currentAccount.balance === 'undefined') {
            return balanceImageMap[balanceImageMap.length - 1].imagePath;
        }

        if (this.currentAccount.balance === 0) {
            return balanceImageMap.find((item) => item.threshold === 0)?.imagePath || '';
        }

        const imagePath = balanceImageMap.find((item) => this.currentAccount!.balance <= item.threshold)?.imagePath;
        return imagePath || balanceImageMap[balanceImageMap.length - 1].imagePath;
    }

    getFormatedNextPayday(nextPayday: Date): string {
        if (!nextPayday) {
            return this.PAYDAY_WEEKDAY_UNKNOWN;
        }
        const currentLanguage = this.translate.currentLang;
        const datePipe = new DatePipe(currentLanguage);

        const formattedDate = datePipe.transform(nextPayday, 'dd. MMMM yyyy', undefined, currentLanguage);
        const dayName = datePipe.transform(nextPayday, 'EEEE', undefined, currentLanguage);
        return `${dayName} (${formattedDate})`;
    }

    getDaysUntilNextPayday(nextPayday: Date): string {
        if (!nextPayday) {
            return this.PAYDAY_COUNTER_UNKNOWN;
        }
        try {
            const dayDifference = this.calculateDaysUntilNextPayday(nextPayday);
            return `${dayDifference}`;
        } catch (error) {
            this.log('Error calculating days until next payday:', error);
            return this.PAYDAY_COUNTER_UNKNOWN;
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

    private handleConfetti(account: Account): void {
        const check = this.confettiService.shouldTriggerConfetti(account);
        if (check.shouldTrigger) {
            this.showConfettiText = true;
            this.confettiService.triggerConfettiForAccount(account, check);
            setTimeout(() => {
                this.showConfettiText = false;
            }, 4000);
            this.showTreasureButton = true;
        }
    }

    hideConfettiElements(): void {
        this.showConfettiText = false;
        this.showTreasureButton = false;
    }
}
