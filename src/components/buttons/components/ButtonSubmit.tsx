import type { ButtonCommonProps } from './ButtonCommon';
import ButtonPositive from './ButtonPositive';
export default function ButtonSubmit(props: ButtonCommonProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonPositive {...otherProps} type="submit">
      {children}
    </ButtonPositive>
  );
}
