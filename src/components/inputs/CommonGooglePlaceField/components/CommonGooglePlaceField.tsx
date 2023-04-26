import withHOCs from '@/hocs/withHocs';
import PlaceField from './PlaceField';
// import withGooglePlaceDetailApi from '../hocs/withGooglePlaceDetailApi';
import withAutoAppendValueToOptions from '../hocs/withAutoAppendValueToOptions';
import withGooglePlaceSearchApi from '../hocs/withGooglePlaceSearchApi';
const CommonGooglePlaceField = withHOCs(
  //withGooglePlaceDetailApi,
  withGooglePlaceSearchApi,
  withAutoAppendValueToOptions
)(PlaceField);
export default CommonGooglePlaceField;
