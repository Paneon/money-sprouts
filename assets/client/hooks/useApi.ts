import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import { ENTRYPOINT } from '@/client/config/config';

interface UseApiOptions {
    method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
    body?: object;
    query?: string;
    hydrated?: boolean;
}

const buildEndpointPath = (resource: string, options: UseApiOptions) => {
    let endpointPath = `${ENTRYPOINT}${resource}`;
    if (!options.hydrated) {
        endpointPath += '.json';
    }

    if (options.query) {
        const params = new URLSearchParams(options.query);
        endpointPath += '?' + params.toString();
    }

    return endpointPath;
};

const buildRequestConfig = (options: UseApiOptions): AxiosRequestConfig => ({
    headers: {
        'Content-Type': options.hydrated
            ? 'application/ld+json'
            : 'application/json',
    },
});

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
                const endpointPath = buildEndpointPath(resource, options);
                const requestConfig: AxiosRequestConfig =
                    buildRequestConfig(options);

                const response = await axios({
                    url: endpointPath,
                    method: options.method,
                    data: options.body,
                    ...requestConfig,
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
