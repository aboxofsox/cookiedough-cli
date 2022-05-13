export type NodePackagePreset = 'commonjs' | 'esm' | 'ts';
export type NodeCompilerPreset = 'babel' | 'swc' | 'esbuild';
export type NodeBundlerPreset = 'webpack' | 'esbuild' | 'rollup';
export type NodeBuildPreset = 'esbuild' | 'gulp' | 'grunt' | 'make';
export type NodePkgMgrPreset = 'npm' | 'yarn' | 'pnpm';

export const NodePkgMgrPresets: NodePkgMgrPreset[] = [
	'npm', 'yarn', 'pnpm'
];

export const NodeBuildPresets: NodeBuildPreset[] = [
	'make', 'gulp', 'grunt', 'esbuild'
];

export interface PackageConfig {
	package_preset  : NodePackagePreset; //top level preset for the module generation
	compiler_preset ?: NodeCompilerPreset; // which transpiler to install if any
	bundler_preset  ?: NodeBundlerPreset; // which bundler to install if any
	build_preset    ?: NodeBuildPreset; // which build system to set up if any
	pkgr_preset     : NodePkgMgrPreset; // which process to install packages with
}
