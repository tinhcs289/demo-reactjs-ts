import removeAt from '@/helpers/arrayHelpers/removeAt';
import byMomentASC from '@/helpers/arraySortHelpers/byMomentASC';
import CancelIcon from '@mui/icons-material/Cancel';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useTheme } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import cloneDeep from 'lodash/cloneDeep';
import type { FC } from 'react';
import { useCallback, useMemo } from 'react';
import type { ICommonDateMultiFieldProps } from '../_types';

const withSelectedDateTags =
  (WrappedComponent: FC<ICommonDateMultiFieldProps>) => (props: ICommonDateMultiFieldProps) => {
    const theme = useTheme();

    const { value, onChange, ...otherProps } = props;

    const handleDelete = useCallback(
      (index: number) => {
        let _dates = cloneDeep(value);
        _dates = removeAt(_dates, index);
        if (_dates.length > 0) _dates.sort(byMomentASC());
        onChange?.(_dates);
        return;
      },
      [value, onChange],
    );

    return (
      <Grid container alignItems="baseline" sx={{ background: theme.palette.background.paper }}>
        <Grid item xs={12} md={6} container sx={{ p: theme.spacing(1) }}>
          <Grid item xs={12}>
            <WrappedComponent value={value} onChange={onChange} {...otherProps} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} container sx={{ p: theme.spacing(1) }}>
          {useMemo(() => {
            return (
              <Grid item xs={12} container spacing={1}>
                {value?.map?.((date, i) => {
                  const label = date.format('DD/MM/YYYY');
                  return (
                    <Grid key={i} item>
                      <Chip
                        label={label}
                        icon={<EventAvailableIcon />}
                        color="primary"
                        deleteIcon={<CancelIcon />}
                        onDelete={() => {
                          handleDelete(i);
                        }}
                        sx={{
                          borderRadius: theme.spacing(0.5),
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            );
          }, [theme, value, handleDelete])}
        </Grid>
      </Grid>
    );
  };
export default withSelectedDateTags;
