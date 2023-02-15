import { styled } from '@mui/material';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { ComponentType } from 'react';

// const HEIGHT = 220;

// const PICKER_DAY_SIZE = {
//   width: `${20}px`,
//   height: `${20}px`,
// };

const FormControlLabelStyled = styled(FormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'flex-start',
  marginLeft: 0,
  marginRight: 0,
  '& span.MuiFormControlLabel-label': {
    display: 'flex',
  },
  '& div.MuiPickerStaticWrapper-content': {
    minWidth: `calc(100% / 3)`,
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.grey[400]}`,
    '&:hover': {
      border: `1px solid ${theme.palette.grey[800]}`,
    },
    // '& div.MuiCalendarOrClockPicker-root > div': {
    //   maxHeight: `${HEIGHT}px`,
    // }
  },
  '& div.MuiPickerStaticWrapper-root': {
    width: '100%',
    '& div.MuiCalendarOrClockPicker-root > div': {
      width: '100%',
      '& > div.MuiCalendarPicker-root': {
        width: '100%',
        '& div.MuiDayPicker-header': {
          justifyContent: 'space-evenly',
        },
        '& div.MuiDayPicker-weekContainer': {
          justifyContent: 'space-evenly',
        },
      },
    },
  },
  // '& div.MuiPickersDay-root': {
  //   ...PICKER_DAY_SIZE,
  // },
  '& button.MuiPickersDay-root': {
    //...PICKER_DAY_SIZE,
    borderRadius: theme.spacing(0.5),
  },
  // '& span.MuiDayPicker-weekDayLabel': {
  //   width: PICKER_DAY_SIZE.width,
  //   height: '36px',
  // },
  '& div.MuiPickersCalendarHeader-label': {
    lineHeight: '1rem',
  },
  // '& div.MuiPickersCalendarHeader-root': {
  //   marginTop: '8px',
  //   marginBottom: '8px',
  //   paddingLeft: '12px',
  //   paddingRight: '12px',
  // },
})) as ComponentType<FormControlLabelProps>;
export default FormControlLabelStyled;
