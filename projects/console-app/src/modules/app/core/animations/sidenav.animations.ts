import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

/*
 * animation: sideNaveAnimation
 * trigger: 'openClose'
 *
 * comments: sets the width of an element to 200px when 'open' and to 60px
 *   when closed.  Animates in between these two states over '0.3s'
 */

export const sideNavAnimation = (condensedWidth: string) => {
  return trigger('openCloseSidenav', [
    // ...
    state('open', style({
      width: '20rem',
    })),
    state('closed', style({
      width: condensedWidth,
    })),
    transition('open <=> closed', [
      animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    ]),
  ]);
};

/*
 * animation: sideNavContainerAnimation
 * trigger: 'openCloseSidenavContent'
 *
 * comments: Sets the margin-left to 201px when "open" and 61px when "closed".
 */

export const sideNavContainerAnimation = (condensedWidth: string) => {
  return trigger('openCloseSidenavContent', [
    state('open', style({
      'margin-left': '20rem',
    })),
    state('closed', style({
      'margin-left': condensedWidth,
    })),
    transition('open <=> closed', [
      animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    ]),
  ]);
};
