/**
 * Make the type either the initial value or a promise of it.
 */
export type MaybePromise<T> = Promise<T> | T;
