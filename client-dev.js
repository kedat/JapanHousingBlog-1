// Simple script to run the Vite development server directly
// without needing the Express server

import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startClientDev() {
  console.log('Starting client-only development server...');
  
  const vite = await createServer({
    configFile: path.resolve(__dirname, 'client/vite.config.ts'),
    root: path.resolve(__dirname, 'client'),
  });
  
  await vite.listen();
  
  vite.printUrls();
  console.log('Client-only development server started!');
}

startClientDev().catch(err => {
  console.error('Error starting development server:', err);
  process.exit(1);
});