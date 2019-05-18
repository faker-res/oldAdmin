import Cookies from 'js-cookie';

const user = {
    state: {},
    mutations: {
        logout (state, vm) {
            Cookies.remove('adminUserName');
            Cookies.remove('password');
            Cookies.remove('access');
            localStorage.clear();
        }
    }
};

export default user;
