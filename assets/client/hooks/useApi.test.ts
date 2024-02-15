import useApi from '@/client/hooks/useApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { act, renderHook, waitFor } from '@testing-library/react';
import { ENTRYPOINT } from '@/client/config/config';

describe('useApi hook', () => {
    const axiosMock = new MockAdapter(axios);
    // Before each test, reset mocks to clear any previous configurations
    beforeEach(() => {
        axiosMock.reset();
    });

    it('does not fetches data without using fetchData', async () => {
        const mockData = { key: 'value' };
        axiosMock.onGet(`${ENTRYPOINT}testResource.json`).reply(200, mockData);

        const { result } = renderHook(() => useApi('testResource'));

        await waitFor(() => expect(result.current.isLoading).toBeFalsy());

        expect(result.current.data).toEqual(null);
        expect(result.current.error).toBeNull();
    });

    it('fetches data successfully with GET method after manually triggering fetchData', async () => {
        const mockData = { key: 'value' };
        axiosMock.onGet(`${ENTRYPOINT}testResource.json`).reply(200, mockData);

        const { result } = renderHook(() => useApi('testResource'));

        // Manually trigger fetchData
        act(() => {
            result.current.fetchData();
        });

        // Use waitFor to wait for the data to be set
        await waitFor(() => expect(result.current.data).toEqual(mockData));

        // Additional assertions can follow here if needed
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('handles POST method with body', async () => {
        const postData = { postKey: 'postValue' };
        axiosMock.onPost(`${ENTRYPOINT}testResource.json`).reply(200, postData);

        const { result } = renderHook(() =>
            useApi('testResource', { method: 'POST', body: postData })
        );

        // Trigger the fetchData function with POST options
        act(() => {
            result.current.fetchData({ method: 'POST', body: postData });
        });

        await waitFor(() => expect(result.current.isLoading).toBeFalsy());

        expect(result.current.data).toEqual(postData);
        expect(result.current.error).toBeNull();
    });
});
