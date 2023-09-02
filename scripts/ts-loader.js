/**
 * TODO: This is a workaround solution to use 'ts-node/esm' be loader and require 'tsconfig-paths'.
 * refer: https://github.com/TypeStrong/ts-node/discussions/1450#discussioncomment-1806115
 */

import { pathToFileURL } from 'node:url';
import { resolve as resolveTs } from 'ts-node/esm';
import * as tsConfigPaths from 'tsconfig-paths';

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig();
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export function resolve(specifier, ctx, defaultResolve) {
  const match = matchPath(specifier);
  return match
    ? resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve)
    : resolveTs(specifier, ctx, defaultResolve);
}

export { load, transformSource } from 'ts-node/esm';
