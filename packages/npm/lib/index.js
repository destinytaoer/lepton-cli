import axios from 'axios';
import semver from 'semver';
import urlJoin from 'url-join';

function getNpmInfo(pkgName, registry) {
    if (!pkgName)
        return null;
    registry = registry || getDefaultRegistry();
    const npmInfoUrl = urlJoin(registry, pkgName);
    return axios.get(npmInfoUrl).then(res => {
        if (res.status === 200) {
            return res.data;
        }
        return null;
    }).catch((e) => Promise.reject(e));
}
async function getNpmVersions(pkgName, registry) {
    const data = await getNpmInfo(pkgName, registry);
    if (!data)
        return [];
    return Object.keys(data.versions);
}
function getSemverVersions(baseVersion, versions) {
    return versions
        .filter((version) => semver.satisfies(version, `>${baseVersion}`))
        .sort((a, b) => semver.gt(b, a) ? 1 : -1);
}
async function getNpmSemverVersion(baseVersion, pkgName, registry) {
    const versions = await getNpmVersions(pkgName, registry);
    const newVersions = getSemverVersions(baseVersion, versions);
    const latestVersion = newVersions[0];
    return latestVersion;
}
function getDefaultRegistry(isOriginal = false) {
    return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org';
}

export { getDefaultRegistry, getNpmInfo, getNpmSemverVersion, getNpmVersions, getSemverVersions };
