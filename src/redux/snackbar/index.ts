import createReducer from '@/helpers/reduxSagaHelpers/createReducer';
import dispatch from './reducers';
import initialState, { rootName } from './state';

export default createReducer(rootName, initialState, dispatch as any);
