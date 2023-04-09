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
    exist(): void;
    install(): void;
    update(): void;
    getRootFilePath(): void;
}
