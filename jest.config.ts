import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    verbose: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/assets/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};

export default config;
