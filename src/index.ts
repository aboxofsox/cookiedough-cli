#!/usr/bin/node
import inquirer from 'inquirer';
import followup from './internal/followup';
import { TemplateName } from './types';
const TemplateNames: TemplateName[] = [
	'node',
	'deno',
	'go',
	'c',
	'c++',
	'rust',
	'python'
];

const path_arg = process.argv[2] ?? '.';

inquirer.prompt([
	{
		type: 'list',
		name: 'template',
		message: 'choose project template',
		choices: TemplateNames
	}
])
.then((options: { template: TemplateName }) => {
	const { template } = options;
	return followup(template, path_arg);
});

// const config = parse_config(options);
// log(config);
