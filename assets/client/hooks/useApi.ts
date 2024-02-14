import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import { ENTRYPOINT } from '@/client/config/config';

interface UseApiOptions {
    method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
    body?: any;
    query?: any;
    hydrated?: boolean;
}

const useApi = <TResource>(
    resource: string,
    initialOptions: UseApiOptions = {}
) => {
    const [data, setData] = useState<TResource | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(
        async (options: UseApiOptions = {}) => {
            setIsLoading(true);
            setError(null);

            const {
                method = initialOptions.method || 'GET',
                body = initialOptions.body,
                query = initialOptions.query,
                hydrated = initialOptions.hydrated || false,
            } = options;

            try {
                let endpointPath = `${ENTRYPOINT}${resource}`;
                if (!hydrated) {
                    endpointPath += '.json';
                }

                if (query) {
                    const params = new URLSearchParams(query);
                    endpointPath += '?' + params.toString();
                }

                const requestConfig: AxiosRequestConfig = {
                    headers: {
                        'Content-Type': hydrated
                            ? 'application/ld+json'
                            : 'application/json',
                    },
                };

                let response;
                if (method === 'GET') {
                    response = await axios.get(endpointPath, requestConfig);
                } else if (method === 'PUT') {
                    response = await axios.put(
                        endpointPath,
                        body,
                        requestConfig
                    );
                } else if (method === 'POST') {
                    response = await axios.post(
                        endpointPath,
                        body,
                        requestConfig
                    );
                } else if (method === 'DELETE') {
                    response = await axios.delete(endpointPath, requestConfig);
                }

                if (response?.data) {
                    setData(response.data);
                }
            } catch (err) {
                if (err instanceof AxiosError) {
                    setError(err.message);
                } else {
                    setError('An error occurred.');
                }
            } finally {
                setIsLoading(false);
            }

            return data;
        },
        [resource, initialOptions]
    );

    return { data, isLoading, error, fetchData };
};

export default useApi;
