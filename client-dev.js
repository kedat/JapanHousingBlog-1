#!/usr/bin/env node
// This script runs a standalone client-only server for development

import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startClientDev() {
  console.log('Starting client-only development server...');
  
  try {
    const vite = await createServer({
      configFile: path.resolve(__dirname, 'client/vite.config.ts'),
      root: path.resolve(__dirname, 'client'),
      server: {
        port: 5001,
        host: '0.0.0.0',
        open: true,
      }
    });
    
    await vite.listen();
    
    vite.printUrls();
    console.log('\n---------------------------------------------');
    console.log('✅ Client-only server started successfully!');
    console.log('🔄 All data is now stored statically in memory');
    console.log('📱 Full responsive design with mobile optimization');
    console.log('🌐 Multi-language support (English, Japanese, Vietnamese)');
    console.log('🔑 Client-side authentication with local storage');
    console.log('🎨 Dark/Light theme switching');
    console.log('---------------------------------------------\n');
  } catch (err) {
    console.error('Error starting client development server:', err);
    process.exit(1);
  }
}

startClientDev();