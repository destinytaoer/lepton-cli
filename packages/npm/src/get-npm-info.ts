import axios from 'axios';
import semver from 'semver';
import urlJoin from 'url-join';

export function getNpmInfo(pkgName: string, registry?: string) {
  if (!pkgName) return null;

  registry = registry || getDefaultRegistry();

  const npmInfoUrl = urlJoin(registry, pkgName);
  return axios.get(npmInfoUrl).then(res => {
    if (res.status === 200) {
      return res.data;
    }
    return null;
  }).catch((e) => Promise.reject(e));
}

export async function getNpmVersions(pkgName: string, registry?: string) {
  const data = await getNpmInfo(pkgName, registry);

  if (!data) return [];

  return Object.keys(data.versions);
}

export function getSemverVersions(baseVersion: string, versions: string[]) {
  return versions
    .filter((version) => semver.satisfies(version, `>${baseVersion}`))
    .sort((a, b) => semver.gt(b, a) ? 1 : -1);
}

export async function getNpmSemverVersion(baseVersion: string, pkgName: string, registry?: string) {
  const versions = await getNpmVersions(pkgName, registry);
  const newVersions = getSemverVersions(baseVersion, versions);
  const latestVersion = newVersions[0];
  return latestVersion;
}

export function getDefaultRegistry(isOriginal = false) {
  return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org';
}
