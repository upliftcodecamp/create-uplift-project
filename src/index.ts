#!/usr/bin/env node

import inquirer from 'inquirer';
import questions from './questions';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createContents from './createContents';

async function init() {
  const { projectChoice, projectName } = await inquirer.prompt(questions);

  const templatePath = path.resolve(
    fileURLToPath(import.meta.url),
    '../..',
    `${projectChoice}`
  );

  const contents = await createContents(templatePath, projectName);
}

init();
