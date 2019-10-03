import Http from './Http';

const endpoint = 'Users';
const notificationEndpoint = 'Notifications';

export default {
  /**
    * Login
    * @param {Object} data object with email, password values
    * @return {Http} POST to /User/login
    */
  signin(data) {
    return Http.post(`${endpoint}/login`, data);
  },

  signup(data) {
    return Http.post(`${endpoint}/sign-up`, data);
  },

  createCase(data){
    return Http.post(`${endpoint}/create-case`, data);
  },
  getCaseCount(){
    return Http.get(`${endpoint}/get-case-count`)
  },
  getNotifications(params){
    return Http.get(`${notificationEndpoint}/get-notification-for-patient`, { params })
  },
  getCaseList (params) {
    return Http.get(`${endpoint}/get-case-list`, {params})
  },
  getProfile() {
    return Http.get(`${endpoint}/profile`);
  },
  updatePersonalDetail(data) {
    return Http.post(`${endpoint}/update-personal-detail`, data);
  },
  updateAdditionalDetails(data) {
    return Http.post(`${endpoint}/update-additional-detail`, data);
  },
  updateHealthGoals(data) {
    return Http.post(`${endpoint}/update-healtGoals`, data);
  },
  getConversationList(params) {
    return Http.get(`${endpoint}/conversation-list`, { params });
  },
  searchCaseByQuery (params){
    return Http.get(`${endpoint}/search-case`, {params});
  },
  getCareTeamDoctors(params) {
    return Http.get(`${endpoint}/get-doctors-by-careteam`, { params });
  },
  getPrescription() {
    return Http.get(`${endpoint}/get-prescription`)
  },
  getPrescriptionModal(params) {
    return Http.get(`${endpoint}/getprescription-modal`, {params});
  }
};
