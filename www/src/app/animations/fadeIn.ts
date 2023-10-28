import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeIn = trigger('fadeIn', [
  state('open', style({
    opacity: 1
  })),
  state('closed', style({
    opacity: 0
  })),
  transition('open <=> closed', animate('250ms ease-in-out'))
]);