import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { buildEndpointPath, buildRequestHeaders } from '../services/ApiService';
import { ENTRYPOINT } from '../config/config';

interface UseApiOptions {
    method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
    body?: object;
    query?: string;
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

            options = {
                method: 'GET',
                hydrated: false,
                ...initialOptions,
                ...options,
            };

            try {
                const endpointPath =
                    ENTRYPOINT + buildEndpointPath(resource, options);

                const response = await axios({
                    url: endpointPath,
                    method: options.method,
                    data: options.body,
                    headers: buildRequestHeaders(),
                });

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
        [data, resource, initialOptions]
    );

    return { data, isLoading, error, fetchData };
};

export default useApi;
