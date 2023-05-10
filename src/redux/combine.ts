import authentication from '@/redux/authentication';
import session from '@/redux/session';
import snackbar from '@/redux/snackbar';
import userAccount from '@/redux/userAccount';
import userProfile from '@/redux/userProfile';
const combine = [snackbar, session, authentication, userAccount, userProfile];
export default combine;
