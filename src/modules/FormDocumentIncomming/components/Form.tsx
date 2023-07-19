import { withRHF, withRHFSubmitHandler } from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import withApiCreate from '../hocs/withApiCreate';
import withApiCreateDraft from '../hocs/withApiCreateDraft';
import withApiGetDetail from '../hocs/withApiGetDetail';
import withApiUpdate from '../hocs/withApiUpdate';
import withFormActionsButtons from '../hocs/withFormActionsButtons';
import FormFields from './FormFields';
const Form = withHOCs(
  withApiGetDetail,
  withApiUpdate,
  withApiCreateDraft,
  withApiCreate,
  withRHF,
  withRHFSubmitHandler,
  withFormActionsButtons
)(FormFields);
export default Form;
