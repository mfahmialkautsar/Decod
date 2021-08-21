const path = require('path');
const webpack = require('webpack');
const spawn = require('child_process').spawn;

const compiler = webpack(require('../webpack.config')());
const watchConfig = {
  aggregateTimeout: 300,
  poll: 1000,
};

let serverControl;

compiler.watch(watchConfig, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    info.errors.forEach((message) => console.log(message));
    return;
  }

  if (stats.hasWarnings()) {
    info.warnings.forEach((message) => console.log(message));
  }

  if (serverControl) {
    serverControl.kill();
  }

  serverControl = spawn('node', [path.resolve(__dirname, '../build')]);

  serverControl.stdout.on('data', (data) => console.log(data.toString()));
  serverControl.stderr.on('data', (data) => console.error(data.toString()));
});
