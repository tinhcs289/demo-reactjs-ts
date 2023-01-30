/* eslint-disable no-useless-computed-key */
import type { PaletteOptions, ThemeOptions, PaletteColorOptions } from '@mui/material/styles';

const font =
  'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';

/**
 * @see https://mui.com/material-ui/customization/default-theme/#main-content
 */
const materializeLightThemeOptions: Omit<ThemeOptions, 'palette'> & {
  palette?: PaletteOptions & { customColors?: Partial<PaletteColorOptions> & { [x: string]: string } };
} = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    customColors: {
      dark: '234, 234, 255',
      main: '76, 78, 100',
      light: '76, 78, 100',
      darkBg: '#282A42',
      lightBg: '#F7F7F9',
      bodyBg: '#F7F7F9',
      trackBg: '#F2F2F4',
      tooltipBg: '#262732',
      tableHeaderBg: '#F5F5F7',
    },
    common: {
      black: '#000',
      white: '#FFF',
    },
    primary: {
      light: '#787EFF',
      main: '#666CFF',
      dark: '#5A5FE0',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#7F889B',
      main: '#6D788D',
      dark: '#606A7C',
      contrastText: '#FFF',
    },
    error: {
      light: '#FF625F',
      main: '#FF4D49',
      dark: '#E04440',
      contrastText: '#FFF',
    },
    warning: {
      light: '#FDBE42',
      main: '#FDB528',
      dark: '#DF9F23',
      contrastText: '#FFF',
    },
    info: {
      light: '#40CDFA',
      main: '#26C6F9',
      dark: '#21AEDB',
      contrastText: '#FFF',
    },
    success: {
      light: '#83E542',
      main: '#72E128',
      dark: '#64C623',
      contrastText: '#FFF',
    },
    grey: {
      '50': '#FAFAFA',
      '100': '#F5F5F5',
      '200': '#EEEEEE',
      '300': '#E0E0E0',
      '400': '#BDBDBD',
      '500': '#9E9E9E',
      '600': '#757575',
      '700': '#616161',
      '800': '#424242',
      '900': '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161',
    },
    text: {
      primary: 'rgba(76, 78, 100, 0.87)',
      secondary: 'rgba(76, 78, 100, 0.6)',
      disabled: 'rgba(76, 78, 100, 0.38)',
    },
    divider: 'rgba(76, 78, 100, 0.12)',
    background: {
      paper: '#FFF',
      default: '#F7F7F9',
    },
    action: {
      active: 'rgba(76, 78, 100, 0.54)',
      hover: 'rgba(76, 78, 100, 0.05)',
      hoverOpacity: 0.05,
      selected: 'rgba(76, 78, 100, 0.08)',
      disabled: 'rgba(76, 78, 100, 0.26)',
      disabledBackground: 'rgba(76, 78, 100, 0.12)',
      focus: 'rgba(76, 78, 100, 0.12)',
      selectedOpacity: 0.08,
      disabledOpacity: 0.38,
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  shape: {
    borderRadius: 10,
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    fab: 1050,
    mobileStepper: 1000,
    modal: 1300,
    snackbar: 1400,
    speedDial: 1050,
    tooltip: 1500,
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontFamily: font,
    body1: {
      color: 'rgba(76, 78, 100, 0.87)',
      fontFamily: font,
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.15px',
      lineHeight: 1.5,
    },
    body2: {
      color: 'rgba(76, 78, 100, 0.6)',
      fontFamily: font,
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: '0.15px',
      lineHeight: 1.429,
    },
    button: {
      color: 'rgba(76, 78, 100, 0.87)',
      fontFamily: font,
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.4px',
      lineHeight: 1.75,
      textTransform: 'uppercase',
    },
    caption: {
      color: 'rgba(76, 78, 100, 0.6)',
      fontFamily: font,
      fontSize: '0.75rem',
      fontWeight: 400,
      letterSpacing: '0.4px',
      lineHeight: 1.25,
    },
    h1: {
      color: 'rgba(76, 78, 100, 0.87)',
      fontFamily: font,
      fontSize: '3.5rem',
      fontWeight: 500,
      letterSpacing: '-1.5px',
      lineHeight: 1.167,
      ['@media (min-width:600px)']: { fontSize: '4.7129rem' },
      ['@media (min-width:900px)']: { fontSize: '5.3556rem' },
      ['@media (min-width:1200px)']: { fontSize: '5.9983rem' },
    },
    h2: {
      color: 'rgba(76, 78, 100, 0.87)',
      fontFamily: font,
      fontSize: '2.375rem',
      fontWeight: 500,
      letterSpacing: '-0.5px',
      lineHeight: 1.2,
      ['@media (min-width:600px)']: { fontSize: '3.125rem' },
      ['@media (min-width:900px)']: { fontSize: '3.3333rem' },
      ['@media (min-width:1200px)']: { fontSize: '3.75rem' },
    },
    h3: {
      color: 'rgba(76, 78, 100, 0.87)',
      fontFamily: font,
      fontSize: '2rem',
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.167,
      ['@media (min-width:600px)']: { fontSize: '2.5707rem' },
      ['@media (min-width:900px)']: { fontSize: '2.7849rem' },
      ['@media (min-width:1200px)']: { fontSize: '2.9991rem' },
    },
    h4: {
      color: 'rgba(76, 78, 100, 0.87)',
      fontFamily: font,
      fontSize: '1.5625rem',
      fontWeight: 500,
      letterSpacing: '0.25px',
      lineHeight: 1.235,
      ['@media (min-width:600px)']: { fontSize: '1.8219rem' },
      ['@media (min-width:900px)']: { fontSize: '2.0243rem' },
      ['@media (min-width:1200px)']: { fontSize: '2.0243rem' },
    },
    h5: {
      color: 'rgba(76, 78, 100, 0.87)',
      fontFamily: font,
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.334,
      ['@media (min-width:600px)']: { fontSize: '1.3118rem' },
      ['@media (min-width:900px)']: { fontSize: '1.4993rem' },
      ['@media (min-width:1200px)']: { fontSize: '1.4993rem' },
    },
    h6: {
      color: 'rgba(76, 78, 100, 0.87)',
      fontFamily: font,
      fontSize: '1.125rem',
      fontWeight: 500,
      letterSpacing: '0.15px',
      lineHeight: 1.6,
      ['@media (min-width:600px)']: { fontSize: '1.25rem' },
      ['@media (min-width:900px)']: { fontSize: '1.25rem' },
      ['@media (min-width:1200px)']: { fontSize: '1.25rem' },
    },
    overline: {
      color: 'rgba(76, 78, 100, 0.6)',
      fontFamily: font,
      fontSize: '0.75rem',
      fontWeight: 400,
      letterSpacing: '1px',
      lineHeight: 2.66,
      textTransform: 'uppercase',
    },
    subtitle1: {
      color: 'rgba(76, 78, 100, 0.87)',
      fontFamily: font,
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.15px',
      lineHeight: 1.75,
    },
    subtitle2: {
      color: 'rgba(76, 78, 100, 0.6)',
      fontFamily: font,
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.1px',
      lineHeight: 1.57,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(20, 21, 33, 0.2), 0px 1px 1px 0px rgba(20, 21, 33, 0.14), 0px 1px 3px 0px rgba(20, 21, 33, 0.12)',

    '0px 3px 1px -2px rgba(20, 21, 33, 0.2), 0px 2px 2px 0px rgba(20, 21, 33, 0.14), 0px 1px 5px 0px rgba(20, 21, 33, 0.12)',

    '0px 4px 8px -4px rgba(20, 21, 33, 0.42)',

    '0px 6px 18px -8px rgba(20, 21, 33, 0.56)',

    '0px 3px 5px -1px rgba(20, 21, 33, 0.2), 0px 5px 8px 0px rgba(20, 21, 33, 0.14), 0px 1px 14px 0px rgba(20, 21, 33, 0.12)',

    '0px 2px 10px 0px rgba(20, 21, 33,  0.18)',

    '0px 4px 5px -2px rgba(20, 21, 33, 0.2), 0px 7px 10px 1px rgba(20, 21, 33, 0.14), 0px 2px 16px 1px rgba(20, 21, 33, 0.12)',

    '0px 5px 5px -3px rgba(20, 21, 33, 0.2), 0px 8px 10px 1px rgba(20, 21, 33, 0.14), 0px 3px 14px 2px rgba(20, 21, 33, 0.12)',

    '0px 5px 6px -3px rgba(20, 21, 33, 0.2), 0px 9px 12px 1px rgba(20, 21, 33, 0.14), 0px 3px 16px 2px rgba(20, 21, 33, 0.12)',

    '0px 6px 6px -3px rgba(20, 21, 33, 0.2), 0px 10px 14px 1px rgba(20, 21, 33, 0.14), 0px 4px 18px 3px rgba(20, 21, 33, 0.12)',

    '0px 6px 7px -4px rgba(20, 21, 33, 0.2), 0px 11px 15px 1px rgba(20, 21, 33, 0.14), 0px 4px 20px 3px rgba(20, 21, 33, 0.12)',

    '0px 7px 8px -4px rgba(20, 21, 33, 0.2), 0px 12px 17px 2px rgba(20, 21, 33, 0.14), 0px 5px 22px 4px rgba(20, 21, 33, 0.12)',

    '0px 7px 8px -4px rgba(20, 21, 33, 0.2), 0px 13px 19px 2px rgba(20, 21, 33, 0.14), 0px 5px 24px 4px rgba(20, 21, 33, 0.12)',

    '0px 7px 9px -4px rgba(20, 21, 33, 0.2), 0px 14px 21px 2px rgba(20, 21, 33, 0.14), 0px 5px 26px 4px rgba(20, 21, 33, 0.12)',

    '0px 8px 9px -5px rgba(20, 21, 33, 0.2), 0px 15px 22px 2px rgba(20, 21, 33, 0.14), 0px 6px 28px 5px rgba(20, 21, 33, 0.12)',

    '0px 8px 10px -5px rgba(20, 21, 33, 0.2), 0px 16px 24px 2px rgba(20, 21, 33, 0.14), 0px 6px 30px 5px rgba(20, 21, 33, 0.12)',

    '0px 8px 11px -5px rgba(20, 21, 33, 0.2), 0px 17px 26px 2px rgba(20, 21, 33, 0.14), 0px 6px 32px 5px rgba(20, 21, 33, 0.12)',

    '0px 9px 11px -5px rgba(20, 21, 33, 0.2), 0px 18px 28px 2px rgba(20, 21, 33, 0.14), 0px 7px 34px 6px rgba(20, 21, 33, 0.12)',

    '0px 9px 12px -6px rgba(20, 21, 33, 0.2), 0px 19px 29px 2px rgba(20, 21, 33, 0.14), 0px 7px 36px 6px rgba(20, 21, 33, 0.12)',

    '0px 10px 13px -6px rgba(20, 21, 33, 0.2), 0px 20px 31px 3px rgba(20, 21, 33, 0.14), 0px 8px 38px 7px rgba(20, 21, 33, 0.12)',

    '0px 10px 13px -6px rgba(20, 21, 33, 0.2), 0px 21px 33px 3px rgba(20, 21, 33, 0.14), 0px 8px 40px 7px rgba(20, 21, 33, 0.12)',

    '0px 10px 14px -6px rgba(20, 21, 33, 0.2), 0px 22px 35px 3px rgba(20, 21, 33, 0.14), 0px 8px 42px 7px rgba(20, 21, 33, 0.12)',

    '0px 11px 14px -7px rgba(20, 21, 33, 0.2), 0px 23px 36px 3px rgba(20, 21, 33, 0.14), 0px 9px 44px 8px rgba(20, 21, 33, 0.12)',

    '0px 11px 15px -7px rgba(20, 21, 33, 0.2), 0px 24px 38px 3px rgba(20, 21, 33, 0.14), 0px 9px 46px 8px rgba(20, 21, 33, 0.12)',
  ],
  transitions: {
    duration: {
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
      short: 250,
      shorter: 200,
      shortest: 150,
      standard: 300,
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
};
export default materializeLightThemeOptions;
