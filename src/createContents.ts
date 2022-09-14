import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import process from 'node:process';
import path from 'node:path';

const CURR_DIR = process.cwd();

const copy = async (src: string, dest: string) => {
  const stat = await fs.stat(src);

  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    await fs.copyFile(src, dest);
  }
};

const copyDir = async (srcDir: string, destDir: string) => {
  await fs.mkdir(destDir, { recursive: true });
  const files = await fs.readdir(srcDir);

  for (const file of files) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
};

const write = async (
  file: string,
  templatePath: string,
  newProjectPath: string,
  content?: string
) => {
  const targetPath = path.join(
    CURR_DIR,
    newProjectPath,
    renameFiles[file] ?? file
  );

  if (content) {
    await fs.writeFile(targetPath, content);
  } else {
    await copy(path.join(templatePath, file), targetPath);
  }
};

const renameFiles: Record<string, string> = {
  _gitignore: '.gitignore',
  _eslintignore: '.eslintignorerc',
  _eslintrc: '.eslintrc',
  _stylelintrc: '.stylelintrc',
};

const createDirectory = async (newProjectPath: string) => {
  const targetPath = path.join(CURR_DIR, newProjectPath);
  if (!existsSync(targetPath)) {
    await fs.mkdir(targetPath, { recursive: true });
  }
};

const createContents = async (templatePath: string, newProjectPath: string) => {
  console.log('Creating directory ...');

  await createDirectory(newProjectPath);

  const filesToCreate = await fs.readdir(templatePath);

  // const filesToCreate = fs.readdirSync(templatePath);

  const filteredFiles = filesToCreate.filter(
    (file: string) => file !== 'package.json'
  );

  for (const file of filteredFiles) {
    write(file, templatePath, newProjectPath);
  }

  const pkg = JSON.parse(
    await fs.readFile(path.join(templatePath, 'package.json'), 'utf-8')
  );

  pkg.name = newProjectPath;

  write(
    'package.json',
    templatePath,
    newProjectPath,
    JSON.stringify(pkg, null, 2)
  );

  // filesToCreate.forEach(async (file) => {
  //   const origFilePath = `${templatePath}/${file}`;

  // get stats about the current file
  // const stats = await fs.stat(origFilePath);

  // console.log(file, typeof file);

  // if (stats.isFile()) {
  //   const contents = await fs.readFile(origFilePath, 'utf8');

  //   const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
  //   await fs.writeFile(writePath, contents, 'utf8');
  // }
  // });
};

export default createContents;
