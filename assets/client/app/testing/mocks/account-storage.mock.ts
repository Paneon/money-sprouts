import { Account } from '../../types/account';

export const createMockLocalStorage = (account?: Account) => {
    const mockAccount = account || {
        id: 1,
        user: 'test',
        name: 'Test Account',
        balance: 100,
        allowance: 50,
        firstPayday: new Date().toISOString(),
        nextPayday: new Date().toISOString(),
    };

    return {
        getItem: (key: string): string | null => {
            if (key === 'selectedAccount') {
                return JSON.stringify(mockAccount);
            }
            return null;
        },
        setItem: (): void => undefined,
        removeItem: (): void => undefined,
        clear: (): void => undefined,
        length: 0,
        key: (): string | null => null,
    };
};

export const setupMockLocalStorage = (account?: Account) => {
    Object.defineProperty(window, 'localStorage', {
        value: createMockLocalStorage(account),
        writable: true,
    });
};
