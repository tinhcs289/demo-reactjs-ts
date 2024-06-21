import type { Breakpoint } from '@mui/material';
/**
 * width of the aside menu, follow px.
 */
export const ASIDE_MENU_WIDTH = 280;
/**
 * width of the content of the page, follow MUI breakpoint values.
 */
export const DEFAULT_WIDTH: Breakpoint = 'xl';
/**
 * can or can not adjust width of the content of the page.
 */
export const MODIFIABLE_WIDTH = false;
/**
 * height of the top AppBar component, follow px.
 */
export const APP_BAR_HEIGHT = 48;
/**
 * padding of the content of the page, follow px.
 */
export const LAYOUT_PADDING = 8;
/**
 * height of the content of the page, follow px.
 */
export const PAGE_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT + 2 * LAYOUT_PADDING}px)`;
