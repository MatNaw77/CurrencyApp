import { dataSource } from './data-source';

export const sharedDataSource = dataSource;

export async function getFromCache(
    key: string,
    ttlMs: number,
): Promise<any | null> {
    const cached = await sharedDataSource.queryResultCache?.getFromCache({
        identifier: key,
        query: '',
        time: Date.now(),
        duration: ttlMs,
    });

    if (cached?.identifier) {
        const expired = Date.now() - cached.time > ttlMs;
        if (!expired) {
            return JSON.parse(cached.result);
        }

        await sharedDataSource.queryResultCache?.remove([key]);
    }

    return null;
}

export async function saveToCache(
    key: string,
    data: any,
    ttlMs: number,
): Promise<void> {
    await removeFromCache(key);
    await sharedDataSource.queryResultCache?.storeInCache(
        {
            identifier: key,
            query: '',
            time: Date.now(),
            duration: ttlMs,
            result: JSON.stringify(data),
        },
        undefined,
    );
}

export async function removeFromCache(key: string): Promise<void> {
    await sharedDataSource.queryResultCache?.remove([key]);
}
