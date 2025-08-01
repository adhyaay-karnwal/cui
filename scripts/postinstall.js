#!/usr/bin/env node

const { chmodSync } = require('fs');
const { join } = require('path');

// List of files that need executable permissions
const executableFiles = [
  'dist/mcp-server/index.js',
  // Add more files here as needed
];

console.log('Setting executable permissions...');

executableFiles.forEach(file => {
  const filePath = join(__dirname, '..', file);
  try {
    chmodSync(filePath, '755');
    console.log(`✓ Made ${file} executable`);
  } catch (error) {
    console.error(`✗ Failed to make ${file} executable:`, error.message);
  }
});

console.log('Postinstall complete.');