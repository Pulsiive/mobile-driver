import API from './Api';

class Backend {
  reqPhoneNumberOTP = async (phoneNumber) => {
    const res = await API.send('POST', '/api/v1/phone-number/request', { phoneNumber }, true);
    return res;
  };

  verifyPhoneNumberOTP = async (otp, phoneNumber) => {
    console.log({ phoneNumber });
    const res = await API.send(
      'POST',
      `/api/v1/phone-number/verify?otp=${otp}`,
      { phoneNumber },
      true
    );
    return res;
  };

  reqEmailToken = async (email) => {
    const res = await API.send('POST', '/api/v1/emailVerification', { email }, false);
    return res;
  };

  verifyEmailToken = async (email, token) => {
    const res = await API.send(
      'POST',
      `/api/v1/requestEmailVerification/${token}`,
      { email },
      false
    );
    return res;
  };

  me = async () => {
    const res = await API.send('GET', '/api/v1/profile', null, true);
    return res;
  };

  getSlots = async (stationId) => {
    const res = await API.send('GET', `/api/v1/slot?station_id=${stationId}`, null, false);
    return res;
  };

  getReservations = async () => {
    const res = await API.send('GET', '/api/v1/reservation', null, true);
    return res;
  };

  getReservationRequests = async () => {
    const res = await API.send('GET', '/api/v1/driver/reservations/requests/', null, true);
    return res;
  };

  getStation = async (stationId) => {
    const res = await API.send('GET', `/api/v1/profile/station/${stationId}`, null, false);
    return res;
  };

  bookSlot = async (id) => {
    const res = await API.send('POST', `/api/v1/reservation/${id}`, null, true);
    return res;
  };

  getPayments = async () => {
    const res = await API.send('GET', `/api/v1/payments`, null, true);
    return res;
  };

  submitPayment = async (paymentIntentId) => {
    const res = await API.send(
      'POST',
      '/api/v1/payment',
      { payment_intent_id: paymentIntentId },
      true
    );
    return res;
  };

  async createStripePaymentIntent(brutPrice) {
    return await API.send('POST', '/api/v1/payment-request', { brut_price: brutPrice }, true);
  }

  async updateStripePaymentIntent(brutPrice, paymentIntentId) {
    return await API.send(
      'PATCH',
      '/api/v1/payment-request',
      { payment_intent_id: paymentIntentId, brut_price: brutPrice },
      true
    );
  }

  createReservationRequest = async (data) => {
    return await API.send('POST', '/api/v1/driver/reservations/requests', data, true);
  };

  getUserFromId = async (id) => {
    const res = await API.send('GET', `/api/v1/user/${id}`, null, true);
    return res;
  };
}

const service = new Backend();
export default service;
