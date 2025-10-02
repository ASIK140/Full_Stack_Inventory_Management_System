import axios from "axios";

export const generateBill = (payload) =>
  axios.post(`http://localhost:5500/api/v1/bill`, payload);
