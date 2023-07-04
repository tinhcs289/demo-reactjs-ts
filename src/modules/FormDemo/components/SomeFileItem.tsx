import { FieldArrayItemProps, useRHFArrayContext } from '@/components/form';
import toBase64 from '@/helpers/fileHelpers/toBase64';
import { Button, Card, CardActions, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import get from 'lodash/get';
import type { MouseEventHandler } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
export default function SomeFileItem(props: FieldArrayItemProps) {
  const { item, itemIndex } = props;
  const { remove } = useRHFArrayContext();
  const file = useMemo(() => get(item, ['file']) as File, [item]);
  const fileName = useMemo(() => get(item, ['file', 'name'], '') as string, [item]);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>();
  useEffect(() => {
    if (isParsing) return;
    setIsParsing(true);
    const timeout = setTimeout(() => {
      toBase64(file).then((base64) => {
        setIsParsing(false);
        if (!base64) return;
        if (!imageRef?.current) return;
        imageRef.current.src = base64;
      });
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  const handleDelete: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      remove(itemIndex);
    },
    [remove, itemIndex]
  );
  return (
    <Grid item key={item.id} xs={12} sm={6} md={3} sx={{ p: 1 }}>
      <Card>
        <CardMedia component="img" alt={fileName} height="140" ref={imageRef as any} />
        <CardActions>
          <Button size="small" onClick={handleDelete}>
            Xóa
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
