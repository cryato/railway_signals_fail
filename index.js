console.log('=== Process Info ===');
console.log('PID:', process.pid);
console.log('PPID:', process.ppid);
console.log('Platform:', process.platform);
console.log('Node version:', process.version);

// Register critical process handlers as early as possible
try {
  process.on('uncaughtException', (err) => {
    try { console.error('uncaughtException', err && err.stack ? err.stack : err); } catch (_) {}
  });
  process.on('unhandledRejection', (reason) => {
    try { console.error('unhandledRejection', reason && reason.stack ? reason.stack : reason); } catch (_) {}
  });
  
  // Register signal handlers with logging to confirm registration
  console.log('Registering signal handlers...');
  process.once('SIGTERM', () => { 
    console.log('SIGTERM signal received');
  });
  process.once('SIGINT', () => { 
    console.log('SIGINT signal received');
  });
  process.once('SIGQUIT', () => { 
    console.log('SIGQUIT signal received');
  });
  process.once('SIGHUP', () => { 
    console.log('SIGHUP signal received');
  });
  console.log('Signal handlers registered successfully');
} catch (err) {
  console.error('Failed to register signal handlers:', err);
}

// Liveness heartbeat: log a message every minute with initial launch UTC time
const launchUtcIso = new Date().toISOString();
console.log('Launch time (UTC): ' + launchUtcIso);
setInterval(() => {
  try {
    console.log(`Still alive. Initial launch (UTC): ${launchUtcIso}`);
  } catch (_) {}
}, 60 * 1000);