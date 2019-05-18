import member from './member';
import agent from './agent';
import admin from './admin';
import finance from './finance';
import games from './games';
import lottery from './lottery';
import notification from './notification';
import payment from './payment';
import preferential from './preferential';
import common from './common';
import report from './report';
import system from './system';
import abandon from './abandon';
import Vue from 'vue';
import Resource from 'vue-resource';
import iView from 'iview';

Vue.use(iView);
Vue.use(Resource);

Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;

var baseUrl;
if (process.env.NODE_ENV === 'production') {
    // baseUrl = 'http://k0047.com/api'; // 正式环境
    baseUrl = '/api'; // 正式环境
} else if (process.env.NODE_ENV === 'test') {
    // baseUrl = 'http://tg-backend.lx861.com/api'; // 测试环境
    baseUrl = '/api'; // 测试环境
} else {
    baseUrl = '/api'; // 开发环境
}

Vue.http.interceptors.push(function (request, next) {
    // 功能标识，传参例子->isRules:'select'
    // select：查询
    // delete：删除
    // update：更新
    // insert：添加
    // show  ：隐藏和显示
    let isRules;
    if (request.body && request.body.isRules) {
        isRules = request.body.isRules;
    } else if (request.params && request.params.isRules) { // GET请求获取参数
        if (request.params.isRules) {
            isRules = request.params.isRules;
        }
    }
    this.$Loading.config({
        color: '#4ca3ff',
        failedColor: 'yellow',
        height: 2
    });

    iView.LoadingBar.start();
    // this.$root.btnLoading = true;
    if (this.$route.name !== 'login') {
        let token = JSON.parse(localStorage.getItem('AdminInfo')).token;
        if (token && !this.$root.isTokenExpired()) {
            request.headers.set('Authorization', token);
            request.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // 此处是增加的代码，设置请求头的类型
        } else {
            this.$store.commit('logout', this);
            this.$store.commit('clearOpenedSubmenu');
            this.$router.push({
                name: 'login'
            });
        }
    }
    next(function (response) {
        if (!response.ok && request.url !== baseUrl + '/admin/logout') {
            // debugger
            if (response.status === 300) { // 异地登录
                setTimeout(() => {
                    this.$Modal.error({
                        title: '异地登录',
                        content: `<h3>${response.body.message}</h3>`,
                        loading: false,
                        onOk: () => {
                            this.$root.Logout();
                        }
                    });
                }, 500);
            } else if (response.status === 304) { // 登录超时
                setTimeout(() => {
                    this.$Modal.error({
                        title: '登录超时',
                        content: '<h3>登录已超时，请重新登录。</h3>',
                        loading: false,
                        onOk: () => {
                            this.$store.commit('logout', this);
                            this.$router.push({
                                name: 'login'
                            });
                        }
                    });
                }, 500);
            } else if (response.status === 403) { // 无权限访问
                if (isRules) {
                    if (isRules === 'select') { // 页面跳转
                        this.$router.push({
                            name: 'error-403'
                        });
                    } else if (isRules === 'show') { // 显示
                        response.isShow = false;
                    }
                } else {
                    setTimeout(() => {
                        this.$Modal.error({
                            title: '无权限访问',
                            content: `<h3>${response.body.message}</h3>`,
                            loading: false,
                            onOk: () => {

                            }
                        });
                    }, 500);
                }
            } else if (response.status === 401) { // 用户未认证
                setTimeout(() => {
                    this.$Modal.error({
                        title: '用户未认证',
                        content: `<h3>${response.body.message}</h3>`,
                        loading: false,
                        onOk: () => {
                            this.$store.commit('logout', this);
                            this.$router.push({
                                name: 'login'
                            });
                        }
                    });
                }, 500);
            } else if (response.status === 400) {
                setTimeout(() => {
                    this.$Modal.error({
                        title: '错误提示',
                        content: `<h3>${response.body.message}</h3>`
                    });
                }, 500);
            } else { // 其他异常提示
                if (!response.body.message) return false;
                setTimeout(() => {
                    this.$Modal.error({
                        title: '错误提示',
                        content: `<h3>${response.body.message}</h3>`
                    });
                }, 500);
            }
            iView.LoadingBar.finish();
            // this.$root.btnLoading = false;
        } else {
            iView.LoadingBar.finish();
            this.$store.commit('lockTime', 0);
            // this.$root.btnLoading = false;
        }
        return response;
    });
});

export default {
    data () {
        return {
            HTTP_L: {
                ...member, // 会员
                ...agent, // 代理
                ...admin, // 管理员
                ...finance, // 资金部分
                ...games, // 游戏
                ...lottery, // 彩票
                ...notification, // 公告
                ...payment, // 支付
                ...preferential, // 优惠
                ...common, // 公共
                ...report, // 报表
                ...system, // 系统
                ...abandon // 废弃api
            },
            baseUrl: baseUrl
        };
    },
    computed: {
        adminIded () {
            if (Object.keys(this.$store.state.userinfo).length) {
                return this.$store.state.userinfo.adminId;
            }
        },
        adminuserinfo () {
            return this.$store.state.userinfo;
        }
    },
    methods: {
        HTTP_ALLLINKPOST (URL, DATA) {
            if (URL !== '/admin/rules/add' || URL !== '/admin/rules/update') {
                for (let key in DATA) {
                    if (typeof DATA[key] === 'string') {
                        if (DATA[key] === '') {
                            delete DATA[key];
                        }
                    } else if (Array.isArray(DATA[key])) {
                        if (DATA[key].length === 0) {
                            delete DATA[key];
                        }
                    } else if (DATA.constructor === Object) {
                        if (Object.keys(DATA).length === 0) {
                            delete DATA[key];
                        }
                    }
                }
            }
            return this.$http.post(baseUrl + URL, DATA);
        },
        HTTP_ALLLINKGET (URL, DATA) {
            if (URL !== '/admin/rules/add' || URL !== '/admin/rules/update') {
                for (let key in DATA) {
                    if (typeof DATA[key] === 'string') {
                        if (DATA[key] === '') {
                            delete DATA[key];
                        }
                    } else if (Array.isArray(DATA[key])) {
                        if (DATA[key].length === 0) {
                            delete DATA[key];
                        }
                    } else if (DATA.constructor === Object) {
                        if (Object.keys(DATA).length === 0) {
                            delete DATA[key];
                        }
                    }
                }
            }
            return this.$http.get(baseUrl + URL, {
                params: DATA
            });
        }
    }
};
