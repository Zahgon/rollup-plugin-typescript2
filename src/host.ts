import * as tsTypes from "typescript";
import { normalizePath as normalize } from "@rollup/pluginutils";

import { tsModule } from "./tsproxy";
import { TransformerFactoryCreator } from "./ioptions";

export class LanguageServiceHost implements tsTypes.LanguageServiceHost
{
	private snapshots: { [fileName: string]: tsTypes.IScriptSnapshot } = {};
	private versions: { [fileName: string]: number } = {};
	private service?: tsTypes.LanguageService;
	private fileNames: Set<string>;

	constructor(private parsedConfig: tsTypes.ParsedCommandLine, private transformers: TransformerFactoryCreator[], private cwd: string)
	{
		this.fileNames = new Set(parsedConfig.fileNames);
	}

	public reset()
	{
        throw new Error("STUB");
    }

	public setLanguageService(service: tsTypes.LanguageService)
	{
		this.service = service;
	}

	public setSnapshot(fileName: string, source: string): tsTypes.IScriptSnapshot
	{
		fileName = normalize(fileName);

		const snapshot = tsModule.ScriptSnapshot.fromString(source);
		this.snapshots[fileName] = snapshot;
		this.versions[fileName] = (this.versions[fileName] || 0) + 1;
		this.fileNames.add(fileName);
		return snapshot;
	}

	public getScriptSnapshot(fileName: string): tsTypes.IScriptSnapshot | undefined
	{
		fileName = normalize(fileName);

		if (fileName in this.snapshots)
			return this.snapshots[fileName];

		const source = tsModule.sys.readFile(fileName);
		if (source)
			return this.setSnapshot(fileName, source);

		return undefined;
	}

	public getScriptFileNames = () => { throw new Error("STUB"); };

	public getScriptVersion(fileName: string)
	{
        throw new Error("STUB");
    }

	public getCustomTransformers(): tsTypes.CustomTransformers | undefined
	{
        throw new Error("STUB");
    }

	public getCompilationSettings = () => { throw new Error("STUB"); };
	public getTypeRootsVersion = () => { throw new Error("STUB"); };
	public getCurrentDirectory = () => { throw new Error("STUB"); };

	public useCaseSensitiveFileNames = () => { throw new Error("STUB"); };
	public getDefaultLibFileName = tsModule.getDefaultLibFilePath; // confusing naming: https://github.com/microsoft/TypeScript/issues/35318

	public readDirectory = tsModule.sys.readDirectory;
	public readFile = tsModule.sys.readFile;
	public fileExists = tsModule.sys.fileExists;
	public directoryExists = tsModule.sys.directoryExists;
	public getDirectories = tsModule.sys.getDirectories;
	public realpath = tsModule.sys.realpath!; // this exists in the default implementation: https://github.com/microsoft/TypeScript/blob/ab2523bbe0352d4486f67b73473d2143ad64d03d/src/compiler/sys.ts#L1288

	public trace = console.log;
}
