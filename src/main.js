import Vue from "vue";
import {
    router
} from './router/index';
import {
    appRouter,
} from './router/router';
import store from './store';
import App from './app.vue';
import Cookies from "js-cookie";
import util from './libs/util';
import './javascript/moment';
import httpmixin from './api';
import 'iview/dist/styles/iview.css';

if (process.env.NODE_ENV === 'production') {
    Vue.config.devtools = false; // 正式环境
} else if (process.env.NODE_ENV === 'test') {
    Vue.config.devtools = false; // 测试环境
} else {
    Vue.config.devtools = true; // 开发环境
}

new Vue({
    el: '#app',
    router: router,
    mixins: [httpmixin],
    store: store,
    render: h => h(App),
    data: {
        currentPageName: '',
        btnLoading: false,
        Dtime: null,
        CanNotSelectDate: {
            disabledDate(date) {
                return (
                    date.valueOf() > Date.now() ||
                    date.valueOf() < Date.now() - 2592000000
                );
            }
        },
        AMMLevelData: {},
        menuItems: [],
        systemLogCount: null,
        systemLogCountShow: false,
        AllSiteNameList: [],
        staticsPathArr: [],
        Lottclass: [],
    },
    computed: {
        nowtime() {
            return this.$moment().format("LLL")
        },
        menuChangeTime() {
            return this.$store.state.menuChangeTime
        }
    },
    watch: {
        menuChangeTime(val, oldVal) {
            this.getNavItems();
        }
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    },
    created() {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
        this.init();
        // 测试接口
        // this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_GetRolePermissionsList)
    },
    methods: {
        TableDataSort(c, changeData) { //表格数据排序
            let order = "";
            if (c.order == "desc" || c.order == "asc") {
                this.$set(changeData, "key", c.key);
                this.$set(changeData, "value", c.order);
            } else {
                this.$delete(changeData, "key", c.key);
                this.$delete(changeData, "value", c.order);
            }
        },
        init() {
            if (!Object.keys(this.$store.state.userinfo).length) {
                let AdminInfo = JSON.parse(window.localStorage.getItem("AdminInfo"));
                if (AdminInfo) {
                    this.$store.commit("userinfoupdate", AdminInfo.basic);
                } else {
                    this.$store.commit("logout", this);
                    this.$router.push({
                        name: "login"
                    });
                }
            }
        },
        go_back() { //返回上一页
            this.$router.go(-1);
        },
        async LoginTrue(LoginData) {
            await this.$root
                .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Login, LoginData)
                .then(reslogin => {
                    this.$store.commit("JiaZaiDongHua", "true");
                    Cookies.set("adminUserName", LoginData.adminUserName);
                    Cookies.set("locking", 0);
                    this.$store.commit("JiaZaiDongHua", "false");
                    window.localStorage.setItem(
                        "AdminInfo",
                        JSON.stringify(reslogin.data.data)
                    );
                    this.$store.commit("userinfoupdate", reslogin.data.data.basic);

                })
        },
        isTokenExpired() {
            // 从localStorage中取出token过期时间
            let token = JSON.parse(localStorage.AdminInfo).token
            let obj = window.atob(token.substring(token.indexOf(".") + 1, token.lastIndexOf(".")))
            let expiredTime = JSON.parse(obj).exp
            // 获取本地时间
            let nowTime = new Date().getTime() / 1000
            // 如果 < 10分钟，则说明即将过期
            return (expiredTime - nowTime) < 10 * 60
        },
        Logout() { //退出方法
            this.$store.commit("changeLogoutStatus", true);
            this.$root.HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_GuanLiYuanTuiChu).then((res) => {
                this.$store.commit("logout", this);
                this.$store.commit("clearOpenedSubmenu");
                this.$router.push({
                    name: "login"
                });
                this.$root.modal("success", "", res.data.data);
            }).catch((res) => {
                this.$store.commit("logout", this);
                this.$store.commit("clearOpenedSubmenu");
                this.$router.push({
                    name: "login"
                });
            });
        },
        // 内容弹窗
        confirm(params) {
            this.$Modal.confirm(params);
        },
        modal(type, tit, template) {
            const title = tit || '提示';
            const content = template;
            switch (type) {
                case 'info':
                    this.$Modal.info({
                        title: title,
                        content: content
                    });
                    break;
                case 'success':
                    this.$Modal.success({
                        title: title,
                        content: content
                    });
                    break;
                case 'warning':
                    this.$Modal.warning({
                        title: title,
                        content: content
                    });
                    break;
                case 'error':
                    this.$Modal.error({
                        title: title,
                        content: content
                    });
                    break;
            }
        },
        getLottclass() { //获取彩票分类返点
            this.$root
                .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_Get_Lottclass, {
                    type: "site"
                })
                .then(res => {
                    this.Lottclass = res.data.data;
                })
        },
        getColumn() { //获取初始等级字段
            this.$root
                .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuDengJiChuShiZiDuan, {
                    isRules: "show"
                }) //isRules:"show"解决没有权限的时候会弹框的问题
                .then(res => {
                    let levelData = res.data.data;
                    this.AMMLevelData = res.data.data;
                    localStorage.setItem('AgencyLevelModel', JSON.stringify(levelData.AgencyLevelModel))
                    localStorage.setItem('MemberLevelModel', JSON.stringify(levelData.MemberLevelModel))
                    localStorage.setItem('MemberRefundLevelModel', JSON.stringify(levelData.MemberRefundLevelModel))
                })

        },
        getSiteList() { //全局获取站点列表
            this.AllSiteNameList = []
            this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZhanDianLieBiao).then(res => {
                if (this.$root.adminuserinfo.siteId == 0 || this.$root.adminuserinfo.siteId == "0") {
                    this.AllSiteNameList = res.data.data;
                } else {
                    this.$root.adminuserinfo.siteId.split(",").forEach(item => {
                        res.data.data.forEach(i => {
                            if (i.id == item) {
                                this.AllSiteNameList.push(i)
                            }
                        })
                    })
                }
                this.staticsPathArr = [];
                res.data.data.forEach(item => {
                    const {
                        siteConfig
                    } = item;
                    const {
                        statics
                    } = typeof siteConfig === "string"? JSON.parse(siteConfig): siteConfig;
                    let obj = {};
                    obj.siteId = item.id;
                    obj.path = statics;
                    this.staticsPathArr.push(obj);
                })
                localStorage.setItem('AllSiteNameList', JSON.stringify(this.AllSiteNameList));
            })
        },
        getNavItems() {
            this.$root.HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_GetMenusList).then(res => {
                /**
                 * @description 获取用户的权限菜单，在路由文件一一映射权限id
                 * 通过遍历路由数组找到对应的权限，用路由父级的path拼上子级的path，组装成路由的path路径，找到本地的模板文件
                 * 计算父级权限的子级权限显示的个数，用来动态设置下拉菜单的高度，超出显示滚动条
                 */
                // res.data.data.menu.forEach(me => {
                //     appRouter.forEach(app => {
                //         if (me.id === app.meta.id) {
                //             let count = 0;
                //             me.children.forEach(mCh => {
                //                 if (mCh.show === true) count++;
                //                 app.children.forEach(appCh => {
                //                     if (mCh.id === appCh.meta.id) {
                //                         mCh.path = app.path + '/' + appCh.path;
                //                     }
                //                 })
                //             })
                //             me.showCount = count;
                //         }
                //     })
                // })

                // 根据权限uri匹配
                res.data.data.menu.forEach(me => {
                    appRouter.forEach(app => {
                        let count = 0;
                        me.children.forEach(mCh => {
                            if (mCh.show === true) count++;
                            app.children.forEach(appCh => {
                                if (mCh.uri === appCh.meta.uri) {
                                    mCh.path = app.path + '/' + appCh.path;
                                }
                            })
                        })
                        me.showCount = count;
                    })
                })
                this.menuItems = res.data.data.menu;
            });
        },
        loading() {
            this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'load-c',
                                size: 18
                            }
                        }),
                        h('div', '加载中')
                    ])
                }
            });
        }
    }
});