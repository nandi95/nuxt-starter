import type { ApiResponse } from '@upfrontjs/framework';

export async function parseError(reason: ApiResponse | Error | any): Promise<ErrorHandler> {
    const handler = new ErrorHandler(reason);
    await handler.parseBody();

    return handler;
}

export default class ErrorHandler<T = any> {
    /**
     * The response the error was thrown with.
     */
    private response: Partial<Response> & ApiResponse | undefined;

    private body: T | null = null;

    public constructor(response: ApiResponse | Error | any) {
        if (response instanceof Error) {
            return;
        }

        this.response = response;
    }

    /**
     * Get the parsed response body.
     */
    public async parseBody(): Promise<T | null> {
        try {
            this.body = this.response?.json ? await this.response.json() : null;
        } catch (e: unknown) {
            this.body = null;
        }

        return this.body;
    }

    /**
     * Check whether this is due to user not being logged in.
     */
    public authenticationError(): boolean {
        return this.response?.status === 401 || this.response?.status === 419;
    }

    /**
     * Get the main message.
     */
    public getErrorMessage(): string | undefined {
        return (this.body as Record<string, any> | null)?.message;
    }

    /**
     * Get the errors or specific error messages.
     */
    public getErrors(): Record<string, string[]> | undefined;
    public getErrors(field: string): string[] | undefined;
    public getErrors(field?: string): Record<string, string[]> | string[] | undefined {
        const body = this.body as Record<string, any> | null;

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
