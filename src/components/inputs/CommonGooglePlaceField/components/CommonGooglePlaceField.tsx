import withHOCs from '@/hocs/withHocs';
import PlaceField from './PlaceField';
import withAutoAppendValueToOptions from '../hocs/withAutoAppendValueToOptions';
import withGooglePlaceSearchApi from '../hocs/withGooglePlaceSearchApi';
const CommonGooglePlaceField = withHOCs(withGooglePlaceSearchApi, withAutoAppendValueToOptions)(PlaceField);
export default CommonGooglePlaceField;
