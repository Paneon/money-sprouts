import { useEffect, useState } from 'react';

const ENTRYPOINT = '/api/';

const useApi = <TResource>(resource: string) => {
    const [data, setData] = useState<TResource | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(ENTRYPOINT + resource + '.json');
                if (!response.ok) {
                    // noinspection ExceptionCaughtLocallyJS
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setData(data);
            } catch (err) {
                console.error(err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(err as any);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [resource]); // Dependency array ensures the effect runs again if the endpoint changes

    return { data, isLoading, error };
};

export default useApi;
