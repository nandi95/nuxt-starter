import type { AttributeKeys } from '@upfrontjs/framework';
import { Model as BaseModel } from '@upfrontjs/framework';
import { unref } from 'vue';

export default class Model extends BaseModel {
    /**
     * The primary key of the model.
     */
    public id?: string;

    /**
     * The attributes that are mass assignable.
     */
    public get fillable(): string[] {
        return ['*'];
    }

    /**
     * Overwritten set that unwraps vue refs.
     *
     * @param key
     * @param value
     */
    public setAttribute<K extends AttributeKeys<this>, T extends this[K]>(key: K, value: T): this;
    public setAttribute<K extends string, T>(key: K, value: T): this;
    public setAttribute<
        K extends AttributeKeys<this> | string,
        T extends K extends AttributeKeys<this> ? this[K] : unknown = K extends AttributeKeys<this> ? this[K] : unknown
    >(key: K, value: T): this;
    public setAttribute(key: string, value: unknown): this {
        return super.setAttribute(key, unref(value));
    }
}
