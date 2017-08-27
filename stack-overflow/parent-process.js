const { fork } = require('child_process');

let childProcess = fork(__dirname + '/child-process');

console.log('ParentProcess PID: ' + process.pid);

childProcess.once('exit', () => console.log('ParentProcess: ChildProcess Exited'));
childProcess.once('close', () => console.log('ParentProcess: ChildProcess process Closed'));
childProcess.once('SIGTERM', () => console.log('ParentProcess: ChildProcess received SIGTERM signal'));
childProcess.once('SIGINT', () => console.log('ParentProcess: ChildProcess received SIGINT signal'));

setTimeout(() => childProcess.kill('SIGINT'), 10000);
