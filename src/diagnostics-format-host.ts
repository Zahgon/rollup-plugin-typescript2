import * as path from "path";
import * as tsTypes from "typescript";

import { tsModule } from "./tsproxy";

export class FormatHost implements tsTypes.FormatDiagnosticsHost
{
	public getCurrentDirectory(): string
	{
        throw new Error("STUB");
    }

	public getCanonicalFileName = path.normalize;
	public getNewLine = () => { throw new Error("STUB"); };
}

export const formatHost = new FormatHost();
