import API from './Api';

class Backend {
  reqPhoneNumberOTP = async (phoneNumber) => {
    const res = await API.send('POST', '/api/v1/phone-number/request', { phoneNumber }, false);
    return res;
  };

  verifyPhoneNumberOTP = async (otp, phoneNumber) => {
    console.log({ phoneNumber });
    const res = await API.send(
      'POST',
      `/api/v1/phone-number/verify?otp=${otp}`,
      { phoneNumber },
      false
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

  submitPaymentBalance = async () => {
    const res = await API.send('POST', '/api/v1/payment/balance', null, true);
    return res;
  };

  async createStripePaymentIntent() {
    return await API.send('POST', '/api/v1/payment-request', null, true);
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
