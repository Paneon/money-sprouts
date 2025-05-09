import { TestBed } from '@angular/core/testing';
import { ConfettiService } from './confetti.service';
import { Account } from '../types/account';
import { balanceImageMap } from '../components/balance-image-map';

describe('ConfettiService', () => {
    let service: ConfettiService;
    const mockAccount: Account = {
        id: 1,
        balance: 1000,
        name: 'Test Account',
        nextPayday: new Date(),
        user: 'test-user',
        allowance: 100,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConfettiService);
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should not trigger confetti for null account', () => {
        expect(service.shouldTriggerConfetti(null)).toBeFalsy();
    });

    it('should not trigger confetti for account with undefined balance', () => {
        const accountWithUndefinedBalance = { ...mockAccount, balance: undefined as unknown as number };
        expect(service.shouldTriggerConfetti(accountWithUndefinedBalance)).toBeFalsy();
    });

    it('should trigger confetti for first threshold', () => {
        const firstThreshold = balanceImageMap.find((item) => item.threshold !== Infinity)?.threshold;
        const account = { ...mockAccount, balance: firstThreshold || 0 };

        expect(service.shouldTriggerConfetti(account)).toBeTruthy();
    });

    it('should not trigger confetti for same threshold twice', () => {
        const firstThreshold = balanceImageMap.find((item) => item.threshold !== Infinity)?.threshold;
        const account = { ...mockAccount, balance: firstThreshold || 0 };

        // First trigger
        service.triggerConfettiForAccount(account);

        // Second check
        expect(service.shouldTriggerConfetti(account)).toBeFalsy();
    });

    it('should trigger confetti for higher threshold', () => {
        const thresholds = balanceImageMap
            .filter((item) => item.threshold !== Infinity)
            .sort((a, b) => a.threshold - b.threshold);

        const lowerThreshold = thresholds[0].threshold;
        const higherThreshold = thresholds[1].threshold;

        const account = { ...mockAccount, balance: higherThreshold };

        // Set lower threshold as triggered
        localStorage.setItem(`confettiFor${account.id}`, lowerThreshold.toString());

        expect(service.shouldTriggerConfetti(account)).toBeTruthy();
    });

    it('should not trigger confetti for lower threshold', () => {
        const thresholds = balanceImageMap
            .filter((item) => item.threshold !== Infinity)
            .sort((a, b) => a.threshold - b.threshold);

        const lowerThreshold = thresholds[0].threshold;
        const higherThreshold = thresholds[1].threshold;

        const account = { ...mockAccount, balance: lowerThreshold };

        // Set higher threshold as triggered
        localStorage.setItem(`confettiFor${account.id}`, higherThreshold.toString());

        expect(service.shouldTriggerConfetti(account)).toBeFalsy();
    });

    it('should store last triggered threshold in localStorage', () => {
        const firstThreshold = balanceImageMap.find((item) => item.threshold !== Infinity)?.threshold;
        const account = { ...mockAccount, balance: firstThreshold || 0 };

        service.triggerConfettiForAccount(account);

        const storedValue = localStorage.getItem(`confettiFor${account.id}`);
        expect(storedValue).toBe(firstThreshold?.toString());
    });

    it('should handle multiple accounts independently', () => {
        const firstThreshold = balanceImageMap.find((item) => item.threshold !== Infinity)?.threshold;
        const account1 = { ...mockAccount, id: 1, balance: firstThreshold || 0 };
        const account2 = { ...mockAccount, id: 2, balance: firstThreshold || 0 };

        // Trigger for first account
        service.triggerConfettiForAccount(account1);

        // Should still trigger for second account
        expect(service.shouldTriggerConfetti(account2)).toBeTruthy();
    });
});
