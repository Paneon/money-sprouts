import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';
import { Account } from '../types/account';
import { balanceImageMap } from '../components/balance-image-map';
import { Loggable } from './loggable';

interface ThresholdCheck {
    shouldTrigger: boolean;
    crossedThreshold: { threshold: number } | null;
}

@Injectable({
    providedIn: 'root',
})
export class ConfettiService extends Loggable {
    private readonly confettiStorageKeyPrefix = 'confettiFor';

    startConfetti() {
        confetti({
            particleCount: 500,
            spread: 300,
            startVelocity: 60,
            scalar: 1.5,
            ticks: 8000,
            origin: { y: 0.5 },
        });
    }

    shouldTriggerConfetti(account: Account | null): ThresholdCheck {
        if (!account || account.balance === undefined) {
            return { shouldTrigger: false, crossedThreshold: null };
        }

        const balance = account.balance;
        const lastTriggeredThreshold = this.getLastTriggeredThreshold(account.id);
        const crossedThreshold = this.findHighestCrossedThreshold(balance);

        if (!crossedThreshold) {
            return { shouldTrigger: false, crossedThreshold: null };
        }

        const shouldTrigger = lastTriggeredThreshold === null || crossedThreshold.threshold > lastTriggeredThreshold;
        return { shouldTrigger, crossedThreshold };
    }

    triggerConfettiForAccount(account: Account | null, check?: ThresholdCheck): void {
        if (!account || account.balance === undefined) return;

        const thresholdCheck = check ?? this.shouldTriggerConfetti(account);
        if (!thresholdCheck.shouldTrigger || !thresholdCheck.crossedThreshold) return;

        this.startConfetti();
        this.saveLastTriggeredThreshold(account.id, thresholdCheck.crossedThreshold.threshold);
    }

    private findHighestCrossedThreshold(balance: number) {
        return balanceImageMap
            .filter((item) => item.threshold !== Infinity)
            .sort((a, b) => b.threshold - a.threshold)
            .find((item) => balance >= item.threshold);
    }

    private getLastTriggeredThreshold(accountId: number): number | null {
        const key = this.getStorageKey(accountId);
        const value = localStorage.getItem(key);
        return value ? parseInt(value, 10) : null;
    }

    private saveLastTriggeredThreshold(accountId: number, threshold: number): void {
        const key = this.getStorageKey(accountId);
        localStorage.setItem(key, threshold.toString());
    }

    private getStorageKey(accountId: number): string {
        return `${this.confettiStorageKeyPrefix}${accountId}`;
    }
}
