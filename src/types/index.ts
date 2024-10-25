export type UserProvider = 'google' | 'facebook';
type Role = 'admin' | 'user';

export interface PersonalAccessTokenAttributes {
    device: string;
    browser: string;
    location: string;
    lastUsedAt: string;
    isCurrent?: boolean;
    hash: string;
}

export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    avatar: string;
    emailVerified: boolean;
    hasPassword: boolean;
    userProviders: UserProvider[];
    roles: Role[];
    unreadNotificationsCount: number;
}

export interface ImageAttributes<Meta extends Record<string, unknown> = Record<never, never>> {
    id?: number;
    width: number;
    height: number;
    title: string;
    source: string;
    /**
     * This is only available when the image loaded as a morph to parent.
     */
    meta?: Meta;
    /**
     * This is only available when the withRelatedCount scoped is used.
     */
    usedTimes?: number;
}

/**
 * The php notification classnames where it's also showing on the frontend.
 */
export type NotificationType =
// admin notifications
'UserBookedCourse'
// user notifications
| 'CourseDateChanged'
| 'Contacted';

export interface NotificationAttributes<T extends Record<string, unknown> = Record<string, unknown>> {
    id: string;
    data: T & { title: string; type: NotificationType };
    readAt: string | null;
    createdAt: string;
}

export interface PaginatedApiResponse<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        current_page: number;
        /**
         * From all the existing records, this is where the current items start from.
         */
        from: number | null;
        /**
         * From all the existing records, this is where the current items go to.
         */
        to: number | null;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        last_page: number;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        per_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        /**
         * Total number of records.
         */
        total: number;
        /**
         * Base path of the request.
         */
        path: string;
    };
}

