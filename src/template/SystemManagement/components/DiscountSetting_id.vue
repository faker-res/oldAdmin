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
                        <div style="margin-bottom:10px;">此设定名称为  <b v-show="fanshuixiugai">{{fanshui}}</b>
                            <i-input style="width:100px;" v-show="!fanshuixiugai" :disabled="fanshuixiugai" type="text" v-model="fanshui"></i-input>
                            <a v-show="fanshuixiugai" @click = "xiugaimingcheng">修改</a>  
                            <a v-show="!fanshuixiugai" @click = "quxiaoxiugaimingcheng">取消</a>  
                            <a v-show="!fanshuixiugai" @click = "baocunxiugaimingcheng">保存</a>  
                        </div> 
                    </li>
                    <li>
                         <div style="margin-bottom:10px;">目前状态为  
                             <Tag v-if="!GetDetail.detail.HasDiscount" color="red">停用中</Tag>
                             <Tag v-if="GetDetail.detail.HasDiscount" color="green">启用中</Tag>
                            <a v-if="GetDetail.detail.HasDiscount" @click = "zhuangtaixiugai()">停用此设定</a>  
                            <a v-if="!GetDetail.detail.HasDiscount" @click = "zhuangtaixiugai()">启用此设定</a>  
                        </div> 
                    </li>
                    <li>
                        <div style="margin-bottom:10px;">返水比  
                            <a @click="$router.push({name:'DiscountSettingModify'})">修改返水比</a> 
                        </div> 
                    </li>
                    <li>
                         <table style="margin-top:20px;width:100%;text-align:center;line-height:30px" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>打码量</th>
                                    <th>返水比</th>
                                    <th>上限</th>
                                    <th>稽核（可空）</th>
                                    <!-- <th>操作</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tj,ic) in GetDetail.detail.Details" :key="ic" ref="quanbiao" :class="'quanbiao'+ic">
                                    <td>
                                        <span v-show="GetDetail.detail.Details[ic].Commissionable" style="font-weight:800;color:#2d8cf0;float:right;display:inline-block;font-size:12px">￥{{GetDetail.detail.Details[ic].Commissionable}}</span>
                                        <span v-show="!GetDetail.detail.Details[ic].Commissionable" style="font-weight:800;color:#2d8cf0;float:right;display:inline-block;font-size:12px">￥0 </span>
                                    </td>
                                    <td>
                                        <div class="table-wrapper" style="max-width:885px;overflow-x: auto;">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td v-for="(item,index) in tabledata" :key="index">
                                                            <div style="width:80px"><Tag color="blue">{{item.Value}}</Tag></div>
                                                            <div style="clear:both" v-for="(item01,index01) in item.Categories" :key="index01">
                                                                <label style="float:left" :for="item01.CategoryName">{{item01.CategoryName}}:</label>
                                                                <span v-show="GetDetail.detail.Details[ic].Percentages[item01.PropertyName]" style="font-weight:800;color:#2d8cf0;float:right;display:inline-block;font-size:12px">{{GetDetail.detail.Details[ic].Percentages[item01.PropertyName]}}%</span>
                                                                <span v-show="!GetDetail.detail.Details[ic].Percentages[item01.PropertyName]" style="font-weight:800;color:#2d8cf0;float:right;display:inline-block;font-size:12px">0 %</span>
                                                            
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                    <td>
                                        <span v-show="GetDetail.detail.Details[ic].Max" style="font-weight:800;color:#2d8cf0;float:right;display:inline-block;font-size:12px">￥{{GetDetail.detail.Details[ic].Max}}</span>
                                        <span v-show="!GetDetail.detail.Details[ic].Max" style="font-weight:800;color:#2d8cf0;float:right;display:inline-block;font-size:12px">￥0 </span>
                                    </td>
                                    <td>
                                        <span v-show="GetDetail.detail.Details[ic].AuditTimes" style="font-weight:800;color:#2d8cf0;float:right;display:inline-block;font-size:12px">￥{{GetDetail.detail.Details[ic].AuditTimes}}</span>
                                        <span v-show="!GetDetail.detail.Details[ic].AuditTimes" style="font-weight:800;color:#2d8cf0;float:right;display:inline-block;font-size:12px">免稽核</span>
                                    </td>
                                    <!-- <td>
                                        <Button v-show="xinzeng.length==ic+1" @click="addnewrr(xinzeng)" type="primary">
                                            新增
                                        </Button>
                                        <Button v-show="xinzeng.length != ic+1"  @click="removerr(xinzeng,ic)" type="error">
                                            删除
                                        </Button>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <div>目前的会员人数为 <a @click="$router.push({name:'home_index'})">{{GetDetail.detail.MemberCount}}</a> 人   </div> 
                    </li>
                    <li>
                        <div>目前的代理人数为 <a @click="$router.push({name:'home_index'})">{{GetDetail.detail.AgentCount}}</a> 人   </div> 
                    </li>
                    <li>
                        <div>已有会员及代理，不允许删除 </div> 
                    </li>
                     <li>
                        <div>备注 
                             <a v-show="beizhuxiugai" @click="beizhuzc = beizhu;beizhuxiugai = false;">修改</a>  
                            <a v-show="!beizhuxiugai" @click="beizhu = beizhuzc;beizhuxiugai = true;">取消</a>  
                            <a v-show="!beizhuxiugai" @click="baocunxiugaibeizhu">保存</a>  
                        </div>
                        <div>
                            <i-input v-show="GetDetail.detail.Memo" :disabled="beizhuxiugai" type="textarea" v-model="GetDetail.detail.Memo" :rows="4"></i-input>
                            <i-input v-show="!GetDetail.detail.Memo" :disabled="beizhuxiugai" type="textarea" v-model="beizhu" :rows="4"></i-input>
                        </div>
                    </li>
                    
                </ul>
                <div class="b_link">
                    <a href="javascript:" @click="$root.go_back">回上一页</a>
                    <router-link :to="{name:'DiscountSetting'}">回到列表</router-link>
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
            beizhuxiugai: true,
            beizhu_zc: '',
            fanshuixiugai: true,

            fanshui: '返水',
            fanshuizc: '',

            tabledata: [],
            xinzeng: [{}],

            GetDetail: {
                detail: {
                    HasDiscount: false
                }
            },

            huiyaunzhucexiugai: false
        };
    },
    created () {
        let routerParams = this.$route.params.id;
        this.id = routerParams;
        this.$http.get('./src/data/GetDetail.json', [{}]).then(response => {
            this.GetDetail = response.data;
        });
        let promise = this.$root.GetSupplierCategories();
        promise
            .then(value => {
                this.tabledata = value;
            })
            .catch(function (error) {
                this.$Message.error('发生错误！');
            });
    },
    methods: {
        zhuangtaixiugai () {
            this.GetDetail.detail.HasDiscount = !this.GetDetail.detail.HasDiscount;
        },
        xiugaimingcheng () {
            this.fanshuizc = this.fanshui;
            this.fanshuixiugai = false;
        },
        quxiaoxiugaimingcheng () {
            this.fanshui = this.fanshuizc;
            this.fanshuixiugai = true;
        },
        baocunxiugaimingcheng () {
            this.fanshuixiugai = true;
        },
        baocunxiugaibeizhu () {
            this.beizhuxiugai = true;
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
  table {
    label {
      font-size: 12px;
    }
    input {
      width: 80px;
      float: left;
      margin: 0 5px;
      padding: 0 3px;
      border-radius: 3px;
      border: 1px solid #dddddd;
    }
  }
}
</style>
