import { RouteKey, routes } from '@/client/config/router';

export function pathToRoute(
    key: RouteKey,
    params: Record<string, string | undefined> | null = null
): string {
    // Find the route object by key
    const route = routes.find((route) => route.id === key);
    if (!route) {
        throw new Error(`No route found for key: ${key}`);
    }

    // Start with the route's path template
    let path = route.path;

    if (params) {
        // Replace each param in the path with its value from the params argument
        Object.entries(params).forEach(([paramKey, paramValue]) => {
            if (!paramValue) {
                return;
            }

            path = path!.replace(`:${paramKey}`, paramValue);
        });
    }

    return path ?? '';
}
