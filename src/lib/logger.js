import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const LOG_DIR = path.join(os.homedir(), '.zhashrakt', 'logs');
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 jam

export async function initLogDir() {
  await fs.mkdir(LOG_DIR, { recursive: true });
}

export async function saveLog(data) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(LOG_DIR, `log-${timestamp}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function cleanupOldLogs() {
  try {
    const files = await fs.readdir(LOG_DIR);
    const now = Date.now();
    for (const file of files) {
      const filePath = path.join(LOG_DIR, file);
      const stat = await fs.stat(filePath);
      if (now - stat.mtimeMs > MAX_AGE_MS) {
        await fs.unlink(filePath);
      }
    }
  } catch (err) {
  }
}
