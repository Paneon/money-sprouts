import useApi from '@/client/hooks/useApi';
import { useCallback } from 'react';
import { Transaction } from '@/client/interfaces/Transaction';

interface CreateTransactionDTO {
    title: string;
    value: number;
    account: string;
}

const useTransactions = () => {
    const { isLoading, error, fetchData, data } =
        useApi<Transaction[]>('transactions');

    const addTransaction = useCallback(
        async (transactionData: CreateTransactionDTO) => {
            await fetchData({
                method: 'POST',
                body: transactionData,
            });
        },
        [fetchData]
    );

    const getTransactions = useCallback(
        async (id: string | number) => {
            const query = `account.id=${id}&order[effectiveOn]=desc`;
            await fetchData({
                method: 'GET',
                query,
            });
        },
        [fetchData]
    );

    return { addTransaction, getTransactions, data, isLoading, error };
};

export default useTransactions;
