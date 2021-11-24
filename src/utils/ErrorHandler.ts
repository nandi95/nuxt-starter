import type { ApiResponse } from '@upfrontjs/framework';

export default class ErrorHandler {
    /**
     * The response the error was thrown with.
     */
    private response: Partial<Response> & ApiResponse | undefined;

    public constructor(response: ApiResponse | Error | any) {
        if (response instanceof Error) {
            return;
        }

        this.response = response;
    }

    /**
     * Get the parsed response body.
     */
    private async getBody<T>(): Promise<T | null> {
        try {
            return this.response?.json ? await this.response.json() : null;
        } catch (e: unknown) {
            return null;
        }
    }

    /**
     * Check whether this is due to user not being logged in.
     */
    public isUnauthenticatedError(): boolean {
        return this.response?.status === 401 || this.response?.status === 419;
    }

    /**
     * Get the main message.
     */
    public async getErrorMessage(): Promise<string | undefined> {
        const body = await this.getBody<Record<string, any>>();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return body?.message;
    }

    /**
     * Get the errors or specific error messages.
     */
    public async getErrors(): Promise<Record<string, string[]> | undefined>
    public async getErrors(field: string): Promise<string[] | undefined>
    public async getErrors(field?: string): Promise<Record<string, string[]> | string[] | undefined> {
        const body = await this.getBody<Record<string, any>>();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (!body?.errors) {
            return undefined;
        }

        if (field) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return body.errors[field];
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return body.errors;
    }
}
