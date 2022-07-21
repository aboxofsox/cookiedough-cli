import { useCreate } from './create';
import { CookieProcessRecipe, ENV_INLINE_ARGS } from '@cookiedough/types';
import {
	log,
	useDefaultConfig,
	useGlobalConfigWithCWD,
} from '@cookiedough/internal';
export { Inquirer, prompt } from 'inquirer';
import { ListQuestion } from 'inquirer';
import { useManPage } from '@cookiedough/internal';
import { CookieCMD } from '@cookiedough/types';

/**
 * Core Preset Flavor Options
 * todo: add more than node
 */
export const FlavorInquiry: ListQuestion = {
	type: 'list',
	name: 'flavor',
	message: 'choose project flavor',
	choices: ['node'],
};

/**
 * Full List of Commands to interpret at runtime
 * todo: commented sections
 */
export const CMDList: CookieCMD<any>[] = [
	{
		signature: 'create',
		alias: ['', null],
		callback: useCreate,
	},
	{
		signature: 'help',
		alias: ['manpage', 'man'],
		callback: async () => useManPage(),
	},
];

/**
 *
 * @returns recipe for the called process context
 */
export async function useCMDRecipe(): Promise<CookieProcessRecipe> {
	const inline = process.argv.slice(2);
	const args = ENV_INLINE_ARGS.filter(
		(arg) => inline.includes(arg.long) || inline.includes(arg.short)
	);
	if (
		args.filter((arg) => arg.type === 'string').length > 0 &&
		inline.length <= args.length
	) {
		log(
			'error: args do not match up inline values passed to cookiedough',
			'error'
		);
		log(`${inline[inline.length - 1]} does not have a value`);
		process.exit(1);
	}

	const default_config = await useDefaultConfig();
	if (inline.length === 0 || args.length > inline.length) {
		return {
			__args: null,
			cmd: {
				signature: 'create',
				callback: useCreate,
			},
			crumbs: default_config,
		};
	}
	const try_signature = inline[0];
	const cmd = CMDList.filter(
		(cmd) => cmd.signature === try_signature
	).shift();
	const crumbs = await useGlobalConfigWithCWD();

	if (!cmd) {
		const create_cmd = CMDList.filter((cmd) => cmd.signature === 'create');
		return {
			__args: args,
			cmd: create_cmd[0],
			crumbs,
		};
	}

	return {
		__args: args,
		cmd,
		crumbs,
	};
}
