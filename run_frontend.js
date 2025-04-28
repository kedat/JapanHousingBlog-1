// Script to run only the frontend Vite dev server
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, 'client');

// Run Vite directly for frontend development
const viteProcess = spawn('npx', ['vite', '--config', path.join(clientDir, 'vite.config.ts'), '--host', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true,
  cwd: clientDir,
  env: {
    ...process.env,
    NODE_ENV: 'development',
  }
});

viteProcess.on('error', (error) => {
  console.error('Failed to start Vite process:', error);
});

console.log('Frontend development server started - client-only mode');