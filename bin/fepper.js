#!/usr/bin/env node

/**
 * fepper-cli
 *
 * Based off of grunt-cli, http://gruntjs.com/
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-init/blob/master/LICENSE-MIT
 */

'use strict';

process.title = 'fepper';

// External lib.
var findup = require('findup-sync');

// Internal libs.
var options = require('../lib/cli').options;
var completion = require('../lib/completion');
var info = require('../lib/info');
var path = require('path');
var cp = require('child_process');

var basedir = process.cwd();
var fepperpath;

// Do stuff based on CLI options.
if ('completion' in options) {
  completion.print(options.completion);
} else if (options.version) {
  info.version();
} else if (options.base && !options.fepperfile) {
  basedir = path.resolve(options.base);
} else if (options.fepperfile) {
  basedir = path.resolve(path.dirname(options.fepperfile));
}

fepperpath = findup('fepper.command');
// No fepper install found!
if (!fepperpath) {
  if (options.version) { process.exit(); }
  if (options.help) { info.help(); }
  info.fatal('Unable to find local Fepper.', 99);
}

var args = process.argv;
var rootdir = path.dirname(fepperpath);

// Create args array by truncating 1st two elements from process.argv.
args.splice(0,2);
// Change process.cwd to rootdir.
process.chdir(rootdir);
// Everything looks good. Fork Fepper child process and run it.
cp.fork(rootdir, args);
