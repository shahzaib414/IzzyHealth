import Http from "./Http";

const endpoint = "Doctors";

export default {
  /**
   * Login
   * @param {Object} data object with email, password values
   * @return {Http} POST to /User/login
   */
  signin(data) {
    return Http.post(`${endpoint}/login`, data);
  },
};
