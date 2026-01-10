import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

const VersionInfoSchema = z.object({
  commit: z.string(),
  branch: z.string(),
  tag: z.string(),
});

type VersionInfo = z.infer<typeof VersionInfoSchema>;

let versionInfo: VersionInfo | null;

try {
  const versionPath = path.join(__dirname, 'version.json');
  const content = fs.readFileSync(versionPath, 'utf8');
  const parsed: unknown = JSON.parse(content);
  versionInfo = VersionInfoSchema.parse(parsed);
} catch (e) {
  console.error(e);
  versionInfo = { commit: 'unknown', branch: 'unknown', tag: 'unknown' };
}

export const VERSION = versionInfo;
