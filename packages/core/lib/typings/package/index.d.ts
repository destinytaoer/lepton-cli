export interface IPackageOptions {
    targetPath: string;
    storePath: string;
    name: string;
    version: string;
}
export declare class Package {
    targetPath: string;
    storePath: string;
    name: string;
    version: string;
    constructor(options: IPackageOptions);
    prepare(): Promise<void>;
    get cacheFilePath(): string;
    exist(): Promise<boolean>;
    install(): Promise<any>;
    update(): void;
    getPackageJson(): any;
    getRootFilePath(): string | null;
    isEsModule(): boolean;
}
