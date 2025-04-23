<<<<<<<< HEAD:assets/client/app/services/confetti.service.ts
import { Injectable } from '@angular/core';
import * as confetti from 'canvas-confetti';
========
import confetti from 'canvas-confetti';
>>>>>>>> main:assets/client/services/confetti.service.ts

export class ConfettiService {
    startConfetti() {
        confetti({
            particleCount: 500,
            spread: 300,
            startVelocity: 60,
            scalar: 1.5,
<<<<<<<< HEAD:assets/client/app/services/confetti.service.ts
            ticks: 200,
========
            ticks: 8000,
>>>>>>>> main:assets/client/services/confetti.service.ts
            origin: { y: 0.5 },
        });
    }
}
