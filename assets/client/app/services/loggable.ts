import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export abstract class Loggable {
    log(...args: unknown[]) {
        console.log(`[${this.constructor.name}]`, ...args);
    }

    error(...args: unknown[]) {
        console.error(`[${this.constructor.name}]`, ...args);
    }

    warning(...args: unknown[]) {
        console.warn(`[${this.constructor.name}]`, ...args);
    }

    debug(...args: unknown[]) {
        console.debug(`[${this.constructor.name}]`, ...args);
    }
}
