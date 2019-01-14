const path = require('path');
const engine = require('jasmine');
import { SpecReporter } from 'jasmine-spec-reporter';
declare var __dirname: string;
const runner = new engine();
runner.env.clearReporters();
runner.env.addReporter(
  new SpecReporter({
    suite: {
      displayNumber: false
    },
    spec: {
      displayStacktrace: false,
      displaySuccessful: true,
      displayFailed: true,
      displayPending: false,
      displayDuration: false
    },
    summary: {
      displaySuccessful: false,
      displayFailed: false,
      displayPending: false
    },
    colors: {
      successful: 'green',
      failed: 'red',
      pending: 'yellow'
    },
    prefixes: {
      successful: '✓ ',
      failed: '✗ ',
      pending: '* '
    },
    customProcessors: []
  })
);
runner.loadConfigFile(path.resolve(__dirname, 'jasmine.' + (process.env.TARGET || 'unit') + '.json'));
runner.execute();
