import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import tagsView from './modules/tagsView';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cssload: false,
        userinfo: {},
        lockTimeC: 0,
        msgList: {
            EmergencyFinance: [],
            Preferential: [],
            Deposit: [],
            Withdrawals: []
        },
        voiceType: null,
        logoutStatus: false,
        menuChangeTime: ''
    },
    mutations: {
        changeLogoutStatus(state, preload) {
            state.logoutStatus = preload;
        },
        addMsg(state, preload) {
            const { type, data } = preload;
            state.msgList[type].push(data);
            state.voiceType = type + new Date().getTime();
        },
        clearMsg(state, preload) {
            state.msgList = { ...preload };
        },
        JiaZaiDongHua(state, i) {
            if (i === 'true') {
                state.cssload = true;
            } else {
                state.cssload = false;
            }
        },
        userinfoupdate(state, i) {
            if (i) {
                state.userinfo = i;
            }
        },
        lockTime(state, i) {
            state.lockTimeC = i;
        },
        menuSortChange(state, preload) {
            state.menuChangeTime = preload;
        }
    },
    actions: {

    },
    modules: {
        app,
        tagsView,
        user
    }
});

export default store;
