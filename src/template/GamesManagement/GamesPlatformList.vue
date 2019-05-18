
<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <!-- <div class="c_left">
          <i-col class="c_search_top" span="24">
            <Card dis-hover>
              <div slot="title">查询条件</div>
              <i-form ref="AgentSearch" :model="AgentSearch" inline>
                <FormItem label="账号">
                  <i-input autofocus type="text" style="width:200px" placeholder="可输入多个，请以半形逗号隔开"></i-input>
                </FormItem>
                <FormItem label="加盟日期">
                  <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="请选择入会日期" style="width: 260px"></DatePicker>
                </FormItem>
                <FormItem label="状态">
                  <Select v-model="model1" style="width: 200px">
                    <Option v-for="item in StatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="">

                </FormItem>
                <FormItem label="佣金设定">
                  <Select v-model="model2" style="width: 200px">
                    <Option v-for="item in YongJinSheDing" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <a href="javascript:" @click="JinJieSouSuo = true">进阶搜寻</a>
                  <Button type="primary" size="large">查询</Button>
                </FormItem>
              </i-form>
            </Card>
          </i-col>
        </div> -->
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <!-- <Card dis-hover> -->
            <!-- <div slot="title">查询结果</div> -->
            <div class="serach">
              <div class="no_con" v-if="0">
                <Alert show-icon>
                  查询结果
                  <template slot="desc">请输入查询条件 </template>
                </Alert>
              </div>
              <div class="have_con">
                <div class="data_sj">
                  <div class="caozuo_btn">
                    <!-- <Button type="primary" @click="$router.push({name:'CreateMemberLevel'})">新增等级</Button> -->
                    <Button type="success">汇出 Excel</Button>
                  </div>
                  <div style="margin: 10px 0;overflow: hidden">
                    <AgentDataTable :table="table"></AgentDataTable>
                  </div>
                </div>
              </div>
            </div>
            <!-- </Card> -->
          </i-col>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal"  v-model="XuanQu" title="选取会员等级">
      <div class="xuanze">
        <a href="javascript:" @click="quanxuan">全选</a>
        <a href="javascript:" @click="qingkong">清空</a>
      </div>
      <CheckboxGroup v-model="HuiYuanDengJi">
        <Checkbox label="未分层（新会员）">
          <span>未分层（新会员）</span>
        </Checkbox>
        <Checkbox label="第一层（普通会员）">
          <span>第一层（普通会员）</span>
        </Checkbox>
        <Checkbox label="第二层（普通会员）">
          <span>第二层（普通会员）</span>
        </Checkbox>
        <Checkbox label="第十级（高级会员）">
          <span>第十级（高级会员）</span>
        </Checkbox>
      </CheckboxGroup>
    </Modal>
    <Modal class-name="vertical-center-modal"  v-model="JinJieSouSuo" :styles="{top: '10px'}" title="进阶搜索">
      <Form :model="formValidate" label-position="left">
        <FormItem class="form-group">
          <label class="label">真实姓名</label>
          <i-input v-model="formValidate.XingMing.value" style="width: 260px"></i-input>
          <RadioGroup v-model="formValidate.XingMing.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="form-group">
          <label class="label">手机</label>
          <i-input v-model="formValidate.ShouJi.value" style="width: 260px"></i-input>
          <RadioGroup v-model="formValidate.ShouJi.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="form-group">
          <label class="label">性别</label>
          <Select v-model="formValidate.XingBie.value" style="width:260px">
            <Option value="男" label="男">
              <span>男</span>
            </Option>
            <Option value="女" label="女">
              <span>女</span>
            </Option>
          </Select>
          <RadioGroup v-model="formValidate.XingBie.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="form-group">
          <label class="label">Email</label>
          <i-input v-model="formValidate.YouXiang.value" style="width: 260px"></i-input>
          <RadioGroup v-model="formValidate.YouXiang.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="form-group">
          <label class="label">生日</label>
          <DatePicker v-model="formValidate.ShengRi.value" type="daterange" placement="bottom-end" placeholder="选择生日" style="width: 260px"></DatePicker>
          <RadioGroup v-model="formValidate.ShengRi.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="form-group">
          <label class="label">微信号</label>
          <i-input v-model="formValidate.WeiXinHao.value" style="width: 260px"></i-input>
          <RadioGroup v-model="formValidate.WeiXinHao.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="form-group">
          <label class="label">QQ</label>
          <i-input v-model="formValidate.QQ.value" style="width: 260px"></i-input>
          <RadioGroup v-model="formValidate.QQ.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="form-group">
          <label class="label">银行帐号</label>
          <i-input v-model="formValidate.YinHangKaHao.value" style="width: 260px"></i-input>
          <RadioGroup v-model="formValidate.YinHangKaHao.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <!-- <FormItem class="form-group">
                <label class="label">生日</label>
                <DatePicker v-model="formValidate.ShengRi.value" type="daterange" placement="bottom-end" placeholder="选择生日" style="width: 260px"></DatePicker>
                <RadioGroup v-model="formValidate.ShengRi.bh">
                    <Radio label="完全"></Radio>
                    <Radio label="包含"></Radio>
                </RadioGroup>
            </FormItem> -->
        <FormItem class="form-group">
          <label class="label">最后投注</label>
          <DatePicker v-model="formValidate.ZuiHouTouZhu.value" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="最后投注时间" style="width: 260px"></DatePicker>
          <RadioGroup v-model="formValidate.ZuiHouTouZhu.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="form-group">
          <label class="label">上次登入</label>
          <DatePicker v-model="formValidate.ShangCiDengLu.value" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="上次登录时间" style="width: 260px"></DatePicker>
          <RadioGroup v-model="formValidate.ShangCiDengLu.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
