import type { MouseEvent } from 'react';

/** Keep modified clicks and explicit link targets under browser control. */
export function navigateLink(event: MouseEvent<HTMLAnchorElement>, navigate: () => void) {
  const link = event.currentTarget;
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    || (link.target && link.target.toLowerCase() !== '_self') || link.hasAttribute('download')) return;
  event.preventDefault();
  navigate();
}
