import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';
import { Account } from '../types/account';
import { balanceImageMap } from '../components/balance-image-map';
import { Loggable } from './loggable';

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

    shouldTriggerConfetti(account: Account | null): boolean {
        if (!account || account.balance === undefined) return false;
        const balance = account.balance;
        const lastTriggeredThreshold = this.getLastTriggeredThreshold(account.id);

        // Find the highest threshold that the balance has crossed
        const crossedThreshold = balanceImageMap
            .filter((item) => item.threshold !== Infinity)
            .sort((a, b) => b.threshold - a.threshold)
            .find((item) => balance >= item.threshold);

        if (!crossedThreshold) return false;

        const shouldTrigger = lastTriggeredThreshold === null || crossedThreshold.threshold > lastTriggeredThreshold;

        return shouldTrigger;
    }

    triggerConfettiForAccount(account: Account | null): void {
        if (!account || account.balance === undefined) return;
        const balance = account.balance;

        // Find the highest threshold that the balance has crossed
        const crossedThreshold = balanceImageMap
            .filter((item) => item.threshold !== Infinity)
            .sort((a, b) => b.threshold - a.threshold)
            .find((item) => balance >= item.threshold);

        if (!crossedThreshold) return;

        const lastTriggeredThreshold = this.getLastTriggeredThreshold(account.id);

        // Only trigger if this is a new threshold
        if (lastTriggeredThreshold === null || crossedThreshold.threshold > lastTriggeredThreshold) {
            this.startConfetti();
            this.saveLastTriggeredThreshold(account.id, crossedThreshold.threshold);
        }
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
