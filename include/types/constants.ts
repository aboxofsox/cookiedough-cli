import {
	CookieFlavor,
	InquirerPrompt
} from '@cookiedough/include/types';
import cliSpinners from 'cli-spinners';

export const Flavors: CookieFlavor[] = [
	'node',
	'deno',
	//'go',
	//'c',
	//'c++',s
	//'rust',
	//'python'
];

export const templateInquiry: InquirerPrompt = {
	type: 'list',
	name: 'flavor',
	message: 'choose project flavor',
	choices: Flavors
};

export { CookieFlavor } from '@cookiedough/include/types';
