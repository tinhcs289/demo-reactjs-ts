import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import { styled, Theme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Popper, { PopperProps } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { TCommonAutoCompleteFieldProps } from '../_types';

const PopperStyled = styled(Popper)<PopperProps>((args: { theme: Theme }) => {
  const { theme } = args;
  return {
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
    padding: theme.spacing(1),
    '& .MuiPaper-root.MuiPaper-elevation': {
      boxShadow: 'none !important',
      background: 'transparent',
    },
  };
});

const CustomPopper =
  (args: { totalCount?: number }): React.JSXElementConstructor<PopperProps> =>
  (props) => {
    const { children, ...otherProps } = props;
    const { totalCount } = args;

    return (
      <PopperStyled {...otherProps}>
        <>
          {!!totalCount && totalCount > 0 ? (
            <>
              <Typography className="px-2 mt-2 opacity-75">{`result found: ${totalCount}`}</Typography>
              <Divider className="mt-2" />
            </>
          ) : null}
          {children}
        </>
      </PopperStyled>
    );
  };

const withTotalCountLabel =
  (WrappedComponent: React.FC<TCommonAutoCompleteFieldProps>) => (props: TCommonAutoCompleteFieldProps) => {
    const { options, loading, ...otherProps } = props;

    const memoOptions = React.useMemo(() => {
      return arrayOrEmpty(options);
    }, [options]);

    const PopperComponent = React.useMemo(() => {
      return CustomPopper({ totalCount: memoOptions.length });
    }, [memoOptions]);

    return (
      <WrappedComponent {...otherProps} loading={loading} options={memoOptions} PopperComponent={PopperComponent} />
    );
  };
export default withTotalCountLabel;
