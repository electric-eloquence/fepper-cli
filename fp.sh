#!/bin/bash

# Recursively search up the directory tree.
function upsearch () {
  test / == "$PWD" && return || test -e "$1" && echo -n "$PWD" && return || cd .. && upsearch "$1"
}

# Upwardly search for the fepper.command file.
fepper_dir=`upsearch fepper.command`

# Determine if kill_zombies is set in conf.yml.
if [ -f ${fepper_dir}/conf.yml ]; then
  kill_zombies=`cat ${fepper_dir}/conf.yml | grep 'kill_zombies:[[:space:]]*true'`
else
  kill_zombies=
fi

# Only kill zombies on default task.
if [ "$1" == "" ] || [ "$1" == "default" ]; then
  if [ "$kill_zombies" != "" ]; then
    if pgrep -x gulp > /dev/null; then
      echo Killing lingering gulp process...
      killall gulp
    fi
    if pgrep -x node > /dev/null; then
      echo Killing lingering node process...
      killall node
    fi
  fi
fi

# Run index.js with arguments.
node ${fepper_dir}/index.js $@
