import withHOCs from '@/hocs/withHocs';
import PlaceField from './PlaceField';
// import withGooglePlaceDetailApi from './withGooglePlaceDetailApi';
import withAutoAppendValueToOptions from './withAutoAppendValueToOptions';
import withGooglePlaceSearchApi from './withGooglePlaceSearchApi';
const CommonGooglePlaceField = withHOCs(
  //withGooglePlaceDetailApi,
  withGooglePlaceSearchApi,
  withAutoAppendValueToOptions
)(PlaceField);
export default CommonGooglePlaceField;
