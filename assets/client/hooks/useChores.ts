import { useState } from 'react';
import { Chore, chores } from '@/client/config/chores';

const useChores = () => {
    /**
     * TODO Move chores to the backend.
     */
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<Chore[]>([]);
    // const { isLoading, error, fetchData, data } =
    //     useApi<Transaction[]>('chores');

    const getChores = async () => {
        setIsLoading(true);
        try {
            await Promise.resolve().then(() => {
                setData(chores);
            });
        } catch (e) {
            setError('Failed to load chores.');
        } finally {
            setIsLoading(false);
        }
    };

    return { getChores, data, isLoading, error };
};

export default useChores;
