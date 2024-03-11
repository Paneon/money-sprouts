import { RawAxiosRequestHeaders } from 'axios';

export const buildEndpointPath = (
    resource: string,
    options: { hydrated?: boolean; query?: string } = {}
) => {
    let endpointPath = resource;
    if (!options.hydrated) {
        endpointPath += '.json';
    }

    if (options.query) {
        const params = new URLSearchParams(options.query);
        endpointPath += '?' + params.toString();
    }

    return endpointPath;
};

export const buildRequestHeaders = (): RawAxiosRequestHeaders => ({
    'Content-Type': 'application/json',
});
