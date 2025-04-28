// Simple script to run the Vite development server directly
// without needing the Express server

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Starting client-only development server...');

// Run Vite directly through the CLI
const viteProcess = spawn(
  'npx', 
  ['vite', '--port', '5000', '--host', '0.0.0.0'], 
  {
    cwd: path.join(__dirname, 'client'),
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  }
);

viteProcess.on('error', (err) => {
  console.error('Failed to start Vite:', err);
  process.exit(1);
});

viteProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Vite process exited with code ${code}`);
    process.exit(code);
  }
});