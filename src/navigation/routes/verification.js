import ReqEmailVerification from '../../screens/verification/ReqEmailVerification';
import VerifyEmailToken from '../../screens/verification/VerifyEmailToken';
import VerifyPhoneNumberOTP from '../../screens/verification/VerifyPhoneNumberOTP';
import SendEmailConfirmation from '../../screens/verification/SendEmailConfirmation';
import ReqPhoneNumberOTP from '../../screens/verification/ReqPhoneNumberOTP';

const getRoutes = () => {
  return [
    {
      name: 'ReqEmailVerification',
      component: ReqEmailVerification,
      options: { headerShown: false }
    },
    { name: 'ReqPhoneNumberOTP', component: ReqPhoneNumberOTP, options: { headerShown: false } },
    { name: 'VerifyEmailToken', component: VerifyEmailToken, options: { headerShown: false } },
    {
      name: 'SendEmailConfirmation',
      component: SendEmailConfirmation,
      options: { headerShown: false }
    },
    {
      name: 'VerifyPhoneNumberOTP',
      component: VerifyPhoneNumberOTP,
      options: { headerShown: false }
    }
  ];
};

export default getRoutes;
