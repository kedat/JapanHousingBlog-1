#!/usr/bin/env node
// This script builds the static site and prepares it for deployment

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Building client for static export...');

// First, build the client
try {
  execSync('cd client && npx vite build', { stdio: 'inherit' });
  console.log('Client build completed successfully.');
} catch (error) {
  console.error('Error building client:', error);
  process.exit(1);
}

// Create a simple server.js for static hosting platforms that need a server file
const serverJsContent = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`;

// Write the server.js file
fs.writeFileSync(path.join(__dirname, 'server.js'), serverJsContent);
console.log('Created server.js for static deployments.');

console.log('Static export completed! The site is ready for deployment.');
console.log('To preview the site locally, run: cd client && npx vite preview --host 0.0.0.0 --port 5000');