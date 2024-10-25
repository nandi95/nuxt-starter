import Uppy from '@uppy/core';
import AwsS3Multipart from '@uppy/aws-s3';
import type { Meta } from '@uppy/core';
import GoldenRetriever from '@uppy/golden-retriever';

export interface FileMeta extends Meta {
    width?: number;
    height?: number;
    size?: number;
    title?: string;
    previewLoading: boolean;
}

// import('@uppy/golden-retriever/lib/ServiceWorker');
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useUppy() {
    const auth = useAuthStore();
    const config = useRuntimeConfig();

    return new Uppy<FileMeta>({
        id: 'lashbrill',
        debug: import.meta.dev,
        onBeforeUpload: files => {
            const updatedFiles: typeof files = structuredClone(files);

            Object.keys(updatedFiles).forEach((fileID) => {
                updatedFiles[fileID].meta.previewLoading = false;
                // updatedFiles[fileID].progress.uploadStarted = true;
            });

            return updatedFiles;
        }
    })
        // .use(GoldenRetriever, { serviceWorker: false })
        // goldenRetriever seems to make the file.data null...
        .use(AwsS3Multipart, {
            endpoint: config.public.apiBase,
            retryDelays: [0, 1000, 3000, 5000, 65000],
            shouldUseMultipart: true,
            headers: {
                ...
                auth.loggedIn
                    ? { 'Authorization': 'Bearer ' + auth.token! }
                    : {}
            }
        });
};
