import PaymentsUICustomScreen from '../../screens/payment/PaymentUICustomScreen';
import Checkout from '../../screens/payment/Checkout';
import Panier from '../../screens/payment/Panier';

const getRoutes = () => {
  return [
    {
      name: 'PaymentUICustomScreen',
      component: PaymentsUICustomScreen
    },
    { name: 'Panier', component: Panier, options: { headerShown: false } },
    { name: 'Checkout', component: Checkout, options: { headerShown: false } }
  ];
};

export default getRoutes;
