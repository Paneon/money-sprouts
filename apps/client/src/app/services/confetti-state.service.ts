import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConfettiStateService {
    private seenThresholds = new Set<string>();

    constructor() {
        // Initialize from localStorage if needed
        this.loadSeenThresholds();
    }

    hasSeenThreshold(threshold: string): boolean {
        return this.seenThresholds.has(threshold);
    }

    markThresholdAsSeen(threshold: string): void {
        this.seenThresholds.add(threshold);
        // Optionally save to localStorage
        this.saveSeenThresholds();
    }

    private loadSeenThresholds(): void {
        // Load seen thresholds from localStorage
        const data = localStorage.getItem('seenThresholds');
        if (data) {
            this.seenThresholds = new Set(JSON.parse(data));
        }
    }

    private saveSeenThresholds(): void {
        // Save seen thresholds to localStorage
        localStorage.setItem(
            'seenThresholds',
            JSON.stringify([...this.seenThresholds])
        );
    }

    // Method to clear seen thresholds, e.g., on logout
    resetSeenThresholds(): void {
        this.seenThresholds.clear();
        localStorage.removeItem('seenThresholds');
    }
}
