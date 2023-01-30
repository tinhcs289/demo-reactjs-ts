import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { MouseEventHandler } from 'react';
import { useCallback } from 'react';

const ButtonWrap = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  transition: 'all ease 0.3s',
  left: 0,
  bottom: '-32.75px',
  zIndex: 2,
  height: 0,
}));

export default function ProductItemFindSimilar(props?: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
  const preventDefault: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      props?.onClick?.(event);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props?.onClick]
  );

  return (
    <ButtonWrap className="btn-find-similar">
      <Button
        startIcon={<SearchIcon />}
        color="primary"
        variant="contained"
        fullWidth
        onClick={preventDefault}
        sx={{
          borderRadius: 0,
          textTransform: 'none',
          fontSize: 'small',
        }}
      >
        {`Sản phẩm tương tự`}
      </Button>
    </ButtonWrap>
  );
}
