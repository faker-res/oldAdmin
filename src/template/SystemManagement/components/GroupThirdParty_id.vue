<template>
    <div class="content-main CreateMemberLevel-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}
                    <span>{{fanshui}}</span>
                </h1>
            </div>
            <div class="blockquote">
                <ul>
                    <li>
                        <div style="margin-bottom:10px;">此设定名称为
                            <b v-show="fanshuixiugai">{{fanshui}}</b>
                            <i-input style="width:150px;" v-show="!fanshuixiugai" :disabled="fanshuixiugai" type="text" v-model="fanshui"></i-input>
                            <a v-show="fanshuixiugai" @click="xiugaimingcheng">修改</a>
                            <a v-show="!fanshuixiugai" @click="quxiaoxiugaimingcheng">取消</a>
                            <a v-show="!fanshuixiugai" @click="baocunxiugaimingcheng">保存</a>
                        </div>
                    </li>

                    <li>
                        <div style="margin-bottom:10px;">商戶资料如下
                            <a>修改</a>
                        </div>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>类型</th>
                                    <td>
                                        <div>元启-QQ扫码</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <span>商户号</span>
                                    </th>
                                    <td>
                                        <span>lauxgt@sina.com</span>
                                        <input type="text">
                                    </td>

                                </tr>
                                <tr>
                                    <th>
                                        <span>商户证书</span>
                                    </th>
                                    <td>
                                        <span>mqxntmra</span>
                                        <input type="text">
                                    </td>

                                </tr>
                                <tr>
                                    <th>
                                        <span>跳板网址</span>
                                    </th>
                                    <td>
                                        <span>http://pay.xiejianc.pw</span>
                                        <input type="text">
                                    </td>

                                </tr>
                                <tr>
                                    <th>
                                        <span>注意事項</span>
                                    </th>
                                    <td>
                                        <span>请与元启支付客服联系，设定回调通知须回传金额(amount)</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <div>
                            单次存款限额： $ 10 ~ $ 5,000
                            <a>修改</a>
                        </div>
                    </li>
                    <li>
                        <div>未限制总存款额度
                            <a>修改</a>
                        </div>
                    </li>
                    <li>
                        <div>目前累计：$ 50
                            <a>归零</a>
                        </div>
                    </li>
                    <li>
                        <div>有效分钟数：20分
                            <a>修改</a>
                            <Tooltip content="线上支付订单的有效时间，过了有效时间系统会自动将【尚未送出】和【处理中】的订单改为【已取消】" placement="top">
                                <Icon type="help-circled"></Icon> 说明
                            </Tooltip>
                        </div>
                    </li>
                    <li>
                        <div style="margin-bottom:10px;">目前状态为
                            <Tag v-if="!GetDetail.detail.HasDiscount" color="red">停用中</Tag>
                            <Tag v-if="GetDetail.detail.HasDiscount" color="green">启用中</Tag>
                            <a v-if="GetDetail.detail.HasDiscount" @click="zhuangtaixiugai()">停用此设定</a>
                            <a v-if="!GetDetail.detail.HasDiscount" @click="zhuangtaixiugai()">启用此设定</a>
                        </div>

                    </li>
                    <li>
                        <div>可使用之会员等级共 4 个
                            <a href="javascript:">修改</a>
                            <Button type="warning" size="small">未分層（新會員）</Button>
                            <Button type="warning" size="small">第一層（普通會員）</Button>
                            <Button type="warning" size="small">第二層（普通会员）</Button>
                            <Button type="warning" size="small">第十级（高级会员）</Button>
                        </div>
                    </li>
                    <li>
                        <div>备注
                            <a href="javascript:" @click="xiugaibeizhu"></a>

                            <a v-show="beizhuxiugai" @click="xiugaibeizhu">修改</a>
                            <a v-show="!beizhuxiugai" @click="quxiaoxiugaibeizhu">取消</a>
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
            beizhu: '无',
            beizhuxiugai: true,
            beizhu_zc: '',
            fanshuixiugai: true,

            fanshui: '',
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
        this.fanshui = routerParams;
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

        xiugaibeizhu () {
            this.beizhuzc = this.beizhu;
            this.beizhuxiugai = false;
        },
        quxiaoxiugaibeizhu () {
            this.beizhu = this.beizhuzc;
            this.beizhuxiugai = true;
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
<style lang="less"  scoped>
.table {
  th {
    padding: 0 15px;
  }
}
.blockquote {
  li {
    padding: 5px 0;
    div {
      a {
        padding: 0 5px;
      }
    }
  }
  table {
    width: 50%;
    margin-top: 10px;
    line-height: 30px;
    th {
      background: rgb(248, 248, 248);
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
