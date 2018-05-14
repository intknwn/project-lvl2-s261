#!/usr/bin/env node

import program from "commander";

program
  .version('0.0.1')
  .arguments('<firstConfig> <firstConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]','Output format')
  .action()

program.parse(process.argv);



