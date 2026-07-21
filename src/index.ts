import { relative, dirname, normalize as pathNormalize, resolve } from "path";
import * as tsTypes from "typescript";
import { PluginImpl, InputOptions, TransformResult, SourceMap, Plugin } from "rollup";
import { normalizePath as normalize } from "@rollup/pluginutils";
import { blue, red, yellow, green } from "colors/safe";
import { satisfies } from "semver";
import findCacheDir from "find-cache-dir";

import { RollupContext, VerbosityLevel } from "./context";
import { LanguageServiceHost } from "./host";
import { TsCache, convertEmitOutput, getAllReferences, ICode } from "./tscache";
import { tsModule, setTypescriptModule } from "./tsproxy";
import { IOptions } from "./ioptions";
import { parseTsConfig } from "./parse-tsconfig";
import { convertDiagnostic, printDiagnostics } from "./diagnostics";
import { TSLIB, TSLIB_VIRTUAL, tslibSource, tslibVersion } from "./tslib";
import { createFilter } from "./get-options-overrides";

// these use globals during testing and are substituted by rollup-plugin-re during builds
const TS_VERSION_RANGE = (global as any)?.rpt2__TS_VERSION_RANGE || "$TS_VERSION_RANGE";
const ROLLUP_VERSION_RANGE = (global as any)?.rpt2__ROLLUP_VERSION_RANGE || "$ROLLUP_VERSION_RANGE";
const RPT2_VERSION = (global as any)?.rpt2__ROLLUP_VERSION_RANGE || "$RPT2_VERSION";

type RPT2Options = Partial<IOptions>;

export { RPT2Options }

const typescript: PluginImpl<RPT2Options> = (options) =>
{
    throw new Error("STUB");
};

export default typescript;
