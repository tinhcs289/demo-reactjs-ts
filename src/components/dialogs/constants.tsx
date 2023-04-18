import { AnyObject } from '@/types';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
export enum CommonDialogSlide {
  down = 'down',
  up = 'up',
  left = 'left',
  right = 'right',
}
export const slideDict = Object.keys(CommonDialogSlide).reduce((dict, key) => {
  dict[key] = forwardRef(function Transition(props, ref) {
    return <Slide direction={key} ref={ref} {...(props as any)} />;
  });
  return dict;
}, {} as AnyObject);
