#!/usr/bin/env node

import inquirer from 'inquirer';
import questions from './questions';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createContents from './createContents';
import process from 'node:process';

async function init() {
  const [, , directory] = process.argv;

  const { projectChoice, projectName } = await inquirer.prompt(questions, {
    projectName: directory,
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
}

try {
  init();
} catch (e: any) {
  console.error(e);
}
