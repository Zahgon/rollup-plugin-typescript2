import * as path from "path";
import * as tsTypes from "typescript";
import { createFilter as createRollupFilter, normalizePath as normalize } from "@rollup/pluginutils";

import { tsModule } from "./tsproxy";
import { IOptions } from "./ioptions";
import { RollupContext } from "./context";

export function getOptionsOverrides({ useTsconfigDeclarationDir, cacheRoot }: IOptions, preParsedTsconfig?: tsTypes.ParsedCommandLine): tsTypes.CompilerOptions
{
	const overrides: tsTypes.CompilerOptions = {
		noEmitHelpers: false,
		importHelpers: true,
		noResolve: false,
		noEmit: false,
		noEmitOnError: false,
		inlineSourceMap: false,
		outDir: normalize(`${cacheRoot}/placeholder`), // need an outdir that is different from source or tsconfig parsing trips up. https://github.com/Microsoft/TypeScript/issues/24715
		allowNonTsExtensions: true,
	};

	if (!preParsedTsconfig)
		return overrides;

	if (preParsedTsconfig.options.moduleResolution === tsModule.ModuleResolutionKind.Classic)
		overrides.moduleResolution = tsModule.ModuleResolutionKind.Node10;
	if (preParsedTsconfig.options.module === undefined)
		overrides.module = tsModule.ModuleKind.ES2015;

	// only set declarationDir if useTsconfigDeclarationDir is enabled
	if (!useTsconfigDeclarationDir)
		overrides.declarationDir = undefined;

	// unsetting sourceRoot if sourceMap is not enabled (in case original tsconfig had inlineSourceMap set that is being unset and would cause TS5051)
	const sourceMap = preParsedTsconfig.options.sourceMap;
	if (!sourceMap)
		overrides.sourceRoot = undefined;

	return overrides;
}

function expandIncludeWithDirs(include: string | string[], dirs: string[])
{
	const newDirs: string[] = [];

	dirs.forEach(root => {
        throw new Error("STUB");
    });
	return newDirs;
}

export function createFilter(context: RollupContext, pluginOptions: IOptions, parsedConfig: tsTypes.ParsedCommandLine)
{
	let included = pluginOptions.include;
	let excluded = pluginOptions.exclude;

	if (parsedConfig.options.rootDirs)
	{
		included = expandIncludeWithDirs(included, parsedConfig.options.rootDirs);
		excluded = expandIncludeWithDirs(excluded, parsedConfig.options.rootDirs);
	}

	if (parsedConfig.projectReferences)
	{
		included = expandIncludeWithDirs(included, parsedConfig.projectReferences.map((x) => { throw new Error("STUB"); })).concat(included);
		excluded = expandIncludeWithDirs(excluded, parsedConfig.projectReferences.map((x) => { throw new Error("STUB"); })).concat(excluded);
	}

	context.debug(() => { throw new Error("STUB"); });
	context.debug(() => { throw new Error("STUB"); });
	return createRollupFilter(included, excluded, { resolve: parsedConfig.options.rootDir });
}
