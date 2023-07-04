import type { ButtonCommonProps } from './ButtonCommon';
import ButtonCommon from './ButtonCommon';
export default function ButtonNegative(props: ButtonCommonProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonCommon {...otherProps} color="primary" size="small">
      {children}
    </ButtonCommon>
  );
}
