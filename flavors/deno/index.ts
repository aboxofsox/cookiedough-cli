import DenoMenuOptions from './menu';
import inquirer from 'inquirer';
import { CrumbOptions } from '@cookiedough/include/types';
export function usePrompt(
	p: CrumbOptions
) {
	inquirer.prompt(DenoMenuOptions).then(answers => {
		console.log(`deno project at ${p}`);
		console.log(answers);
	});
}
