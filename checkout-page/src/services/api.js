import axios from "axios";

const API_BASE = "http://localhost:8000/api/v1";

export const fetchOrderPublic = async (orderId) => {
  const res = await axios.get(`${API_BASE}/orders/${orderId}/public`);
  return res.data;
};

export const createPaymentPublic = async (payload) => {
  const res = await axios.post(`${API_BASE}/payments/public`, payload);
  return res.data;
};

export const getPayment = async (paymentId) => {
  const res = await axios.get(`${API_BASE}/payments/${paymentId}`);
  return res.data;
};