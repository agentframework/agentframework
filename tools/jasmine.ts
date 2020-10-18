declare function require(name: string): any;
declare const process: any;

// require('reflect-metadata');
const fs = require('fs');
const path = require('path');
const Jasmine = require('jasmine');
const Command = require('jasmine/lib/command');
// const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const engine = new Jasmine({ projectBaseDir: path.resolve() });
const examplesDir = path.join('node_modules', 'jasmine-core', 'lib', 'jasmine-core', 'example', 'node_example');
const command = new Command(path.resolve(), examplesDir, console.log);
const commandOptions = process.argv.slice(2).find((option: any) => option.startsWith('--config='));
const configPath = commandOptions ? commandOptions.slice(9) : process.env.JASMINE_CONFIG_PATH;

if (!configPath) {
  throw new Error('No config file found');
}

const initReporters = (config: any) => {
  // jasmine.env.clearReporters();
  if (config.reporters && config.reporters.length > 0) {
    engine.env.clearReporters();
    config.reporters.forEach((reporter: { name: string; options: any }) => {
      const parts = reporter.name.split('#');
      const name = parts[0];
      const member = parts[1];
      const reporterClass = member ? require(name)[member] : require(name);
      engine.addReporter(new reporterClass(reporter.options));
    });
  } else {
    // jasmine.addReporter(
    //   new SpecReporter({
    //     // add jasmine-spec-reporter
    //     spec: {
    //       displayPending: true
    //     }
    //   })
    // );
  }
};

let configJSON: string = '';
try {
  configJSON = fs.readFileSync(path.resolve(configPath as string), 'utf8');
} catch (e) {
  throw new Error('Invalid config file: ' + configPath);
}

if (configJSON) {
  const config = JSON.parse(configJSON);
  initReporters(config);
}

command.run(engine, [commandOptions]);
