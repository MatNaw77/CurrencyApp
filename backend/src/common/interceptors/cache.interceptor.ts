import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Type,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { getFromCache, saveToCache } from '../../utils/cache.utils';

export function CacheInterceptorFactory(
    cacheKey: string,
    ttlMs = 60000,
): Type<NestInterceptor> {
    @Injectable()
    class CacheInterceptor implements NestInterceptor {
        constructor() {}

        async intercept(
            context: ExecutionContext,
            next: CallHandler,
        ): Promise<Observable<any>> {
            const cached = await getFromCache(cacheKey, ttlMs);

            if (cached) {
                return of(cached);
            }

            return next.handle().pipe(
                tap(async (response) => {
                    await saveToCache(cacheKey, response, ttlMs);
                }),
            );
        }
    }

    return CacheInterceptor;
}
