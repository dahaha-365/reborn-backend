import { cwd, exit } from 'node:process';
import { resolve, basename } from 'path';
import glob from 'glob';

const globP = (pattern, options) => {
  return new Promise((resolve, reject) => {
    glob(pattern, options, (err, matches) => {
      if (err) reject(err);
      else resolve(matches);
    });
  });
};

async function createTarGz(fileList, outputPath) {
  const tar = await import('tar');
  return new Promise((resolve, reject) => {
    tar.c(
      {
        gzip: true,
        file: outputPath,
        cwd: cwd(),
        portable: true,
      },
      fileList,
      (err) => {
        if (err) reject(err);
        else resolve();
      },
    );
  });
}

async function packageDeploy() {
  const output = resolve(cwd(), 'deploy.tar.gz');

  // 需要打包的文件和目录
  const patterns = [
    'dist',
    'package.json',
    'pnpm-lock.yaml',
    'ecosystem.config.js',
    '.env.production',
  ];

  let fileList = [];
  for (const pattern of patterns) {
    const matches = await globP(pattern, {
      dot: true,
      nodir: false,
    });
    fileList.push(...matches);
  }

  fileList = [...new Set(fileList)].sort();
  console.log(fileList);

  if (fileList.length === 0) {
    throw new Error('未匹配到任何文件！');
  }

  console.log('📦 打包以下文件:');
  fileList.forEach((f) => console.log(`- ${f}`));

  await createTarGz(fileList, output);

  console.log(`✅ 部署包已生成: ${basename(output)}`);
}

packageDeploy().catch((err) => {
  console.error('❌ 打包失败:', err);
  exit(1);
});
