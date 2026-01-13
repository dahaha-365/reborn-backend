import { cwd, exit } from 'node:process';
import { resolve, basename } from 'node:path';
import { glob } from 'glob';
import { c as tarCreate } from 'tar';

interface PackageOptions {
  output?: string;
  patterns?: string[];
}

async function packageDeploy(options: PackageOptions = {}): Promise<void> {
  const output = options.output ?? resolve(cwd(), 'deploy.tar.gz');

  // 需要打包的文件和目录
  const patterns = options.patterns ?? [
    'dist',
    'package.json',
    'pnpm-lock.yaml',
    'ecosystem.config.js',
    '.env',
    '.env.production',
  ];

  try {
    // 收集所有匹配的文件
    let fileList: string[] = [];
    for (const pattern of patterns) {
      const matches = await glob(pattern, {
        dot: true,
        nodir: false,
        ignore: ['node_modules/**', '*.tar.gz'],
      });
      fileList.push(...matches);
    }

    // 去重并排序
    fileList = [...new Set(fileList)].sort();

    if (fileList.length === 0) {
      throw new Error('未匹配到任何文件！请检查文件是否存在。');
    }

    console.log('📦 打包以下文件:');
    fileList.forEach((f) => console.log(`   - ${f}`));
    console.log('');

    // 创建 tar.gz 压缩包
    await tarCreate(
      {
        gzip: true,
        file: output,
        cwd: cwd(),
        portable: true,
      },
      fileList,
    );

    console.log(`✅ 部署包已生成: ${basename(output)}`);
    console.log(`📍 路径: ${output}`);
  } catch (err) {
    const error = err as Error;
    console.error('❌ 打包失败:', error.message);
    throw error;
  }
}

// 执行打包
packageDeploy().catch(() => {
  exit(1);
});
