import * as tsTypes from "typescript";
import { red, white, yellow } from "colors/safe";

import { tsModule } from "./tsproxy";
import { RollupContext } from "./context";
import { formatHost } from "./diagnostics-format-host";

export interface IDiagnostics
{
	flatMessage: string;
	formatted: string;
	fileLine?: string;
	category: tsTypes.DiagnosticCategory;
	code: number;
	type: string;
}

export function convertDiagnostic(type: string, data: tsTypes.Diagnostic[]): IDiagnostics[]
{
	return data.map((diagnostic) =>
	{
        throw new Error("STUB");
    });
}

export function printDiagnostics(context: RollupContext, diagnostics: IDiagnostics[], pretty = true): void
{
	diagnostics.forEach((diagnostic) =>
	{
        throw new Error("STUB");
    });
}
