<template>
  <div class="content-main CreateMemberLevel-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}  <span>{{id}}</span></h1>
            </div>
            <div class="page-con1">
                <Alert type="warning" v-if="!security" show-icon>
                     此为危险等级
                    <template slot="desc"><a href="javascript:" @click="sheweiweixian(security)">设为安全等级</a></template>
                </Alert>
                <Alert type="success" v-if="security" show-icon>
                     此为安全等级
                    <template slot="desc">
                        <a href="javascript:" @click="sheweiweixian(security)">设为危险等级</a>
                    </template>
                </Alert>
                <Alert type="error" v-if="0" show-icon>
                     账户已删除
                </Alert>
            </div>
            <div class="blockquote">
                <ul>
                    <li>
                        <div>未限制单次存款额度 <span> </span> <Tooltip style="display:inline-block" content="公司入款的单次存款限额" placement="top"><Icon type="ios-help"></Icon> 说明 </Tooltip></div> 
                    </li>
                    <li>
                        <div>未限制单次存款额度 <span> </span> <Tooltip style="display:inline-block" content="线上存款的单次存款限额" placement="top"><Icon type="ios-help"></Icon> 说明 </Tooltip></div> 
                    </li>
                    <li><div>未限制单次存款额度 <span></span> </div></li>
                    <li><div>取款手续费：<span> </span></div></li>
                    <li><div>取款手续费收取方式：<span>免手续费</span> </div></li>
                    <li> <div>点卡支付手续费:</div> 
                        <table class="table" style="width:45%;text-align:center;">
                            <thead>
                                <tr>
                                    <th>是否启用</th>
                                    <th>费用比例</th>
                                    <th>手续费上限</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span><Button size="small"  type="error">停用</Button></span>
                                    </td>
                                    <td>
                                        <span>未设定</span>
                                    </td>
                                    <td>
                                        <span>未设定</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    <li><div>无设定公司入款优惠</div></li>
                    <li><div>无设定线上支付优惠</div></li>
                    <li><div>注册送彩金</div>
                        <table class="table" style="width:45%;text-align:center;">
                            <thead>
                                <tr>
                                    <th>是否启用</th>
                                    <th>管端新增</th>
                                    <th>赠送金额</th>
                                    <th>稽核金额</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span><Button size="small" type="error">停用</Button></span>
                                    </td>
                                    <td>
                                        <span>无</span>
                                    </td>
                                    <td>
                                        <span>0</span>
                                    </td>
                                    <td>
                                        <span>0</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    <li><div>快速充值目前状态为 <Tag color="blue">启用</Tag>，链接为 <a href="http://">http://</a></div></li>
                    <li><div>行政费用比為 0 %  <span> </span> <Tooltip style="display:inline-block" content="存款稽核没有通过时，行政费用的金额比例" placement="top"><Icon type="ios-help"></Icon> 说明 </Tooltip></div> </li>
                    <li><div>无可使用的公司入款帐户</div></li>
                    <li><div>无可使用的线上支付商户</div></li>
                    <li><div>目前尚无任何会员</div></li>
                    <li><div>目前尚无任何代理</div></li>
                    <li>
                        <div>备注</div>
                        <div><i-input :disabled="true" type="textarea" v-model="beizhu" :rows="4"></i-input></div>
                    </li>
                </ul>
                <div class="b_link">
                    <a href="javascript:" @click="$root.go_back">回上一页</a>
                    <router-link :to="{name:'MemberLevel'}">回到列表</router-link>
                    <router-link :to="{name:'MemberLevelCreate'}">新增</router-link>
                    <router-link :to="{name:'MemberLevelCreate'}">修改</router-link>
                    <a @click="shanchu">删除</a>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            id: '',
            security: true,
            beizhu: '无'
        };
    },
    created () {
        let routerParams = this.$route.params.id;
        this.id = routerParams;
    },
    methods: {
        sheweiweixian (i) {
            i ? (this.security = false) : (this.security = true);
        },
        shanchu () {
            this.$root.confirm({
                title: '删除',
                content: '<p>确定删除?</p>',
                onOk: () => {
                    this.$Message.success('删除成功！');
                    this.$router.push({name: 'MemberLevel'});
                }
            });
        }
    }
};
</script>
<style lang="less">
.blockquote {
  li {
    padding: 5px 0;
  }
  table {
    margin-top: 10px;
    th {
      background: #d3d3d3;
    }
  }
}
</style>
