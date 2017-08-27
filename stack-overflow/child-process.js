console.log('ChildProcess PID: ' + process.pid);

process.once('exit', () => console.log('ChildProcess: Exited'));
process.once('close', () => console.log('ChildProcess: Closed'));
process.once('SIGTERM', () => console.log('ChildProcess: Received SIGTERM signal'));
process.once('SIGINT', () => console.log('ChildProcess: Received SIGINT signal'));

setTimeout(() => console.log(1), 20000);
