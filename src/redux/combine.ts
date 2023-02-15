import snackbar from '@/redux/snackbar';
import session from '@/redux/session';
import authentication from '@/redux/authentication';

const combine = [snackbar, session, authentication];
export default combine;
