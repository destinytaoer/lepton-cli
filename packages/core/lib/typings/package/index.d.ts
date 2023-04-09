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
    exist(): boolean;
    install(): void;
    update(): void;
    getPackageJson(): any;
    getRootFilePath(): string | null;
    isEsModule(): boolean;
}
