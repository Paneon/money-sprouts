import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
    providedIn: 'root',
})
export class ConfettiService {
    startConfetti() {
        confetti({
            particleCount: 200,
            spread: 300,
            startVelocity: 60,
            scalar: 1.5,
            duration: 5000,
            origin: { y: 0.5 },
        });
    }
}
