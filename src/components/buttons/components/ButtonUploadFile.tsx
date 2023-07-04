import ButtonCommon from './ButtonCommon';
import newGuid from '@/helpers/stringHelpers/newGuid';
import type { ChangeEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
import type { ButtonCommonProps } from './ButtonCommon';
export type ButtonUploadFileProps = ButtonCommonProps & {
  multiple?: boolean;
  onUpload?: (files: Array<File>) => void;
};
export default function ButtonUploadFile(props: ButtonUploadFileProps) {
  const { children, onUpload, multiple = false, ...otherProps } = props;
  const inputId = useMemo(() => newGuid(), []);
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (!event?.target?.files) return;
      const files = event.target.files;
      if (!files) return;
      onUpload?.(Array.from(files));
      event.target.files = null;
    },
    [onUpload]
  );
  return (
    <ButtonCommon {...otherProps} {...{ component: 'label', htmlFor: inputId }}>
      <input type="file" hidden id={inputId} onChange={handleChange} multiple={multiple} />
      {children}
    </ButtonCommon>
  );
}
