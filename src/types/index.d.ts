// Loader instance interfaces
export interface CustomisableProps {
    determinate: boolean;
    height: number;
    progress: number;
    steps: number;
}
export interface LoaderMethods {
    on: () => void;
    off: () => void;
    setProps: (properties: CustomisableProps) => void;
}
