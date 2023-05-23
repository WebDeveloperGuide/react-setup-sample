import axios from "axios";
import Config from "config/config";

const baseURL = Config.API_URL;

const apiClient = (isFormData?: Boolean) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  if (isFormData) {
    Object.assign(headers, { "content-type": "multipart/form-data" });
  }
  return axios.create({
    baseURL,
    withCredentials: false,
    headers,
  });
};
export default apiClient;
