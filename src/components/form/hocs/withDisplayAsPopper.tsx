import type { ButtonCommonProps } from '@/components/buttons';
import { ButtonCommon, ButtonNegative, ButtonPositive } from '@/components/buttons';
import type { FieldComponentProps, FormInputType } from '@/components/form/_types';
import { useRHFSubmitDispatch } from '@/components/form/hocs/withRHFSubmitHandler';
import newGuid from '@/helpers/stringHelpers/newGuid';
import { useRHFWatchValue } from '@/hooks/useRHF';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { alpha, styled } from '@mui/material';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import type { CardActionsProps } from '@mui/material/CardActions';
import CardActions from '@mui/material/CardActions';
import type { CardContentProps } from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';
import type { PopperProps } from '@mui/material/Popper';
import Popper from '@mui/material/Popper';
import type { ComponentType, MouseEvent } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
const CardStyled = styled(Card)<CardProps>({ minWidth: 375 });
const CardActionsStyled = styled(CardActions)<CardActionsProps>({
  display: 'flex',
  justifyContent: 'space-between',
});
const ButtonCommonStyled = styled(ButtonCommon, { shouldForwardProp: (p) => p !== 'hasValue' })<
  ButtonCommonProps & { hasValue?: boolean; open?: boolean }
>(({ theme, hasValue, open }) => ({
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  ...(!open
    ? hasValue
      ? {
          background: alpha(theme.palette.primary.main, 0.25),
          color: theme.palette.primary.main,
          ':hover': {
            color: theme.palette.primary.main,
            background: alpha(theme.palette.primary.main, 0.4),
            boxShadow: 'none',
          },
        }
      : {
          background: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
          color: theme.palette.text.primary,
          ':hover': {
            color: theme.palette.text.primary,
            background: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[900],
            boxShadow: 'none',
          },
        }
    : {}),
}));
export type WithDisplayAsPopperParams = {
  getLabelText?: (value: any) => string;
  /**
   * @default (value: any) => typeof value !== 'undefined' && value !== null && value !== ''
   */
  hasValueWhen?: (value?: any) => boolean;
  toggleButtonLabel?: string;
  toggleButtonProps?: Partial<ButtonCommonProps>;
  popperProps?: Partial<PopperProps>;
  cardProps?: Partial<CardProps>;
  cardActionProps?: Partial<CardActionsProps>;
  cardContentProps?: Partial<CardContentProps>;
  applyButtonLabel?: string;
  discardButtonLabel?: string;
  clearButtonLabel?: string;
  /**
   * @default true
   */
  triggerSubmitOnApply?: boolean;
};
export default function withDisplayAsPopper<U extends FormInputType>(config?: WithDisplayAsPopperParams) {
  return function withDisplayAsPopperHOC(
    WrappedComponent: ComponentType<FieldComponentProps<U>>
  ): ComponentType<FieldComponentProps<U>> {
    return function FieldWithDisplayAsPopper(props: FieldComponentProps<U>) {
      const {
        getLabelText,
        hasValueWhen,
        toggleButtonLabel,
        toggleButtonProps,
        popperProps,
        cardActionProps,
        cardProps,
        cardContentProps,
        applyButtonLabel = 'áp dụng',
        discardButtonLabel = 'hủy',
        clearButtonLabel = 'xóa',
        triggerSubmitOnApply = true,
      } = config || {};
      const fieldName = useMemo(() => (props?.name || '') as string, [props?.name]);
      const fieldValue = useRHFWatchValue(fieldName);
      const previousValue = useRef();
      const { setValue } = useFormContext();
      const { dispatchSubmit } = useRHFSubmitDispatch();
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
      const id = useMemo(() => newGuid(), []);
      const hasValue = useMemo(() => {
        if (typeof hasValueWhen !== 'function') {
          if (typeof fieldValue === 'undefined') return false;
          if (fieldValue === null) return false;
          if (fieldValue === '') return false;
          return true;
        }
        return hasValueWhen(fieldValue) === true;
      }, [hasValueWhen, fieldValue]);
      const handleToggle = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          event?.stopPropagation?.();
          if (!open) {
            previousValue.current = fieldValue as any;
          }
          setAnchorEl(anchorEl ? null : event?.currentTarget);
        },
        [setAnchorEl, anchorEl, open, fieldValue]
      );
      const handleDiscard = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          event?.stopPropagation?.();
          setAnchorEl(null);
          if (!previousValue.current) {
            setValue(fieldName, null);
          } else {
            setValue(fieldName, previousValue.current);
          }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setAnchorEl, setValue, fieldName]
      );
      const handleApply = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          event?.stopPropagation?.();
          setAnchorEl(null);
          if (!triggerSubmitOnApply) return;
          dispatchSubmit?.();
        },
        [setAnchorEl, dispatchSubmit, triggerSubmitOnApply]
      );
      const handleClear = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          event?.stopPropagation?.();
          setAnchorEl(null);
          setValue(fieldName, null);
        },
        [setAnchorEl, setValue, fieldName]
      );
      const $EndIcon = useMemo(() => {
        if (open) return <ExpandLessIcon />;
        return <ExpandMoreIcon />;
      }, [open]);
      const labelText = useMemo(() => {
        if (!!open) return toggleButtonLabel;
        if (!getLabelText) return toggleButtonLabel;
        if (typeof getLabelText !== 'function') return toggleButtonLabel;
        return getLabelText(fieldValue);
      }, [fieldValue, getLabelText, toggleButtonLabel, open]);
      const $Toggle = useMemo(() => {
        return (
          <ButtonCommonStyled
            variant="contained"
            size="small"
            onClick={handleToggle}
            noTextTransform
            endIcon={$EndIcon}
            hasValue={hasValue}
            open={open}
            {...toggleButtonProps}
          >
            {labelText}
          </ButtonCommonStyled>
        );
      }, [handleToggle, $EndIcon, open, toggleButtonProps, labelText, hasValue]);
      const handleClickAway = useCallback(
        (event: globalThis.MouseEvent | TouchEvent) => {
          if (!open) return;
          event?.stopPropagation?.();
          handleDiscard(event as any);
          return;
        },
        [open, handleDiscard]
      );
      return (
        <>
          {$Toggle}
          <ClickAwayListener onClickAway={handleClickAway}>
            <Popper
              placement="bottom-start"
              sx={{ zIndex: 1 }}
              id={id}
              open={open}
              anchorEl={anchorEl}
              keepMounted
              {...popperProps}
            >
              <CardStyled elevation={5} {...cardProps}>
                <CardContent {...cardContentProps}>
                  <WrappedComponent {...props} />
                </CardContent>
                <CardActionsStyled {...cardActionProps}>
                  <ButtonPositive onClick={handleApply}>{applyButtonLabel}</ButtonPositive>
                  <ButtonNegative onClick={handleDiscard}>{discardButtonLabel}</ButtonNegative>
                  <ButtonNegative onClick={handleClear}>{clearButtonLabel}</ButtonNegative>
                </CardActionsStyled>
              </CardStyled>
            </Popper>
          </ClickAwayListener>
        </>
      );
    };
  };
}
