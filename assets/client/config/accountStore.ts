import { create } from 'zustand';

interface AccountStoreState {
    balance: number | null;
    setBalance: (v: number) => void;
}

export const useAccountStore = create<AccountStoreState>((set) => ({
    balance: null,
    setBalance: (value: number) =>
        set((state) => ({
            ...state,
            balance: value,
        })),
}));
