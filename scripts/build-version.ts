import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

interface GitInfo {
  commit: string;
  branch: string;
  tag: string;
}

function getGitInfo(): GitInfo {
  try {
    const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf8',
    }).trim();
    const tag = execSync('git describe --tags --always', {
      encoding: 'utf8',
    }).trim();
    return { commit, branch, tag };
  } catch (error) {
    console.warn('⚠️ Git 不可用，使用备用版本信息');
    console.error(error);
    return {
      commit: 'unknown',
      branch: 'unknown',
      tag: 'unknown',
    };
  }
}

const versionInfo = getGitInfo();
writeFileSync('src/version.json', JSON.stringify(versionInfo, null, 2));
console.log('✅ version.json 已生成:', versionInfo);
