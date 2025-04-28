// Script to run only the frontend Vite dev server
import { spawn } from 'child_process';
import path from 'path';

// Run Vite directly for frontend development
const viteProcess = spawn('npx', ['vite', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development',
  }
});

viteProcess.on('error', (error) => {
  console.error('Failed to start Vite process:', error);
});

console.log('Frontend development server started');