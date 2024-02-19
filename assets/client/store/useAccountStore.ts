import { create } from 'zustand';
import { Account } from '../interfaces/Account';
import { ErrorMessage } from '../interfaces/Message';
import { buildEndpointPath, buildRequestHeaders } from '../services/ApiService';
import { resourceUrlForAccount } from '../utils/resource.factory';
import axios, { AxiosError, CancelTokenSource } from 'axios';
import { createErrorMessage } from '@/client/utils/MessageFactory';

interface AccountStoreState {
    isLoading: boolean;
    account: Account | null;
    error: ErrorMessage | null;

    setAccount: (a: Account) => void;
    fetchData: (id: string) => Promise<void>;
    lastFetch: number | null;
    cancelTokenSource: CancelTokenSource | undefined;
}

const CACHE_DURATION_MS = 60 * 1000;

export const useAccountStore = create<AccountStoreState>((set, get) => ({
    balance: null,
    isLoading: false,
    account: null,
    error: null,
    lastFetch: null,
    cancelTokenSource: undefined,

    fetchData: async (id: string) => {
        const now = Date.now();
        const currentState = get();

        // Cancel previous request
        if (currentState.cancelTokenSource) {
            currentState.cancelTokenSource.cancel('New request initiated.');
        }

        // Cancel current request if cache duration has not passed yet
        if (
            currentState.lastFetch &&
            now - currentState.lastFetch < CACHE_DURATION_MS
        ) {
            return;
        }

        const endpointPath = buildEndpointPath(resourceUrlForAccount(id));
        const cancelTokenSource = axios.CancelToken.source();
        set({ isLoading: true, error: null, cancelTokenSource });

        axios
            .get<Account>(endpointPath, {
                cancelToken: cancelTokenSource.token,
                headers: buildRequestHeaders(),
            })
            .then((response) => {
                set({
                    account: response.data,
                    lastFetch: Date.now(),
                });
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    const errorMessage =
                        error instanceof Error || error instanceof AxiosError
                            ? error.message
                            : 'An error occured while fetching the account.';
                    set({
                        error: createErrorMessage(errorMessage),
                    });
                }
            })
            .finally(() => {
                set({
                    isLoading: false,
                    cancelTokenSource: undefined,
                });
            });
    },
    setAccount: (value: Account) =>
        set({
            account: value,
        }),
}));
