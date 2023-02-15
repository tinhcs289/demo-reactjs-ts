import FormGridItem from '@/components/form/FormGridItem';
import InputErrorTextWithIcon from '@/components/inputs/InputErrorTextWithIcon';
import removeAt from '@/helpers/arrayHelpers/removeAt';
import byMomentASC from '@/helpers/arraySortHelpers/byMomentASC';
import CancelIcon from '@mui/icons-material/Cancel';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import type { Theme } from '@mui/material';
import { styled, useMediaQuery } from '@mui/material';
import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import Grid, { GridProps } from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { ComponentType } from 'react';
import { useCallback, useMemo } from 'react';
import type { ICommonDateMultiPickerFieldProps } from './_types';
import Button from '@mui/material/Button';

const HEIGHT = 334; // max-height value of the x-date-picker component  was fixed by 358 pixel

const ChipStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
  [theme.breakpoints.up('lg')]: {
    width: '100%',
    justifyContent: 'space-between',
  },
}));

const TagsContanierWrapper = styled(FormGridItem)<GridProps>(({ theme }) => ({
  background: theme.palette.mode === 'light' ? theme.palette.action.hover : theme.palette.background.default,
  padding: 0,
  borderRadius: theme.spacing(0.5),
  border: `1px solid ${theme.palette.grey[400]}`,
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    overflowY: 'auto',
    maxHeight: `${HEIGHT}px`,
  },
}));

const TagsContanier = styled(Grid)<GridProps>(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(0.5),
  },
}));

const TagsActions = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    position: 'sticky',
    top: 0,
    left: 0,
    width: '100%',
    height: 'fit-content',
    background: theme.palette.background.paper,
    zIndex: 1,
  },
}));

const withSelectedDateTags =
  (WrappedComponent: ComponentType<ICommonDateMultiPickerFieldProps>) =>
  (props: ICommonDateMultiPickerFieldProps) => {
    const { value, onChange, sx, label, required, error, errorText, ...otherProps } = props;

    const isMediumScreenOrSmaller = useMediaQuery((t: Theme) => t?.breakpoints?.down?.('md'));

    const handleDelete = useCallback(
      (index: number) => {
        let dates = removeAt(value, index);
        if (dates.length > 0) dates.sort(byMomentASC());
        onChange?.(dates);
        return;
      },
      [value, onChange]
    );

    const handleClear = useCallback(() => {
      onChange?.([]);
      return;
    }, [onChange]);

    const hasValue = useMemo(() => Array.isArray(value) && value.length > 0, [value]);

    const $tags = useMemo(() => {
      if (!(Array.isArray(value) && value.length > 0)) return null;
      return (
        <TagsContanierWrapper lg={4} container>
          <TagsActions item xs={12} container justifyContent="flex-end">
            <Button onClick={handleClear}>{`Clear (${value.length})`}</Button>
          </TagsActions>
          <TagsContanier item xs={12} container>
            {value?.map?.((date, i) => {
              const label = date.format('DD/MM/YYYY');
              return (
                <FormGridItem key={i} disabledXs={isMediumScreenOrSmaller} sx={{ p: '2px', width: 'auto' }}>
                  <ChipStyled
                    label={label}
                    icon={<EventAvailableIcon />}
                    color="primary"
                    variant="outlined"
                    size="small"
                    deleteIcon={<CancelIcon />}
                    onDelete={() => {
                      handleDelete(i);
                    }}
                  />
                </FormGridItem>
              );
            })}
          </TagsContanier>
        </TagsContanierWrapper>
      );
    }, [value, handleDelete, handleClear, isMediumScreenOrSmaller]);

    const $error = useMemo(() => {
      if (!error) return null;
      if (!errorText) return null;
      return (
        <InputErrorTextWithIcon
          style={{ display: 'flex' }}
          textProps={{ sx: { right: 'unset', left: '-50%' } }}
        >
          {errorText}
        </InputErrorTextWithIcon>
      );
    }, [error, errorText]);

    const $label = useMemo(() => {
      if (!label) return null;
      return (
        <FormGridItem>
          <Typography component="span" sx={{ display: 'flex' }} color={!!error ? 'error' : 'inherit'}>
            {$error}
            {label}
            {required ? ` *` : ''}
          </Typography>
        </FormGridItem>
      );
    }, [label, required, error, $error]);

    return (
      <Grid container sx={{ width: '100%', m: 0, p: 0, ...sx }}>
        {$label}
        <FormGridItem {...(hasValue ? { lg: 8 } : {})}>
          <WrappedComponent
            value={value}
            required={required}
            error={error}
            errorText={errorText}
            onChange={onChange}
            {...otherProps}
          />
        </FormGridItem>
        {$tags}
      </Grid>
    );
  };
export default withSelectedDateTags;
