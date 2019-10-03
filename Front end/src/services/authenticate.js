import Http from './Http';
const endpoint = 'Users';
export default {
    isAuth() {
        return Http.get(`${endpoint}/validate`)
    }
}