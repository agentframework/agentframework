const path = require('path');
const engine = require('jasmine');
const reporter = require('jasmine-spec-reporter');
declare var __dirname: string;
const runner = new engine();
runner.env.clearReporters();
runner.env.addReporter(new reporter({
  displayStacktrace: 'none',
  displayFailuresSummary: true,
  displayPendingSummary: true,
  displaySuccessesSummary: false,
  displaySuccessfulSpec: true,
  displayFailedSpec: true,
  displayPendingSpec: true,
  displaySpecDuration: false,
  displaySuiteNumber: false,
  colors: {
    success: 'green',
    failure: 'red',
    pending: 'yellow'
  },
  prefixes: {
    success: '✓ ',
    failure: '✗ ',
    pending: '* '
  },
  customProcessors: []
}));
runner.loadConfigFile(path.resolve(__dirname, 'jasmine.unit.json'));
runner.execute();
