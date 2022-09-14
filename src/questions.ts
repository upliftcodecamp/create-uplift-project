import { QuestionCollection } from 'inquirer';

const questions: QuestionCollection = [
  {
    name: 'projectChoice',
    type: 'list',
    message: 'What project template you like to generate?',
    choices: [
      {
        name: 'React',
        value: 'template-react',
      },
    ],
  },
  {
    name: 'projectName',
    type: 'input',
    message: 'Project name:',
    validate: function (input: string) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) {
        return true;
      }

      return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];

export default questions;
