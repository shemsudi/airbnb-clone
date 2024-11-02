import api from "../configs/api.ts";

const setAuthToken = (token: any) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
