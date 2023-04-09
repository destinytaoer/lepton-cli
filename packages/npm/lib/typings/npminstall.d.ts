export interface IOptions {
    root: string;
    storeDir: string;
    registry?: string;
    pkgs: {
        name: string;
        version: string;
    }[];
}
export declare function npmInstall(options: IOptions): any;
