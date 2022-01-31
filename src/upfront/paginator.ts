import type { Attributes } from '@upfrontjs/framework';
import { ModelCollection } from '@upfrontjs/framework';
import Model from '@/upfront/models/Model';

/* eslint-disable @typescript-eslint/naming-convention */
interface PaginatedApiResponse<T = Attributes> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        /**
         * From all the existing records this is where the current items start from.
         */
        from: number;
        /**
         * From all the existing records this is where the current items go to.
         */
        to: number;
        last_page: number;
        /**
         * String representation of a number.
         */
        per_page: string;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        /**
         * Total number of records.
         */
        total: number;
        path: string;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */

export interface PaginatedModels<T extends Model> {
    data: ModelCollection<T>;
    next: () => Promise<PaginatedModels<T> | undefined>;
    previous: () => Promise<PaginatedModels<T> | undefined>;
    page: (page: number) => Promise<PaginatedModels<T> | undefined>;
    hasNext: boolean;
    hasPrevious: boolean;
    from: PaginatedApiResponse['meta']['from'];
    to: PaginatedApiResponse['meta']['to'];
    total: PaginatedApiResponse['meta']['total'];
}

async function paginatedModels<T extends Model>(
    builder: T | (new() => T),
    page = 1,
    limit = 25
): Promise<PaginatedModels<T>> {
    // eslint-disable-next-line new-cap
    const instance = builder instanceof Model ? builder.clone() : new builder();
    const response = (await instance.limit(limit).page(page).call<PaginatedApiResponse<Attributes<T>>>('GET'))!;
    const modelCollection = new ModelCollection<T>(response.data.map(attributes => {
        return instance
            .new(attributes)
            // @ts-expect-error - Protected internal method required for correct .exists detection
            .setLastSyncedAt();
    }));

    return {
        data: modelCollection,
        next: async () => {
            if (!response.links.next) return;
            return paginatedModels(instance, page + 1, limit);
        },
        previous: async () => {
            if (!response.links.prev) return;
            return paginatedModels(instance, page - 1, limit);
        },
        page: async (pageNumber: number) => {
            if (pageNumber > response.meta.last_page || pageNumber < 0) return;
            return paginatedModels(instance, pageNumber, limit);
        },
        from: response.meta.from,
        to: response.meta.to,
        total: response.meta.total,
        hasNext: !!response.links.next,
        hasPrevious: !!response.links.prev
    };
}

export default paginatedModels;
