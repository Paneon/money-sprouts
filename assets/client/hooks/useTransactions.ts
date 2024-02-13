import { Transaction } from '@/client/interfaces/Transaction';
import useApi from '@/client/hooks/useApi';

const useTransactions = (id: string | number) => {
    const query = `account.id=${id}&order[effectiveOn]=desc`;

    return useApi<Transaction[]>('transactions', query);
};

export default useTransactions;