// import sunyi from "./components/sunyi.vue";
// import youxiao from "./components/youxiao.vue";
// import baobiaochengxian from "./components/baobiaochengxian.vue";
import AgentDataTable from "@/template/my-components/iview-table/table";
const TableMore = {
  template: `
  <div class='more_data' style="text-align:left">
    <Row>
        <Col span="4"><b>模块</b>:{{row.model}}</Col>
        <Col span="4"><b>状态码</b>:{{row.code}}</Col>
        <Col span="4"><b>状态</b>:{{row.status=='yes'?'开启':'关闭'}}</Col>
        <Col span="4"><b>域名</b>:{{row.host}}</Col>
        <Col span="4"><b>代理id</b>:{{row.status=='yes'?'开启':'关闭'}}</Col>
        <Col span="4"><b>代理账户</b>:{{row.host}}</Col>
    </row>
    <Row>
        <Col span="4"><b>手机号</b>:{{row.phone}}</Col>
        <Col span="4"><b>邮箱</b>:{{row.email}}</Col>
        <Col span="4"><b>微信</b>:{{row.wechat}}</Col>
        <Col span="4"><b>真实姓名</b>:{{row.realName}}</Col>
        <Col span="4"><b>支付密码</b>:{{row.payPassword}}</Col>
        <Col span="4"><b>余额</b>:{{row.balance}}</Col>
    </row>
    <Row>
        <Col span="4"><b>代理层级id</b>:{{row.levelld}}</Col>
        <Col span="4"><b>代理层级名称</b>:{{row.levelName}}</Col>
        <Col span="4"><b>上级id</b>:{{row.levelld}}</Col>
        <Col span="4"><b>返点比例</b>:{{row.levelName}}</Col>
        <Col span="4"><b>返水比例</b>:{{row.levelld}}</Col>
        <Col span="4"><b>是否大股东</b>:{{row.levelld}}</Col>        
    </row>
    <Row>
        <Col span="4"><b>用户令牌</b>:{{row.levelld}}</Col>
        <Col span="4"><b>登陆设备</b>:{{row.loginDevice}}</Col>
        <Col span="4"><b>登陆域名</b>:{{row.loginDomain}}</Col>
        <Col span="4"><b>更新时间</b>:{{row.updated_at}}</Col>
        <Col span="4"><b>注册ip</b>:{{row.regIP}}</Col>
        <Col span="4"><b>登陆ip</b>:{{row.regIP}}</Col>        
    </row>
    <Row>
        <Col span="24"><b>所属代理路径</b>:{{row.levelName}}</Col>
    </Row>
    </div>
    `,
  props: {
    row: Object
  }
};
export default {
  name: "Agent",
  components: { AgentDataTable },
  data() {
    return {
      value: "",
      AgentSearch: {},
      StatusList: [
        {
          value: "停用",
          label: "停用"
        },
        {
          value: "启用",
          label: "启用"
        },
        {
          value: "钱包冻结",
          label: "钱包冻结"
        }
      ],
      fanshuiList: [
        {
          value: "返水",
          label: "返水"
        },
        {
          value: "返水二",
          label: "返水二"
        }
      ],
      DaiLiCengJi: [
        {
          value: "大股东",
          label: "大股东"
        },
        {
          value: "股东",
          label: "股东"
        },
        {
          value: "总代理",
          label: "总代理"
        },
        {
          value: "代理",
          label: "代理"
        }
      ],
      YongJinSheDing: [
        {
          value: "预设",
          label: "预设"
        }
      ],
      model1: "",
      model2: "",
      XuanQu: false,
      JinJieSouSuo: false,
      HuiYuanDengJi: [],
      formValidate: {
        XingMing: { value: "", bh: "" },
        ShouJi: { value: "", bh: "" },
        XingBie: { value: "", bh: "" },
        YouXiang: { value: "", bh: "" },
        ShengRi: { value: "", bh: "" },
        WeiXinHao: { value: "", bh: "" },
        QQ: { value: "", bh: "" },
        YinHangKaHao: { value: "", bh: "" },
        ZuiHouTouZhu: { value: "", bh: "" },
        ShangCiDengLu: { value: "", bh: "" }
      },
      loading: false,
      pageSize: 10,

      table: {
        //数据部分开始
        TableColumn: [
          // {
          //   title: "ID",
          //   key: "id",
          //   width: 60,
          //   render: (h, params) => {
          //     return params.row.id;
          //   }
          // },
          {
            title: "游戏名称",
            key: "platform",
            render: (h, params) => {
              return params.row.platform;
            }
          },
          {
            title: "创建时间",
            key: "created_at",
            width: 220,
            render: (h, params) => {
              return this.$moment.unix(params.row.created_at - 0).format("LLL");
            }
          },
          {
            title: "日期",
            key: "updated_at",
            width: 220,
            render: (h, params) => {
              return this.$moment.unix(params.row.updated_at - 0).format("LLL");
            }
          },
          {
            title: "状态",
            key: "status",
            render: (h, params) => {
              // h('span',[
              var color = params.row.close == "yes" ? "yellow" : "#9f9f9f";
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: color
                    }
                  },
                  params.row.close == "yes" ? "开启" : "关闭"
                )
              ]);
              // ])
              // return params.row.status;
            }
          },
          {
            title: "操作",
            key: "status",
            render: (h, params) => {
              // h('span',[
              var color = params.row.close == "yes" ? "error" : "success";
              var that = this;
              return h(
                'div',[
                  h(
                    
                "Button",
                {
                  props: {
                    // size:'small'
                    type: color,
                    size:'small'
                  },
                  on: {
                    click(even) {
                      that.$Modal.confirm({
                        content: "确认修改？",
                        loading: true,
                        onOk: () => {
                          if (params.row.close == "yes") {
                            hat.$root.HTTP_ALLLINKGET(that.$root.HTTP_L.HTTP_JinYongYouXiPingTai+params.row.id)
                            // that.$root
                            //   .HTTP_JinYongYouXiPingTai(
                            //     `/api/games/platform/disabled/${params.row.id}`
                            //   )
                              .then(res => {
                                that.$Message.success("禁用成功！");
                                that.$Modal.remove();
                                // that.table.TableData.data[params.index].close = 'no';
                                that.$set(that.table.TableData.data[params.index],'close','no');params.row.close = 'no'
                              }).catch(res=>{that.$Modal.remove();that.$set(that.table.TableData.data[params.index],'close','no');params.row.close = 'no'});
                          } else {
                            that.$root.HTTP_ALLLINKGET(that.$root.HTTP_L.HTTP_QiYongYouXiPingTai+params.row.id)
                            // that.$root
                            //   .HTTP_QiYongYouXiPingTai(
                            //     `/api/games/game/enabled/${params.row.id}`
                            //   )
                              .then(res => {
                                that.$Message.success("启用成功！");
                                that.$Modal.remove();
                                // that.table.TableData.data[params.index].close = 'yes';                                
                                that.$set(that.table.TableData.data[params.index],'close','yes');params.row.close = 'yes'
                              }).catch(res=>{that.$Modal.remove();that.$set(that.table.TableData.data[params.index],'close','yes');params.row.close = 'yes'});
                          }
                        }
                      });
                    }
                  }
                },
                params.row.close == "yes" ? "关闭" : "开启"
                  ),
                  h('Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{marginLeft:'5px'},
                    on:{
                      click: () => {
                        this.$router.push({name:'GamesPlatformDetails',query:params.row})
                      }
                    }
                  },'详情')
                ]
              );
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: "/games/platformList",
        dataform: {
          // sitename:'站点名称啊啊'
        }
      }
    };
  },
  computed: {},
  methods: {
    quanxuan() {
      this.HuiYuanDengJi = [
        "未分层（新会员）",
        "第一层（普通会员）",
        "第二层（普通会员）",
        "第十级（高级会员）"
      ];
    },
    qingkong() {
      this.HuiYuanDengJi = [];
    }
  }
};
</script>
<style scoped lang='less'>
.member-main {
}
.xuanze {
  margin-bottom: 10px;
}
.form-group {
  .label {
    display: inline-block;
    width: 71px;
    text-align: right;
  }
  .ivu-date-picker,
  .ivu-select,
  .ivu-input-wrapper,
  .ivu-i-input-wrapper {
    margin: 0 5px;
  }
  margin-bottom: 5px;
}
.c_ser {
  margin-bottom: 10px;
  span.xian {
    width: 10%;
    display: inline-block;
    text-align: center;
  }
}
</style>