import 'jest-preset-angular/setup-jest';
import { TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

try {
    TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
    );
} catch (e) {
    // Test environment has already been initialized
}

// Mock global objects
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
        getPropertyValue: () => '',
    }),
});

// Add custom matchers
expect.extend({
    toHaveBeenCalledWith(received: jest.Mock, ...args: any[]) {
        const pass = received.mock.calls.some((call) =>
            args.every((arg, index) => call[index] === arg)
        );
        return {
            pass,
            message: () =>
                `expected ${received.getMockName()} to have been called with ${args.join(
                    ', '
                )}`,
        };
    },
});

// Mock CSS
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
    value: '<!DOCTYPE html>',
});
Object.defineProperty(document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true,
        };
    },
});

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
    value: () => {
        return {
            display: 'none',
            appearance: ['-webkit-appearance'],
            getPropertyValue: (prop: any) => {
                return '';
            },
        };
    },
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
