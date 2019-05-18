import Main from "@/template/Main.vue";

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: "/login",
    name: "login",
    meta: {
        title: "Login - 登录"
    },
    component: () =>
        import("@/template/login.vue")
};

export const page404 = {
    path: "/*",
    name: "error-404",
    meta: {
        title: "404-页面不存在"
    },
    component: () =>
        import("@/template/error-page/404.vue")
};

export const page403 = {
    path: "/403",
    meta: {
        title: "403-权限不足"
    },
    name: "error-403",
    component: () =>
        import("@/template/error-page/403.vue")
};

export const page500 = {
    path: "/500",
    meta: {
        title: "500-服务端错误"
    },
    name: "error-500",
    component: () =>
        import("@/template/error-page/500.vue")
};

export const locking = {
    path: "/locking",
    name: "locking",
    title: "锁定当前屏幕",
    meta: {
        title: "锁定当前屏幕"
    },
    component: () =>
        import("@/template/main-components/lockscreen/components/locking-page.vue")
};

export const CommonPageRouter = {
    path: "/CommonPageRouter",
    name: "CommonPageRouter",
    title: "公共页面",
    component: Main,
    children: [
        //     {
        //     path: "CreateMemberLevel",
        //     meta: {
        //         title: "会员等级管理-新增 "
        //     },
        //     name: "CreateMemberLevel",
        //     component: () =>
        //         import ("@/template/SystemManagement/components/CreateMemberLevel.vue")
        // }
    ]
}

export const UserSetingRouter = {
    path: "/UserSeting",
    name: "UserSeting",
    title: "用户设置",
    component: Main,
    children: [{
            path: "ChangePassword",
            meta: {
                title: "修改密码 "
            },
            name: "ChangePassword",
            component: () =>
                import("@/template/userseting/ChangePassword.vue")
        }, {
            path: "ChangeMobile",
            meta: {
                title: "修改手机号 "
            },
            name: "ChangeMobile",
            component: () =>
                import("@/template/userseting/ChangeMobile.vue")
        }, {

            path: "ChangeEmail",
            meta: {
                title: "变更电子邮箱 "
            },
            name: "ChangeEmail",
            component: () =>
                import("@/template/userseting/ChangeEmail.vue")
        }, {
            path: "AdminUserInfo",
            meta: {
                title: "用户信息 "
            },
            name: "AdminUserInfo",
            component: () =>
                import("@/template/userseting/AdminUserInfo.vue")
        },
        // {
        //     path: "ChangePassword",
        //     meta: {
        //         title: "修改密码 "
        //     },
        //     name: "ChangePassword",
        //     component: () =>
        //         import ("@/template/userseting/ChangePassword.vue")
        // }, 
    ]
};

// 作为Main组件的子页面展示但是不在菜单显示的路由写在otherRouter里

export const otherRouter = {
    path: "/",
    name: "Home",
    redirect: "/Home",
    component: Main,
    title: "系统首页",
    children: [{
        path: "Home",
        title: "首页",
        name: "home_index",
        meta: {
            title: "首页"
        },
        component: () =>
            import("@/template/Home/Home.vue")
    }, {
        path: "/AllLink",
        name: "AllLink",
        meta: {
            title: "全部链接"
        },
        title: "全部链接",
        component: () =>
            import("@/template/CommonPage/AllLink.vue")
    }]
};

