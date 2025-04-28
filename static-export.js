#!/usr/bin/env node
// This script builds the client and creates a simple server.js file to serve the built assets

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildStaticSite() {
  console.log('Building static site...');
  
  try {
    // Build the client
    execSync('cd client && npx vite build', { stdio: 'inherit' });
    
    // Create a simple server.js file to serve the built assets
    const serverPath = path.join(__dirname, 'dist', 'server.js');
    const serverCode = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// All routes go to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Static server running at http://localhost:\${PORT}\`);
});
`;

    // Make sure the dist directory exists
    if (!fs.existsSync(path.join(__dirname, 'dist'))) {
      fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
    }

    // Write the server file
    fs.writeFileSync(serverPath, serverCode);
    
    console.log('✅ Static site build complete!');
    console.log('✅ Simple server.js file created in dist/server.js');
    console.log('To run the static site:');
    console.log('  node dist/server.js');
  } catch (err) {
    console.error('Error building static site:', err);
    process.exit(1);
  }
}

buildStaticSite();