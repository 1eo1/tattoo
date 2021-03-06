#!/usr/bin/env node
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {CliOptions, getCommandLineOptions, getCliHelp, getVersion, loadConfigFileOptions, mergeConfigFileOptions, loadGitHubToken} from '../cli';
import {Runner, RunnerOptions} from '../runner';

export async function main(argv: string[]): Promise<number> {
  console.time('tattoo');
  try {
    const cliOptions: CliOptions = getCommandLineOptions(argv);
    if (cliOptions.version) {
      console.log(getVersion());
      return 0;
    }
    if (cliOptions.help) {
      console.log(getCliHelp());
      return 0;
    }
    mergeConfigFileOptions(cliOptions, loadConfigFileOptions(cliOptions));
    loadGitHubToken(cliOptions);
    if (!cliOptions['github-token']) {
      console.error(`
You need to create a github token and place it in a file named 'github-token'.
The token only needs the 'public repos' permission.

Generate a token here:   https://github.com/settings/tokens
`);
      return 1;
    }
    const runnerOptions: RunnerOptions = {
      color: cliOptions['color'],
      excludes: cliOptions['exclude'],
      githubToken: cliOptions['github-token'],
      fresh: cliOptions['fresh'],
      requires: cliOptions['require'],
      skipTests: cliOptions['skip-test'],
      tests: cliOptions['test'],
      verbose: cliOptions['verbose'],
      wctFlags: cliOptions['wct-flags'],
      workspaceDir: cliOptions['workspace-dir']
    };
    if (!runnerOptions.wctFlags) {
      runnerOptions.wctFlags = ['--local chrome'];
    }
    // Color means wct color too.
    if (runnerOptions.color === 'on' &&
        runnerOptions.wctFlags.join(' ').indexOf('--color') === -1) {
      runnerOptions.wctFlags.push('--color');
    }
    const runner: Runner = new Runner(runnerOptions);
    await runner.run();
  } catch (err) {
    // Report the error and crash.
    console.error(err && err.stack || err);
    return 1;
  }
  console.timeEnd('tattoo');
}

if (!module.parent) {
  main(process.argv.slice(2)).then((exitCode) => process.exit(exitCode));
}