const LocalNav = [{
        path: "/Members",
        name: "Members",
        meta: {
            id: 1,
            title: "会员管理",
        },
        component: Main,
        children: [{
                path: "Member",
                meta: {
                    title: "会员查询",
                    id: 2,
                },
                name: "Member",
                component: () =>
                    import("@/template/Member/MemberSearch.vue"),
            }, {
                path: "MemberCreate",
                meta: {
                    title: "添加会员",
                },
                name: "MemberCreate",
                component: () =>
                    import("@/template/Member/MemberCreate.vue")
            }, {
                path: "MemberUser",
                meta: {
                    title: "会员详情",
                },
                name: "MemberUser",
                component: () =>
                    import("@/template/Member/components/MemberUser.vue")
            },
            {
                path: "MemberLevel",
                meta: {
                    title: "会员等级",
                    id: 3,
                },
                name: "MemberLevel",
                component: () =>
                    import("@/template/Member/MemberLevel.vue")
            }, {
                path: "MemberLevelCreate",
                meta: {
                    title: "新增会员等级",
                },
                name: "MemberLevelCreate",
                component: () =>
                    import("@/template/Member/MemberLevelCreate.vue")
            },{
                path: "MemberLevelBatch",
                meta: {
                    title: "批量修改会员等级",
                },
                name: "MemberLevelBatch",
                component: () =>
                    import("@/template/Member/MemberLevelBatch.vue")
            },{

                path: "MemberLevelDetails",
                meta: {
                    title: "会员等级详情",
                },
                name: "MemberLevelDetails",
                component: () =>
                    import("@/template/Member/MemberLevelDetails.vue")
            },
            {
                path: "MemberLog",
                name: "MemberLog",
                meta: {
                    title: "会员日志",
                    id: 4,
                },
                component: () =>
                    import("@/template/Member/MemberLog.vue")
            },
            {
                path: "MemberLoginLog",
                name: "MemberLoginLog",
                meta: {
                    title: "会员登入日志",
                    id: 5,
                },
                component: () =>
                    import("@/template/Member/MemberLoginLog.vue")
            },
            {
                path: "MemberFundLog",
                name: "MemberFundLog",
                meta: {
                    title: "会员资金日志",
                    id: 6,
                },
                component: () =>
                    import("@/template/Member/MemberFundLog.vue")
            },
            {
                path: "MemberBonusList",
                name: "MemberBonusList",
                meta: {
                    title: "返水等级管理",
                    id: 7,
                },
                component: () =>
                    import("@/template/Member/MemberBonusList.vue")
            }, {
                path: "MemberBounsCreate",
                name: "MemberBounsCreate",
                meta: {
                    title: "新增返水等级",
                },
                component: () =>
                    import("@/template/Member/MemberBounsCreate.vue")
            }, {
                path: "MemberBounsDetails",
                name: "MemberBounsDetails",
                meta: {
                    title: "返水等级详情",
                },
                component: () =>
                    import("@/template/Member/MemberBounsDetails.vue")
            },
            {
                path: "MemberBankList",
                name: "MemberBankList",
                meta: {
                    title: "银行卡管理",
                    id: 8,
                },
                component: () =>
                    import("@/template/Member/MemberBankList.vue")
            }, {
                path: "MemberBankDetails",
                name: "MemberBankDetails",
                meta: {
                    title: "会员银行卡详情",
                },
                component: () =>
                    import("@/template/Member/MemberBankDetails.vue")
            },
            {
                path: "MemberBankAccountCreate",
                name: "MemberBankAccountCreate",
                meta: {
                    title: "新增会员银行卡",
                },
                component: () =>
                    import("@/template/Member/MemberBankAccountCreate.vue")
            }
        ]
    }, {
        path: "/AccountingManagement",
        icon: "AccountingManagement",
        name: "AccountingManagement",
        meta: {
            id: 9,
            title: "账务管理",
        },
        component: Main,
        children: [{
                path: "OnLineDepositList",
                name: "OnLineDepositList",
                meta: {
                    title: "在线支付",
                    id: 10,
                },
                component: () =>
                    import("@/template/AccountingManagement/OnLineDepositList.vue")
            },
            {
                path: "CompanyDepositList",
                name: "CompanyDepositList",
                meta: {
                    title: "公司入款",
                    id: 11,
                },
                component: () =>
                    import("@/template/AccountingManagement/CompanyDepositList.vue")
            },
            {
                path: "WithdrawalsList",
                name: "WithdrawalsList",
                meta: {
                    title: "提款管理",
                    id: 12,
                },
                component: () =>
                    import("@/template/AccountingManagement/WithdrawalsList.vue")
            },
            {
                path: "PaymentClass",
                meta: {
                    title: "支付分组",
                    id: 13,
                },
                name: "PaymentClass",
                component: () =>
                    import("@/template/AccountingManagement/PaymentClass.vue")
            },
            {
                path: "EmergencyList",
                meta: {
                    title: "催账记录",
                    id: 14,
                },
                name: "EmergencyList",
                component: () =>
                    import("@/template/AccountingManagement/EmergencyList.vue")
            },
            {
                path: "SystemInPaymentCard",
                meta: {
                    title: "入款卡管理",
                    id: 15,
                },
                name: "SystemInPaymentCard",
                component: () =>
                    import("@/template/AccountingManagement/SystemInPaymentCard.vue")
            }, {
                path: "SystemInPaymentCardCreat",
                meta: {
                    title: "新增入款卡",
                },
                name: "SystemInPaymentCardCreat",
                component: () =>
                    import("@/template/AccountingManagement/SystemInPaymentCardCreat.vue")
            },
            {
                path: "SystemInPaymentCardDetails",
                meta: {
                    title: "入款卡详情",
                },
                name: "SystemInPaymentCardDetails",
                component: () =>
                    import("@/template/AccountingManagement/SystemInPaymentCardDetails.vue")
            },
            {
                path: "PreferentialReceive",
                meta: {
                    title: "优惠领取记录",
                    id: 16,
                },
                name: "PreferentialReceive",
                component: () =>
                    import("@/template/AccountingManagement/PreferentialReceive.vue")
            },
            {
                path: "FinanceSummary",
                meta: {
                    title: "存取款总汇",
                    id: 17,
                },
                name: "FinanceSummary",
                component: () =>
                    import("@/template/AccountingManagement/FinanceSummary.vue")
            },
            {
                path: "PaymentQRCodeList",
                meta: {
                    title: "二维码支付",
                    id: 18,
                },
                name: "PaymentQRCodeList",
                component: () =>
                    import("@/template/AccountingManagement/PaymentQRCodeList.vue")
            },
            {
                path: "PaymentQRCodeCreate",
                meta: {
                    title: "新增二维码支付",
                },
                name: "PaymentQRCodeCreate",
                component: () =>
                    import("@/template/AccountingManagement/PaymentQRCodeCreate.vue")
            },
            {
                path: "GamesTransfer",
                meta: {
                    title: "第三方游戏转账记录",
                    id: 19,
                },
                name: "GamesTransfer",
                component: () =>
                    import("@/template/AccountingManagement/GamesTransfer.vue")
            },
            {
                path: "PaymentListNew",
                name: "PaymentListNew",
                meta: {
                    title: "支付管理(新)",
                    id: 20,
                },
                component: () =>
                    import("@/template/AccountingManagement/PaymentListNew.vue")
            }, {
                path: "PaymentDetails",
                name: "PaymentDetails",
                meta: {
                    title: "在线支付账号详情",
                },
                component: () =>
                    import("@/template/AccountingManagement/PaymentDetails.vue")
            }, {
                path: "PaymentDetailsNew",
                name: "PaymentDetailsNew",
                meta: {
                    title: "在线支付账号详情",
                },
                component: () =>
                    import("@/template/AccountingManagement/PaymentDetailsNew.vue")
            },
            {
                path: "PaymentCreate",
                meta: {
                    title: "新增支付账号",
                },
                name: "PaymentCreate",
                component: () =>
                    import("@/template/AccountingManagement/PaymentCreate.vue")
            },
            {
                path: "PaymentCreateNew",
                meta: {
                    title: "新增支付账号",
                },
                name: "PaymentCreateNew",
                component: () =>
                    import("@/template/AccountingManagement/PaymentCreateNew.vue")
            },
            {
                path: "PaymentClassCreate",
                meta: {
                    title: "新增支付分组",
                },
                name: "PaymentClassCreate",
                component: () =>
                    import("@/template/AccountingManagement/PaymentClassCreate.vue")
            },
            {
                path: "PaymentClassDetails",
                meta: {
                    title: "支付分组详情",
                },
                name: "PaymentClassDetails",
                component: () =>
                    import("@/template/AccountingManagement/PaymentClassDetails.vue")
            },
            {
                path: "FinanceTrend",
                meta: {
                    title: "会员资金走向",
                },
                title: "会员资金走向",
                name: "FinanceTrend",
                component: () =>
                    import("@/template/AccountingManagement/FinanceTrend.vue")
            },
        ]
    }, {
        path: "/Agent",
        name: "Agent",
        component: Main,
        meta: {
            id: 21,
            title: "代理管理",
        },
        component: Main,
        children: [{
                path: "AgentSearch",
                meta: {
                    title: "代理查询",
                    id: 22,
                },
                name: "AgentSearch",
                component: () =>
                    import("@/template/Agent/AgentSearch.vue")
            }, {
                path: "AgentCreate",
                meta: {
                    title: "新增代理",
                    id: 23,
                },
                name: "AgentCreate",
                component: () =>
                    import("@/template/Agent/AgentCreate.vue")
            },
            {
                path: "AgentUser",
                meta: {
                    title: "代理详情",
                },
                name: "AgentUser",
                component: () =>
                    import("@/template/Agent/components/AgentUser.vue")
            },
            {
                path: "AgentDomainList",
                meta: {
                    title: "代理域名",
                    id: 24,
                },
                name: "AgentDomainList",
                component: () =>
                    import("@/template/Agent/AgentDomainList.vue")
            }, {
                path: "AgentDomainDetails",
                meta: {
                    title: "代理域名详情",
                },
                name: "AgentDomainDetails",
                component: () =>
                    import("@/template/Agent/AgentDomainDetails.vue")
            },
            {
                path: "AgentDomainCreate",
                meta: {
                    title: "新增代理域名",
                },
                name: "AgentDomainCreate",
                component: () =>
                    import("@/template/Agent/AgentDomainCreate.vue")
            },
            {
                path: "AgentLevel",
                meta: {
                    title: "代理等级",
                    id: 25,
                },
                name: "AgentLevel",
                component: () =>
                    import("@/template/Agent/AgentLevel.vue")
            }, {
                path: "AgentLevelCreate",
                meta: {
                    title: "新增代理等级",
                },
                name: "AgentLevelCreate",
                component: () =>
                    import("@/template/Agent/AgentLevelCreate.vue")
            },
            {
                path: "AgentLevelDetails",
                meta: {
                    title: "代理等级详情",
                },
                name: "AgentLevelDetails",
                component: () =>
                    import("@/template/Agent/AgentLevelDetails.vue")
            },
            {
                path: "AgentLog",
                meta: {
                    title: "代理行为日志",
                    id: 26,
                },
                name: "AgentLog",
                component: () =>
                    import("@/template/Agent/AgentLog.vue")
            },
            {
                path: "AgentFundLog",
                meta: {
                    title: "代理资金日志",
                    id: 27,
                },
                name: "AgentFundLog",
                component: () =>
                    import("@/template/Agent/AgentFundLog.vue")
            },
            {
                path: "AgentSettleAccount",
                meta: {
                    title: "代理分红结算",
                    id: 28,
                },
                name: "AgentSettleAccount",
                component: () =>
                    import("@/template/Agent/AgentSettleAccount.vue")
            },
            {
                path: "AgentTree",
                meta: {
                    title: "团队架构",
                },
                name: "AgentTree",
                component: () =>
                    import("@/template/Agent/AgentTree.vue")
            },
        ]
    }, {
        path: "/SystemManagement",
        name: "SystemManagement",
        component: Main,
        meta: {
            id: 33,
            title: "系统配置",
        },
        children: [{
                path: "AdminList",
                name: "AdminList",
                meta: {
                    title: "管理员列表",
                    id: 34,
                },
                component: () =>
                    import("@/template/CommonPage/AdminList.vue")
            },
            {
                path: "AdminCreate",
                name: "AdminCreate",
                meta: {
                    title: "新增管理员",
                },
                component: () =>
                    import("@/template/CommonPage/AdminCreate.vue")
            }, {
                path: "AdminDetails",
                name: "AdminDetails",
                meta: {
                    title: "管理员详情",
                },
                component: () =>
                    import("@/template/CommonPage/AdminDetails.vue")
            },
            // {
            //     path: "AdminGroupsList",
            //     meta: {
            //         title: "管理员分组",
            //         id: 35,
            //     },
            //     name: "AdminGroupsList",
            //     component: () =>
            //         import("@/template/CommonPage/AdminGroupsList.vue")
            // }, {
            //     path: "AdminGroupCreat",
            //     meta: {
            //         title: "新增管理员组",
            //     },
            //     name: "AdminGroupCreat",
            //     component: () =>
            //         import("@/template/CommonPage/AdminGroupCreat.vue")
            // }, {
            //     path: "AdminGroupDetails",
            //     meta: {
            //         title: "管理员组详情",
            //     },
            //     name: "AdminGroupDetails",
            //     component: () =>
            //         import("@/template/CommonPage/AdminGroupDetails.vue")
            // },
            // {
            //     path: "AdminRule",
            //     name: "AdminRule",
            //     meta: {
            //         title: "管理员权限",
            //         id: 36,
            //     },
            //     component: () =>
            //         import("@/template/CommonPage/AdminRule.vue")
            // },
            // {
            //     path: "AdminRuleCreate",
            //     name: "AdminRuleCreate",
            //     meta: {
            //         title: "新增管理员权限",
            //     },
            //     component: () =>
            //         import("@/template/CommonPage/AdminRuleCreate.vue")
            // },
            // {
            //     path: "AdminRuleDetail",
            //     name: "AdminRuleDetail",
            //     meta: {
            //         title: "管理员权限详情",
            //     },
            //     component: () =>
            //         import("@/template/CommonPage/AdminRuleDetail.vue")
            // },
            {
                path: "AdminLog",
                name: "AdminLog",
                meta: {
                    title: "管理员操作日志",
                    id: 37,
                },
                component: () =>
                    import("@/template/CommonPage/AdminLog.vue")
            },
            {
                path: "GamesClassManger",
                meta: {
                    title: "游戏分类",
                    id: 38,
                },
                name: "GamesClassManger",
                component: () =>
                    import("@/template/GamesManagement/GamesClassManger.vue")
            },
            {
                path: "GamesClassDetail",
                meta: {
                    title: "游戏分类详情",
                },
                name: "GamesClassDetail",
                component: () =>
                    import("@/template/GamesManagement/GamesClassDetail.vue")
            },
            {
                path: "CreateGamesClass",
                meta: {
                    title: "新增游戏分类",
                },
                name: "CreateGamesClass",
                component: () =>
                    import("@/template/GamesManagement/CreateGamesClass.vue")
            },
            {
                path: "GamesManger",
                meta: {
                    title: "游戏管理",
                    id: 39,
                },
                name: "GamesManger",
                component: () =>
                    import("@/template/GamesManagement/GamesManger.vue")
            },
            {
                path: "CreateGame",
                meta: {
                    title: "新增游戏",
                },
                name: "CreateGame",
                component: () =>
                    import("@/template/GamesManagement/CreateGame.vue")
            },
            {
                path: "GamesDetail",
                meta: {
                    title: "游戏详情",
                },
                name: "GamesDetail",
                component: () =>
                    import("@/template/GamesManagement/GamesDetail.vue")
            },
            {
                path: "WebSiteList",
                meta: {
                    title: "站点管理",
                    id: 40,
                },
                name: "WebSiteList",
                component: () =>
                    import("@/template/SystemManagement/WebSiteList.vue")
            }, {
                path: "WebSiteCreate",
                meta: {
                    title: "新增站点",
                },
                name: "WebSiteCreate",
                component: () =>
                    import("@/template/SystemManagement/WebSiteCreate.vue")
            },
            {
                path: "WebSiteDetails",
                meta: {
                    title: "站点详情",
                },
                name: "WebSiteDetails",
                component: () =>
                    import("@/template/SystemManagement/WebSiteDetails.vue")
            },
            {
                path: "SiteMail",
                meta: {
                    title: "站内信",
                    id: 41,
                },
                name: "SiteMail",
                component: () =>
                    import("@/template/SystemManagement/SiteMail.vue")
            },
            {
                path: "SiteMailSend",
                meta: {
                    title: "站内信-发信",
                },
                name: "SiteMailSend",
                component: () =>
                    import("@/template/SystemManagement/components/SiteMailSend.vue")
            },
            {
                path: "PreferentialClass",
                meta: {
                    title: "优惠分组",
                    id: 42,
                },
                name: "PreferentialClass",
                component: () =>
                    import("@/template/SystemManagement/PreferentialClass.vue")
            },
            {
                path: "PreferentialClassCreat",
                meta: {
                    title: "新增优惠分组",
                },
                name: "PreferentialClassCreat",
                component: () =>
                    import("@/template/SystemManagement/PreferentialClassCreat.vue")
            }, {
                path: "PreferentialClassDetails",
                meta: {
                    title: "优惠分组详情",
                },
                name: "PreferentialClassDetails",
                component: () =>
                    import("@/template/SystemManagement/PreferentialClassDetails.vue")
            },
            // {
            //     path: "PreferentialList",
            //     meta: {
            //         title: "优惠管理",
            //     },
            //     name: "PreferentialList",
            //     component: () =>
            //         import("@/template/SystemManagement/PreferentialList.vue")
            // },
            // {
            //     path: "PreferentialCreat",
            //     meta: {
            //         title: "优惠新增",
            //     }, 
            //     name: "PreferentialCreat",
            //     component: () =>
            //         import("@/template/SystemManagement/PreferentialCreat.vue")
            // }, {

            //     path: "PreferentialDetails",
            //     meta: {
            //         title: "优惠详情",
            //     },
            //     name: "PreferentialDetails",
            //     component: () =>
            //         import("@/template/SystemManagement/PreferentialDetails.vue")
            // },
            {
                path: "SystemConfigList",
                meta: {
                    title: "系统预设",
                    id: 43,
                },
                name: "SystemConfigList",
                component: () =>
                    import("@/template/SystemManagement/SystemConfigList.vue")
            },
            {
                path: "SystemConfigDetail",
                meta: {
                    title: "系统预设详情",
                },
                name: "SystemConfigDetail",
                component: () =>
                    import("@/template/SystemManagement/SystemConfigDetail.vue")
            },
            {
                path: "SystemConfigCreate",
                meta: {
                    title: "新增系统预设",
                },
                name: "SystemConfigCreate",
                component: () =>
                    import("@/template/SystemManagement/SystemConfigCreate.vue")
            },
            {
                path: "CommonLevelCreate",
                meta: {
                    title: "创建公共等级",
                },
                name: "CommonLevelCreate",
                component: () =>
                    import("@/template/SystemManagement/CommonLevelCreate.vue")
            },
            {
                path: "SystemLog",
                meta: {
                    title: "系统日志",
                    id: 44,
                },
                name: "SystemLog",
                component: () =>
                    import("@/template/SystemManagement/SystemLog.vue")
            },
            {
                path: "CacheManger",
                meta: {
                    title: "缓存管理",
                    id: 45,
                },
                title: "缓存管理",
                name: "CacheManger",
                component: () =>
                    import("@/template/SystemManagement/CacheManger.vue")
            },
            {
                path: "IpLimit",
                meta: {
                    title: "黑名单管理",
                    id: 46,
                },
                name: "IpLimit",
                component: () =>
                    import("@/template/SystemManagement/IpLimit.vue")
            },
            {
                path: "Notification",
                meta: {
                    title: "信息中心 ",
                    id: 47
                },
                name: "Notification",
                component: () =>
                    import("@/template/SystemManagement/Notification.vue")
            }, {

                path: "SendNotification",
                meta: {
                    title: "信息发送 "
                },
                name: "SendNotification",
                component: () =>
                    import("@/template/SystemManagement/SendNotification.vue")
            },
            {
                path: "SystemGame",
                meta: {
                    title: "站点游戏显示管理",
                    id: 48
                },
                name: "SystemGame",
                component: () =>
                    import("@/template/SystemManagement/SystemGame.vue")
            },
            {
                path: "PreferentialSetting",
                meta: {
                    title: "优惠模板参数列表",
                    id: 49
                },
                name: "PreferentialSetting",
                component: () =>
                    import("@/template/SystemManagement/PreferentialSetting.vue")
            },
            {
                path: "PreferentialSettingCreat",
                meta: {
                    title: "创建优惠模板",
                },
                name: "PreferentialSettingCreat",
                component: () =>
                    import("@/template/SystemManagement/PreferentialSettingCreat.vue")
            },
            {
                path: "GameStatus",
                meta: {
                    title: "游戏状态维护",
                    id: 50
                },
                name: "GameStatus",
                component: () =>
                    import("@/template/SystemManagement/GameStatus.vue")
            },
            {
                path: "FilesList",
                meta: {
                    title: "图片库",
                    id: 51
                },
                name: "FilesList",
                component: () =>
                    import("@/template/SystemManagement/FilesList.vue")
            },
            {
                path: "CarouselList",
                meta: {
                    title: "轮播管理",
                    id: 52
                },
                name: "CarouselList",
                component: () =>
                    import("@/template/SystemManagement/CarouselList.vue")
            },
            {
                path: "CarouselCreate",
                meta: {
                    title: "修改轮播",
                },
                name: "CarouselCreate",
                component: () =>
                    import("@/template/SystemManagement/CarouselCreate.vue")
            },

            {
                path: "RolePermissionsList",
                name: "RolePermissionsList",
                meta: {
                    title: "角色管理",
                    id: 261,
                },
                component: () =>
                    import("@/template/CommonPage/RolePermissionsList.vue")
            },
            {
                path: "RoleCreate",
                name: "RoleCreate",
                meta: {
                    title: "创建角色",
                },
                component: () =>
                    import("@/template/CommonPage/RoleCreate.vue")
            },
            {
                path: "RulesList",
                name: "RulesList",
                meta: {
                    title: "菜单管理",
                    id: 263,
                },
                component: () =>
                    import("@/template/CommonPage/RulesList.vue")
            },
            {
                path: "RuleCreate",
                name: "RuleCreate",
                meta: {
                    title: "创建权限",
                },
                component: () =>
                    import("@/template/CommonPage/RuleCreate.vue")
            },
            //  {
            //     path: "GamesPlatformList",
            //     meta: {
            //         title: "第三方游戏管理",
            //     },
            //     title: "第三方游戏管理",
            //     name: "GamesPlatformList",
            //     component: () =>
            //         import ("@/template/GamesManagement/GamesPlatformList.vue")
            // },
            // {

            //     path: "GamesPlatformDetails",
            //     meta: {
            //         title: "第三方游戏详情",
            //     },
            //     name: "GamesPlatformDetails",
            //     component: () =>
            //         import ("@/template/GamesManagement/GamesPlatformDetails.vue")
            // },
            // {
            //     path: "GamesGameList",
            //     meta: {
            //         title: "电子游戏管理",
            //     },
            //     name: "GamesGameList",
            //     component: () =>
            //         import ("@/template/GamesManagement/GamesGameList.vue")
            // }, 
            // {

            //     path: "Statistics",
            //     meta: {
            //         title: "统计报表",
            //     },
            //     name: "Statistics",
            //     component: () =>
            //         import ("@/template/Reports/Statistics.vue")
            // }, {
            //     path: "BetRecordHistory",
            //     meta: {
            //         title: "历史投注记录查询",
            //     },
            //     name: "BetRecordHistory",
            //     component: () =>
            //         import ("@/template/Reports/BetRecordHistory.vue")
            // },
        ]
    },
    {
        path: "/Reports",
        name: "Reports",
        meta: {
            id: 53,
            title: "报表管理"
        },
        component: Main,
        children: [{
                path: "GeneralReports",
                meta: {
                    title: "总报表",
                    id: 54,
                },
                name: "GeneralReports",
                component: () =>
                    import("@/template/Reports/GeneralReports.vue"),
            },
            {
                path: "GamesRecords",
                meta: {
                    title: "游戏记录",
                    id: 55,
                },
                name: "GamesRecords",
                component: () =>
                    import("@/template/Reports/GamesRecords.vue")
            },
            {
                path: "FinanceFirst",
                meta: {
                    title: "首存报表",
                    id: 56,
                },
                name: "FinanceFirst",
                component: () =>
                    import("@/template/Reports/FinanceFirst.vue")
            },
            {
                path: "ThirdGameReports",
                meta: {
                    title: "平台报表",
                    id: 57,
                },
                name: "ThirdGameReports",
                component: () =>
                    import("@/template/Reports/ThirdGameReports.vue")
            },
            {
                path: "ThirdGameReportsDetail",
                meta: {
                    title: "平台报表详情",
                },
                name: "ThirdGameReportsDetail",
                component: () =>
                    import("@/template/Reports/ThirdGameReportsDetail.vue")
            },
            {
                path: "LotteryReports",
                meta: {
                    title: "彩票报表",
                    id: 58,
                },
                name: "LotteryReports",
                component: () =>
                    import("@/template/Reports/LotteryReports.vue")
            },
            {
                path: "LotteryReportsDetail",
                meta: {
                    title: "彩票报表详情",
                },
                name: "LotteryReportsDetail",
                component: () =>
                    import("@/template/Reports/LotteryReportsDetail.vue")
            },
            {
                path: "MemberReports",
                meta: {
                    title: "会员报表",
                    id: 59,
                },
                name: "MemberReports",
                component: () =>
                    import("@/template/Reports/MemberReports.vue")
            },
            {
                path: "TotalReports",
                meta: {
                    title: "综合报表",
                    id: 60,
                },
                name: "TotalReports",
                component: () =>
                    import("@/template/Reports/TotalReports.vue")
            },
            {
                path: "AgencyReports",
                meta: {
                    title: "代理报表",
                    id: 398,
                },
                name: "AgencyReports",
                component: () =>
                    import("@/template/Reports/AgencyReports.vue")
            },
        ]
    },
    {
        path: "/LotteryManager",
        name: "LotteryManager",
        meta: {
            id: 73,
            title: "彩票管理",
        },
        component: Main,
        children: [{
                path: "QuicklyLottery",
                meta: {
                    title: "快速彩票",
                    id: 74,
                },
                name: "QuicklyLottery",
                component: () =>
                    import("@/template/LotteryManager/QuicklyLottery.vue"),
            },
            {
                path: "QuicklyLotteryBlackList",
                meta: {
                    title: "快速彩票黑名单管理",
                    id: 388
                },
                name: "QuicklyLotteryBlackList",
                component: () =>
                    import("@/template/LotteryManager/QuicklyLotteryBlackList.vue")
            },
            { 
                path: "OddsSetting",
                meta: {
                    title: "赔率设置",
                    id: 75,
                },
                name: "OddsSetting",
                component: () =>
                    import("@/template/LotteryManager/OddsSetting.vue")
            },
            {
                path: "TimeSetting",
                meta: {
                    title: "时间设置",
                    id: 76,
                },
                name: "TimeSetting",
                component: () =>
                    import("@/template/LotteryManager/TimeSetting.vue")
            },
            {
                path: "LotteryWinSetting",
                meta: {
                    title: "开奖设置",
                    id: 77,
                },
                name: "LotteryWinSetting",
                component: () =>
                    import("@/template/LotteryManager/LotteryWinSetting.vue")
            },
            {
                path: "LotteryWinDetail",
                meta: {
                    title: "开奖详情",
                },
                name: "LotteryWinDetail",
                component: () =>
                    import("@/template/LotteryManager/LotteryWinDetail.vue")
            },
            {
                path: "NoPrizesList",
                meta: {
                    title: "未开奖列表",
                    id: 78,
                },
                name: "NoPrizesList",
                component: () =>
                    import("@/template/LotteryManager/NoPrizesList.vue")
            },
            {
                path: "UpdateLotteryTime",
                name: "UpdateLotteryTime",
                meta: {
                    title: "彩票时间设置",
                },
                component: () =>
                    import("@/template/LotteryManager/UpdateLotteryTime.vue")
            }, {
                path: "UpdateLotteryOdds",
                name: "UpdateLotteryOdds",
                meta: {
                    title: "彩票赔率设置",
                },
                component: () =>
                    import("@/template/LotteryManager/UpdateLotteryOdds.vue")
            },
        ]
    }
];

export const appRouter = LocalNav;

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    CommonPageRouter,
    UserSetingRouter,
    loginRouter,
    otherRouter,
    // preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];