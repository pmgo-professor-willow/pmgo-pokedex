// Node modules.
import { readFileSync } from 'node:fs';
import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { parse as jsonParse } from 'json5';

const moduleNameMapper: Config.InitialOptions['moduleNameMapper'] =
  pathsToModuleNameMapper(
    jsonParse(readFileSync('./tsconfig.json', 'utf-8')).compilerOptions.paths,
    { prefix: '<rootDir>' }
  );

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper,
};

export default config;
