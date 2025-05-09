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
        const check = service.shouldTriggerConfetti(null);
        expect(check.shouldTrigger).toBeFalsy();
        expect(check.crossedThreshold).toBeNull();
    });

    it('should not trigger confetti for account with undefined balance', () => {
        const accountWithUndefinedBalance = { ...mockAccount, balance: undefined as unknown as number };
        const check = service.shouldTriggerConfetti(accountWithUndefinedBalance);
        expect(check.shouldTrigger).toBeFalsy();
        expect(check.crossedThreshold).toBeNull();
    });

    it('should trigger confetti for first threshold', () => {
        const firstThreshold = balanceImageMap.find((item) => item.threshold !== Infinity)?.threshold;
        const account = { ...mockAccount, balance: firstThreshold || 0 };

        const check = service.shouldTriggerConfetti(account);
        expect(check.shouldTrigger).toBeTruthy();
        expect(check.crossedThreshold?.threshold).toBe(firstThreshold);
    });

    it('should not trigger confetti for same threshold twice', () => {
        const firstThreshold = balanceImageMap.find((item) => item.threshold !== Infinity)?.threshold;
        const account = { ...mockAccount, balance: firstThreshold || 0 };

        // First trigger
        const firstCheck = service.shouldTriggerConfetti(account);
        service.triggerConfettiForAccount(account, firstCheck);

        // Second check
        const secondCheck = service.shouldTriggerConfetti(account);
        expect(secondCheck.shouldTrigger).toBeFalsy();
        expect(secondCheck.crossedThreshold?.threshold).toBe(firstThreshold);
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

        const check = service.shouldTriggerConfetti(account);
        expect(check.shouldTrigger).toBeTruthy();
        expect(check.crossedThreshold?.threshold).toBe(higherThreshold);
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

        const check = service.shouldTriggerConfetti(account);
        expect(check.shouldTrigger).toBeFalsy();
        expect(check.crossedThreshold?.threshold).toBe(lowerThreshold);
    });

    it('should store last triggered threshold in localStorage', () => {
        const firstThreshold = balanceImageMap.find((item) => item.threshold !== Infinity)?.threshold;
        const account = { ...mockAccount, balance: firstThreshold || 0 };

        const check = service.shouldTriggerConfetti(account);
        service.triggerConfettiForAccount(account, check);

        const storedValue = localStorage.getItem(`confettiFor${account.id}`);
        expect(storedValue).toBe(firstThreshold?.toString());
    });

    it('should handle multiple accounts independently', () => {
        const firstThreshold = balanceImageMap.find((item) => item.threshold !== Infinity)?.threshold;
        const account1 = { ...mockAccount, id: 1, balance: firstThreshold || 0 };
        const account2 = { ...mockAccount, id: 2, balance: firstThreshold || 0 };

        // Trigger for first account
        const check1 = service.shouldTriggerConfetti(account1);
        service.triggerConfettiForAccount(account1, check1);

        // Should still trigger for second account
        const check2 = service.shouldTriggerConfetti(account2);
        expect(check2.shouldTrigger).toBeTruthy();
        expect(check2.crossedThreshold?.threshold).toBe(firstThreshold);
    });

    it('should reuse threshold check when provided', () => {
        const firstThreshold = balanceImageMap.find((item) => item.threshold !== Infinity)?.threshold;
        const account = { ...mockAccount, balance: firstThreshold || 0 };

        const check = service.shouldTriggerConfetti(account);
        expect(check.shouldTrigger).toBeTruthy();

        // Spy on shouldTriggerConfetti to ensure it's not called again
        const spy = jest.spyOn(service, 'shouldTriggerConfetti');
        service.triggerConfettiForAccount(account, check);

        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });
});
