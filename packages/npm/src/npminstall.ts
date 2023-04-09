// @ts-ignore
import install from 'npminstall';

export interface IOptions {
  root: string;
  storeDir: string;
  registry?: string;
  pkgs: { name: string, version: string }[];
}

export function npmInstall(options: IOptions) {
  return install(options);
}
