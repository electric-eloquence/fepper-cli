/**
 * fepper-cli
 *
 * Based off of grunt-cli, http://gruntjs.com/
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-init/blob/master/LICENSE-MIT
 */

'use strict';

// Project metadata.
var pkg = require('../package.json');

// Display fepper-cli version.
exports.version = function() {
  console.log('fepper-cli v' + pkg.version);
};

// Show help, then exit with a message and error code.
exports.fatal = function(msg, code) {
  exports.helpHeader();
  console.log('Fatal error: ' + msg);
  console.log('');
  exports.helpFooter();
  process.exit(code);
};

// Show help and exit.
exports.help = function() {
  exports.helpHeader();
  exports.helpFooter();
  process.exit();
};

// Help header.
exports.helpHeader = function() {
  console.log('fepper-cli: ' + pkg.description + ' (v' + pkg.version + ')');
  console.log('');
};

// Help footer.
exports.helpFooter = function() {
  [
    'If you\'re seeing this message, a Fepper environment was not found for this',
    'working directory. For instructions on installing and configuring Fepper,',
    'please consult the README:',
    '',
    'https://github.com/electric-eloquence/fepper',
  ].forEach(function(str) { console.log(str); });
};
