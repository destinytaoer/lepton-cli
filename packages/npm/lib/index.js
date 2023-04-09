import axios from 'axios';
import semver from 'semver';
import urlJoin from 'url-join';
import install from '/Users/zhuweilong/Documents/projects/lepton-cli/node_modules/npminstall/lib/index.js';

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
async function getNpmLatestVersion(pkgName, registry) {
    let versions = await getNpmVersions(pkgName, registry);
    if (versions) {
        return versions.sort((a, b) => semver.gt(b, a) ? 0 : -1)[0];
    }
    return null;
}

// @ts-ignore
function npmInstall(options) {
    return install(options);
}

export { getDefaultRegistry, getNpmInfo, getNpmLatestVersion, getNpmSemverVersion, getNpmVersions, getSemverVersions, npmInstall };
