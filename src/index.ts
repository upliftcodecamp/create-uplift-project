#!/usr/bin/env node

import inquirer from 'inquirer';
import questions from './questions';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createContents from './createContents';
import process from 'node:process';
import minimist from 'minimist';

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '');
}

async function init() {
  const argv = minimist<{
    t?: string;
    template?: string;
  }>(process.argv.slice(2), { string: ['_'] });

  const directory = formatTargetDir(argv._[0]);
  const template = argv.template || argv.t;

  const { projectChoice, projectName } = await inquirer.prompt(questions, {
    projectName: directory,
    projectChoice: `template-${template}`,
  });

  const templatePath = path.resolve(
    fileURLToPath(import.meta.url),
    '../..',
    `${projectChoice}`
  );

  const projectPath = await createContents(templatePath, projectName);

  console.log('Done 👍. Now run:');
  console.log(`     cd ${projectPath}`);
  console.log('     npm install');
  console.log('     npm run dev');
  console.log('     Happy Coding 🚀');
}

try {
  init();
} catch (e: any) {
  console.error(e);
}
