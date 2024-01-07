import PaymentUICustomScreen from '../../screens/payment/PaymentUICustomScreen';
import Checkout from '../../screens/payment/Checkout';
import Panier from '../../screens/payment/Panier';

const getRoutes = () => {
  return [
    {
      name: 'PaymentUICustomScreen',
      component: PaymentUICustomScreen,
      options: { headerShown: false }
    },
    { name: 'Panier', component: Panier, options: { headerShown: false } },
    { name: 'Checkout', component: Checkout, options: { headerShown: false } }
  ];
};

export default getRoutes;
