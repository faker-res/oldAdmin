<template>
    <div class="user_info">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">
                    后台管理中心操作简述
                    <span>说明</span>
                </h1>
            </div>
            <div class="page-con1">
                <div class="blockquote">
                    <ol>
                        <li>
                            顶部进度条加载成功并完成 才能对页面进行操作
                        </li>
                        <li>
                            表格内有带有蓝色的字体视为可点击或者有 Tip气泡提示
                        </li>
                        <li>
                            点击页面没有反应:可能是网速较慢，如果排除网速较慢的问题，则是页面报错,F5刷新 ---如果依然无法点击请联系技术人员解决
                        </li>
                        <li>提示：Too Many Attempts. 是页面请求频繁，请稍后点击</li>
                    </ol>
                </div>
            </div>
            <div class="page-header">
                <h1 class="binding">
                    {{$route.meta.title}}
                    <span>已有链接(详情不提供直接预览)</span>
                </h1>
            </div>
            <div class="page-con1">
                <div class="blockquote">
                    <ol>
                        <li v-for="(NavItem,index) in menuList" :key="index" trigger="click" style="margin-right: 30px">
                            <b :class="{'nav_active':$route.path.includes(NavItem.name)}" href="javascript:void(0)">
                                {{NavItem.title}}:
                            </b>
                            <router-link v-for="(NavChild,ix) in NavItem.children" :disabled="!NavChild.meta.isNav" :key="ix" :to="{ name: NavChild.name,query:{}}" exact-active-class='active'>{{NavChild.title}}</router-link>
                        </li>
                        <!-- <li>
                            <router-link :to="{name:'CreatAdmin'}">创建管理员</router-link>
                            <router-link :to="{name:'AdminList'}">管理员列表</router-link>
                            <router-link :to="{name:'DepositList'}">存款列表</router-link>
                            <router-link :to="{name:'PaymentList'}">在线支付列表</router-link>
                        </li>
                        <li>
                            <a href="#">创建代理</a>
                            <router-link :to="{name:'Agent'}">代理列表</router-link>
                            <router-link :to="{name:'AgentDomainList'}">代理域名列表</router-link>
                        </li>
                        <li>
                            <a href="#">创建会员</a>
                            <router-link :to="{name:'Member'}">会员列表</router-link>
                            <router-link :to="{name:'MemberCreate'}">创建会员</router-link>
                            <router-link :to="{name:'Member'}">会员中心</router-link>
                            <router-link :to="{name:'MemberBankList'}">会员银行卡列表</router-link>
                        </li>
                        <li>
                            <a href="#">彩种列表</a>
                        </li>
                        <li>
                            <a href="#">第三方游戏</a>
                        </li> -->
                    </ol>
                </div>
            </div>
            <div class="page-header">
                <h1 class="binding">
                    全部接口功能大汇总
                    <span>导航-列表-操作-详情</span>
                </h1>
            </div>
            <div class="page-con1">
                <div class="blockquote">
                    <ol>
                        <li>
                            <router-link :disabled="true" v-for="(i,v) in AllMenu" v-if="i.location == 'nav'" :key="v" :to="{name:'home_index'}">{{i.adminRuleName}}</router-link>
                        </li>
                        <li>
                            <router-link :disabled="true" v-for="(i,v) in AllMenu" v-if="i.location == 'menu'" :key="v" :to="{name:'home_index'}">{{i.adminRuleName}}</router-link>
                        </li>
                        <li>
                            <router-link :disabled="true" v-for="(i,v) in AllMenu" v-if="i.location == 'link'" :key="v" :to="{name:'home_index'}">{{i.adminRuleName}}</router-link>
                        </li>
                    </ol>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            AllMenu: []
        };
    },
    created () {
    // 模拟Socket测试使用  后期删除
        // setTimeout(() => {
        //     setInterval(() => {
        //         this.$root.HTTP_ALLLINKPOST('/v1/push', {
        //             group: 'system',
        //             ids: [1, 2, 3],
        //             type: 'deposit',
        //             message: '提现成功！',
        //             remark: 'asdfasdfsadfsadf'
        //         });
        //     }, 5000);
        // }, 5000);
        // this.$root.HTTP_ALLLINKPOST('/v1/push', {
        //     group: 'system',
        //     ids: [1, 2, 3],
        //     type: 'deposit',
        //     message: '提现成功！',
        //     remark: 'asdfasdfsadfsadf'
        // });
        let AdminInfo = JSON.parse(window.localStorage.getItem('AdminInfo'));
        if (AdminInfo) {
            this.AllMenu = AdminInfo.rules;
        }
    // 测试接口
    // this.$http.post('/api/games/gameList').then((res)=>{
    //     // console.log(res.data)
    // });

    //
    },
    computed: {
        menuList () {
            // debuggerdebugger
            return this.$store.state.app.menuList;
        }
    },
    methods: {}
};
</script>

<style lang="less" scoped>
li {
  margin: 5px;
  a {
    margin: 5px 0;
    display: inline-block;
  }
}
</style>
