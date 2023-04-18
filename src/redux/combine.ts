import authentication from '@/redux/authentication';
import session from '@/redux/session';
import snackbar from '@/redux/snackbar';
import userAccount from '@/redux/userAccount';
const combine = [snackbar, session, authentication, userAccount];
export default combine;
