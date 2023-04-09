export declare function getNpmInfo(pkgName: string, registry?: string): Promise<any> | null;
export declare function getNpmVersions(pkgName: string, registry?: string): Promise<string[]>;
export declare function getSemverVersions(baseVersion: string, versions: string[]): string[];
export declare function getNpmSemverVersion(baseVersion: string, pkgName: string, registry?: string): Promise<string>;
export declare function getDefaultRegistry(isOriginal?: boolean): "https://registry.npmjs.org" | "https://registry.npm.taobao.org";
export declare function getNpmLatestVersion(pkgName: string, registry?: string): Promise<string | null>;
