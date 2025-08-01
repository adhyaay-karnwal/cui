#!/usr/bin/env node
import { CUIServer } from './cui-server';
import { createLogger } from './services/logger';
import { parseArgs } from './cli-parser';

const logger = createLogger('Server');

async function main() {
  const cliConfig = parseArgs(process.argv);
  const server = new CUIServer(cliConfig);
  
  try {
    await server.start();
    
    // Handle graceful shutdown
    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}, shutting down...`);
      await server.stop();
      process.exit(0);
    };
    
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});