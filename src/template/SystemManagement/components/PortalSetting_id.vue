<template>
  <div class="content-main CreateMemberLevel-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}  <span>{{id}}</span></h1>
            </div>
            <div class="blockquote">
                <ul>
                    <li>
                        <div>设定名称为  <span>{{id}}</span> </div> 
                    </li>
                    <li>
                        <div style="margin-bottom:10px;">跑马灯内容如下 
                            <a v-show="paomadengxiugai" @click = "xiugaibeizhu">修改</a>  
                            <a v-show="!paomadengxiugai" @click = "quxiaoxiugaibeizhu">取消</a>  
                            <a v-show="!paomadengxiugai" @click = "baocunxiugaibeizhu">保存</a>  
                        </div> 
                        <div><i-input :disabled="paomadengxiugai" type="textarea" v-model="paomadeng" :rows="4"></i-input></div>

                    </li>
                    <li>
                        <div style="margin-bottom:10px;">会员注册设定  
                            <a v-show="!huiyaunzhucexiugai" @click = "xghyzc">修改</a>  
                            <a v-show="huiyaunzhucexiugai" @click = "qxxghyzc">取消</a>  
                            <a v-show="huiyaunzhucexiugai" @click = "bcxghyzc">保存</a>  
                            <span v-show="huiyaunzhucexiugai" style="float:right;color:red"> 请注意, 修改完成后将于 <Tag color="red">1小时</Tag> 内生效</span>
                        </div> 
                        <div>
                            <table style="width:100%;text-align:center" class="table table-bordered">
                                <thead>
                                    <tr class="active">
                                        <th>栏位</th>
                                        <th >显示</th>
                                        <th >必填</th>
                                        <th class="text-center">
                                            <Tooltip content="是否不允许注册相同资料">
                                                <Tag color="blue">唯一</Tag>
                                            </Tooltip>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr>
                                        <td>姓名</td>
                                        <td>
                                            <Checkbox v-show="huiyaunzhucexiugai" v-model="RegisterSetting.IsShow_Name"></Checkbox> 
                                            <Icon v-show="RegisterSetting.IsShow_Name === true" type="checkmark"></Icon>
                                            <Icon v-show="RegisterSetting.IsShow_Name === undefined" type="close"></Icon>
                                        </td>
                                        <td>
                                            <Checkbox v-show="huiyaunzhucexiugai" v-model="RegisterSetting.IsRequired_Name"></Checkbox> 
                                            <Icon v-show="RegisterSetting.IsRequired_Name === true" type="checkmark"></Icon>
                                            <Icon v-show="RegisterSetting.IsRequired_Name === undefined" type="close"></Icon>
                                        </td>
                                        <td>
                                            <Checkbox v-show="huiyaunzhucexiugai" v-model="RegisterSetting.IsCheckDuplicated_Name"> </Checkbox>
                                            <Icon v-show="RegisterSetting.IsCheckDuplicated_Name === true" type="checkmark"></Icon>
                                            <Icon v-show="RegisterSetting.IsCheckDuplicated_Name === undefined" type="close"></Icon>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>

                    <li>
                        <div style="margin-bottom:10px;">代理注册设定  
                            <a v-show="!dailizhucexiugai" @click = "xgdlzc">修改</a>  
                            <a v-show="dailizhucexiugai" @click = "qxxgdlzc">取消</a>  
                            <a v-show="dailizhucexiugai" @click = "bcxgdlzc">保存</a>  
                            <span v-show="dailizhucexiugai" style="float:right;color:red"> 请注意, 修改完成后将于 <Tag color="red">1小时</Tag> 内生效</span>
                        </div> 
                        <div>
                            <table style="width:100%;text-align:center" class="table table-bordered">
                                <thead>
                                    <tr class="active">
                                        <th>栏位</th>
                                        <th >显示</th>
                                        <th >必填</th>
                                        <th class="text-center">
                                            <Tooltip content="是否不允许注册相同资料">
                                                <Tag color="blue">唯一</Tag>
                                            </Tooltip>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr>
                                        <td>姓名</td>
                                        <td>
                                            <Checkbox v-show="dailizhucexiugai" v-model="AgentRegisterSetting.IsShow_AgentName"></Checkbox> 
                                            <Icon v-show="AgentRegisterSetting.IsShow_AgentName === true" type="checkmark"></Icon>
                                            <Icon v-show="AgentRegisterSetting.IsShow_AgentName === undefined" type="close"></Icon>
                                        </td>
                                        <td>
                                            <Checkbox v-show="dailizhucexiugai" v-model="AgentRegisterSetting.IsRequired_AgentName"></Checkbox> 
                                            <Icon v-show="AgentRegisterSetting.IsRequired_AgentName === true" type="checkmark"></Icon>
                                            <Icon v-show="AgentRegisterSetting.IsRequired_AgentName === undefined" type="close"></Icon>
                                        </td>
                                        <td>
                                            <Checkbox v-show="dailizhucexiugai" v-model="AgentRegisterSetting.IsCheckDuplicated_Name"> </Checkbox>
                                            <Icon v-show="AgentRegisterSetting.IsCheckDuplicated_Name === true" type="checkmark"></Icon>
                                            <Icon v-show="AgentRegisterSetting.IsCheckDuplicated_Name === undefined" type="close"></Icon>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                     <li>
                        <div>备注</div>
                        <div><i-input :disabled="true" type="textarea" v-model="beizhu" :rows="4"></i-input></div>
                    </li>
                    
                </ul>
                <div class="b_link">
                    <a href="javascript:" @click="$root.go_back">回上一页</a>
                    <router-link :to="{name:'PortalSetting'}">回到列表</router-link>
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
            beizhu: '无',
            security: true,
            paomadengxiugai: true,

            paomadeng: `欢迎莅临王者威尼斯人，十八大电子平台，天天返水高达3.0%，无需流水即可提款，更有超多优惠等着您，让您感受无与伦比线上博彩乐趣；365天X24小时专业的客户服务，全新的充值方式，全新的服务理念！尽在王者威尼斯人！
赢家赢在起点, 选也要选对起点, 现在只要在王者威尼斯人成功注册游戏帐号, 并完成绑定银行帐户, 无需充值立即送8元！无需流水要求, 最多可以提100元以上！！！`,
            paomadengzc: '',

            huiyaunzhucexiugai: false,
            RegisterSetting: {
                IsCheckDuplicated_Email: false,
                IsCheckDuplicated_IdNumber: false,
                IsCheckDuplicated_Mobile: false,
                IsCheckDuplicated_Name: false,
                IsCheckDuplicated_QQ: false,

                IsRequired_Birthday: false,
                IsRequired_Email: false,
                IsRequired_IdNumber: true,
                IsRequired_Mobile: true,
                IsRequired_Name: true,
                IsRequired_QQ: false,
                IsRequired_Sex: false,
                IsShow_Birthday: false,

                IsShow_Email: false,
                IsShow_IdNumber: true,
                IsShow_Mobile: true,
                IsShow_Name: true,
                IsShow_QQ: false,
                IsShow_Sex: true
            },
            RegisterSetting_bc: {},

            dailizhucexiugai: false,
            AgentRegisterSetting: {
                IsCheckDuplicated_AgentBankInfo: false,
                IsCheckDuplicated_AgentEmail: false,
                IsCheckDuplicated_AgentIdNumber: false,
                IsCheckDuplicated_AgentMobile: false,
                IsCheckDuplicated_AgentName: false,
                IsCheckDuplicated_AgentQQ: false,
                IsRequired_AgentBankInfo: true,
                IsRequired_AgentBirthday: false,
                IsRequired_AgentEmail: false,
                IsRequired_AgentIdNumber: false,
                IsRequired_AgentMobile: true,
                IsRequired_AgentName: true,
                IsRequired_AgentQQ: false,
                IsRequired_AgentSex: false,
                IsShow_AgentBankInfo: true,
                IsShow_AgentBirthday: false,
                IsShow_AgentEmail: false,
                IsShow_AgentIdNumber: true,
                IsShow_AgentMobile: true,
                IsShow_AgentName: true,
                IsShow_AgentQQ: false,
                IsShow_AgentSex: true
            },
            AgentRegisterSetting_bc: {}
        };
    },
    created () {
        let routerParams = this.$route.params.id;
        this.id = routerParams;
    },
    methods: {
        xiugaibeizhu () {
            this.paomadengzc = this.paomadeng;
            this.paomadengxiugai = false;
        },
        quxiaoxiugaibeizhu () {
            this.paomadeng = this.paomadengzc;
            this.paomadengxiugai = true;
        },
        baocunxiugaibeizhu () {
            this.paomadengxiugai = true;
        },

        xghyzc () {
            this.RegisterSetting_bc = this.RegisterSetting;
            this.huiyaunzhucexiugai = true;
        },
        qxxghyzc () {
            this.RegisterSetting = this.RegisterSetting_bc;
            this.huiyaunzhucexiugai = false;
        },
        bcxghyzc () {
            this.huiyaunzhucexiugai = false;
        },

        xgdlzc () {
            this.RegisterSetting_bc = this.RegisterSetting;
            this.dailizhucexiugai = true;
        },
        qxxgdlzc () {
            this.AgentRegisterSetting = this.AgentRegisterSetting_bc;
            this.dailizhucexiugai = false;
        },
        bcxgdlzc () {
            this.dailizhucexiugai = false;
        },

        sheweiweixian (i) {
            i ? (this.security = false) : (this.security = true);
        },
        shanchu () {
            this.$root.confirm({
                title: '删除',
                content: '<p>确定删除?</p>',
                onOk: () => {
                    this.$Message.success('删除成功！');
                    this.$router.push({ name: 'MemberLevel' });
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
    line-height: 30px;
    th {
      background: #eee;
    }
  }
}
</style>
