import { default as getAuthRoutes } from './auth';
import { default as getChatRoutes } from './chat';
import { default as getCheckoutRoutes } from './checkout';
import { default as getMapRoutes } from './map';
import { default as getProfileRoutes } from './profile';
import { default as getVerificationRoutes } from './verification';

const routes = [
  getAuthRoutes,
  getChatRoutes,
  getCheckoutRoutes,
  getMapRoutes,
  getProfileRoutes,
  getVerificationRoutes
];

export default routes;
