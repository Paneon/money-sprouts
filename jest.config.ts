import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/assets/client/$1',
    },
    transform: {
        '^.+\\.(ts|js|html|svg)$': 'jest-preset-angular',
    },
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text-summary'],
    verbose: true,
    testFailureExitCode: 1,
};

export default config;
