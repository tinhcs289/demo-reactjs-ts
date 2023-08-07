import type { ButtonCommonProps } from '@/components/buttons';
import { ButtonCommon, ButtonNegative, ButtonPositive } from '@/components/buttons';
import type { FieldComponentProps, FormInputType } from '@/components/form/_types';
import { useRHFSubmitDispatch } from '@/components/form/hocs/withRHFSubmitHandler';
import createFastContext from '@/helpers/contextHelpers/createFastContext';
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
import { cloneDeep } from 'lodash';
import type { ComponentType, MouseEvent } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
export type RHFFieldPoppersContextValues = {
  appliedField: string[];
  currentFocusField: string;
};
const {
  Provider: RHFPopperProvider,
  useGetter: useGetPopperState,
  useSetter: useSetPopperState,
  useDefaultPropInit: useInitializerPopperProp,
} = createFastContext<RHFFieldPoppersContextValues>({ appliedField: [], currentFocusField: '' });
export { RHFPopperProvider, useGetPopperState, useInitializerPopperProp, useSetPopperState };
export function withRHFPopperProvider(WrappedComponent: ComponentType<any>): ComponentType<any> {
  return function FormWithRHFPopperProvider(props: any) {
    return (
      <RHFPopperProvider>
        <WrappedComponent {...props} />
      </RHFPopperProvider>
    );
  };
}
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
  /**
   * incase sub-form
   */
  namePrefix?: string;
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
function usePopperContext(fieldName: string) {
  const setPopperContext = useSetPopperState();
  const appliedField = useGetPopperState((s) => s?.appliedField);
  const currentFocusField = useGetPopperState((s) => s?.currentFocusField);
  const isCurrentFocus = useMemo(() => currentFocusField === fieldName, [fieldName, currentFocusField]);
  const isCurrentlyApplied = useMemo(() => {
    if (!Array.isArray(appliedField)) return false;
    if (appliedField.length === 0) return false;
    return appliedField.includes(fieldName);
  }, [appliedField, fieldName]);
  const setCurrentFocus = useCallback(() => {
    if (isCurrentFocus) return;
    setPopperContext({ currentFocusField: fieldName });
  }, [setPopperContext, fieldName, isCurrentFocus]);
  const clearCurrentFocus = useCallback(() => {
    setPopperContext({ currentFocusField: '' });
  }, [setPopperContext]);
  const markFieldAsApplied = useCallback(() => {
    if (isCurrentlyApplied) return;
    const newAppliedField = cloneDeep(appliedField);
    newAppliedField.push(fieldName);
    setPopperContext({ appliedField: newAppliedField });
  }, [fieldName, appliedField, isCurrentlyApplied, setPopperContext]);
  const unmarkFieldAsApplied = useCallback(() => {
    if (!isCurrentlyApplied) return;
    const newAppliedField = appliedField.filter((f) => f !== fieldName);
    setPopperContext({ appliedField: newAppliedField });
  }, [fieldName, appliedField, isCurrentlyApplied, setPopperContext]);
  return {
    markFieldAsApplied,
    unmarkFieldAsApplied,
    isCurrentlyApplied,
    isCurrentFocus,
    setCurrentFocus,
    clearCurrentFocus,
  };
}
export default function withDisplayAsPopper<U extends FormInputType>(config?: WithDisplayAsPopperParams) {
  return function withDisplayAsPopperHOC(
    WrappedComponent: ComponentType<FieldComponentProps<U>>
  ): ComponentType<FieldComponentProps<U>> {
    return function FieldWithDisplayAsPopper(props: FieldComponentProps<U>) {
      const {
        namePrefix,
        getLabelText,
        hasValueWhen,
        toggleButtonLabel,
        toggleButtonProps,
        popperProps,
        cardActionProps,
        cardProps,
        cardContentProps,
        applyButtonLabel = 'áp dụng',
        discardButtonLabel = 'đóng',
        clearButtonLabel = 'xóa',
        triggerSubmitOnApply = true,
      } = config || {};
      const fieldName = useMemo(() => (props?.name || namePrefix || '') as string, [props?.name, namePrefix]);
      const fieldValue = useRHFWatchValue(fieldName);
      const previousValue = useRef();
      const { setValue } = useFormContext();
      const { dispatchSubmit } = useRHFSubmitDispatch();
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
      const id = useMemo(() => newGuid(), []);
      const {
        isCurrentlyApplied,
        markFieldAsApplied,
        unmarkFieldAsApplied,
        setCurrentFocus,
        clearCurrentFocus,
      } = usePopperContext(fieldName);
      const hasValue = useMemo(() => {
        if (typeof hasValueWhen !== 'function') {
          if (typeof fieldValue === 'undefined') return false;
          if (fieldValue === null) return false;
          if (fieldValue === '') return false;
          if (Array.isArray(fieldValue) && fieldValue.length === 0) return false;
          if (typeof fieldValue === 'object' && Object.keys(fieldValue).length === 0) return false;
          return true;
        }
        const _has = hasValueWhen(fieldValue) === true;
        return _has;
      }, [hasValueWhen, fieldValue]);
      const handleClose = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          event?.stopPropagation?.();
          setAnchorEl(null);
          if (!previousValue.current) {
            setTimeout(() => {
              setValue(fieldName, null);
            }, 0);
          } else {
            const preValues = cloneDeep(previousValue.current);
            setTimeout(() => {
              setValue(fieldName, preValues);
            }, 0);
          }
        },
        [setAnchorEl, setValue, fieldName]
      );
      const handleToggle = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          //event?.stopPropagation?.();
          if (!open) {
            previousValue.current = cloneDeep(fieldValue) as any;
            setAnchorEl(event?.currentTarget);
            setTimeout(() => {
              setCurrentFocus();
            }, 0);
          } else {
            handleClose(event);
          }
        },
        [setAnchorEl, handleClose, open, fieldValue, setCurrentFocus]
      );
      const handleApply = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          event?.stopPropagation?.();
          setAnchorEl(null);
          previousValue.current = undefined;
          markFieldAsApplied();
          if (!triggerSubmitOnApply) return;
          dispatchSubmit?.(`apply_${fieldName}`);
          clearCurrentFocus();
        },
        [setAnchorEl, dispatchSubmit, triggerSubmitOnApply, fieldName, markFieldAsApplied, clearCurrentFocus]
      );
      const handleClear = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          event?.stopPropagation?.();
          setAnchorEl(null);
          setValue(fieldName, null);
          previousValue.current = undefined;
          unmarkFieldAsApplied();
          if (!triggerSubmitOnApply) return;
          dispatchSubmit?.(`clear_${fieldName}`);
          clearCurrentFocus();
        },
        [
          setAnchorEl,
          setValue,
          fieldName,
          dispatchSubmit,
          triggerSubmitOnApply,
          unmarkFieldAsApplied,
          clearCurrentFocus,
        ]
      );
      const $EndIcon = useMemo(() => {
        if (open) return <ExpandLessIcon />;
        return <ExpandMoreIcon />;
      }, [open]);
      const labelText = useMemo(() => {
        if (!!open) return toggleButtonLabel;
        if (typeof getLabelText !== 'function') return toggleButtonLabel;
        return getLabelText(fieldValue);
      }, [fieldValue, getLabelText, toggleButtonLabel, open]);
      const $Toggle = useMemo(() => {
        return (
          <ButtonCommonStyled
            variant="contained"
            size="small"
            className={`btn-toggle__${fieldName}`}
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
      }, [handleToggle, $EndIcon, open, toggleButtonProps, labelText, hasValue, fieldName]);
      const handleClickAway = useCallback(
        (event: globalThis.MouseEvent | TouchEvent) => {
          if (!open) return;
          if (
            event?.target instanceof Element &&
            event.target.classList.contains(`btn-toggle__${fieldName}`)
          ) {
            return;
          }
          event?.stopPropagation?.();
          handleClose(event as any);
          return;
        },
        [open, handleClose, fieldName]
      );
      const $ButtonClear = useMemo(() => {
        if (!isCurrentlyApplied) return null;
        return <ButtonNegative onClick={handleClear}>{clearButtonLabel}</ButtonNegative>;
      }, [isCurrentlyApplied, handleClear, clearButtonLabel]);
      return (
        <>
          {$Toggle}
          <ClickAwayListener onClickAway={handleClickAway}>
            <Popper
              placement="bottom-start"
              sx={{ zIndex: 1300 }}
              id={id}
              open={open}
              anchorEl={anchorEl}
              {...popperProps}
            >
              <CardStyled elevation={5} {...cardProps}>
                <CardContent {...cardContentProps}>
                  <WrappedComponent {...props} />
                </CardContent>
                <CardActionsStyled {...cardActionProps}>
                  <ButtonPositive onClick={handleApply}>{applyButtonLabel}</ButtonPositive>
                  <ButtonNegative onClick={handleClose}>{discardButtonLabel}</ButtonNegative>
                  {$ButtonClear}
                </CardActionsStyled>
              </CardStyled>
            </Popper>
          </ClickAwayListener>
        </>
      );
    };
  };
}
