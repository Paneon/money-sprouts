import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
    state(
        'void',
        style({
            opacity: 0,
        })
    ),
    transition('void <=> *', [animate(300)]),
]);
