import { Injectable } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Injectable({
    providedIn: 'root',
})
export class ConfettiService {
    startConfetti() {
        confetti({
            particleCount: 500,
            spread: 300,
            startVelocity: 60,
            scalar: 1.5,
            ticks: 200,
            origin: { y: 0.5 },
        });
    }
}
