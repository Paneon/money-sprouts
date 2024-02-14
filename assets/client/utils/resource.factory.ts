import { ENTRYPOINT } from '@/client/config/config';

export function resourceUrlForAccount(id: number | string) {
    return `${ENTRYPOINT}accounts/${id}`;
}
