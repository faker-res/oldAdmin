<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <div>
          <Form ref="CreatWebSiteForm" :model="CreatWebSiteForm" :rules="CreatWebSiteFormRules" :label-width="180">
            <FormItem v-show="!$route.query.isVerify" label="站点代码" prop="siteCode">
              <i-input placeholder="以小写字母开头小写字母或数字结尾" v-model="CreatWebSiteForm.siteCode" style="width:260px"></i-input>
            </FormItem>
            <FormItem label="站点" prop="siteName">
              <i-input placeholder="请输入站点名称" v-model="CreatWebSiteForm.siteName" style="width:260px"></i-input>
            </FormItem>
            <FormItem label="服务器" :prop="!$route.query.isVerify?'db_id':''" v-show="!$route.query.isVerify">
              <Select v-model="CreatWebSiteForm.db_id" style="width:260px;">
                <Option v-for="op in serverOpts" :key="op.db_id" :value="op.db_id">{{op.db_name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="返点比例" prop="rebate">
              <RebateSelect ref="RebateSelect" :rebateConfig="rebateConfig" @listenRebateChange="listenRebateChange"></RebateSelect>
            </FormItem>
          </Form>
          <div class="page-header">
            <h2 class="binding">站点设置</h2>
          </div>
          <Form ref="SiteConfigDataR" :model="SiteConfigDataR" :rules="SiteConfigDataRRelus" :label-width="180">
            
            <FormItem label="PC注册配置">
              <CheckboxGroup v-model="SiteConfigDataR.pc">
                <Checkbox v-for="(item,i) in Device" :key="i" :label="item.value">{{item.label}}</Checkbox>
              </CheckboxGroup>
            </FormItem>

            <FormItem label="H5注册配置">
              <CheckboxGroup v-model="SiteConfigDataR.h5">
                <Checkbox v-for="(item,i) in Device" :key="i" :label="item.value">{{item.label}}</Checkbox>
              </CheckboxGroup>
            </FormItem>

            <FormItem label="APP注册配置">
              <CheckboxGroup v-model="SiteConfigDataR.app">
                <Checkbox v-for="(item,i) in Device" :key="i" :label="item.value">{{item.label}}</Checkbox>
              </CheckboxGroup>
            </FormItem> 

            <FormItem label="运营模式">
              <RadioGroup v-model="SiteConfigDataR.site_model">
                <Radio label="invite_link">邀请链接</Radio>
                <Radio label="invite_code">邀请码</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="网站维护">
              <i-switch v-model="WangZhanWeiHu" @on-change="changeYH"></i-switch>
            </FormItem>
            <FormItem prop="timeEnd" v-model="SiteConfigDataR.timeEnd" label="维护时间" v-if="SiteConfigDataR.status == 'on'">
              <DatePicker :value="SiteConfigDataR.timeEnd" placeholder="请选择结束维护时间" format="yyyy-MM-dd HH:mm:ss" @on-change="ShiJianXuanZe" type="datetime" style="width: 200px"></DatePicker>
            </FormItem>

            <FormItem label="客服链接">
              <table style="min-width:30%" class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>地址</th>
                    <th>状态</th>
                    <th>删除</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in SiteConfigDataR.service" :key="index">
                    <td>
                      {{index+1}}
                    </td>
                    <td>
                      <i-input style="width:260px" v-model="item.url" :disabled="IsBianJiLianJie!=index+1"></i-input>
                    </td>
                    <td>
                      <i-switch :value="item.status == 'on'" @on-change="changeKeFu(index,$event)"></i-switch>
                    </td>
                    <td>
                      <Button @click="DeleteKeFuLink(index,item)" type="error">
                        删除
                      </Button>
                      <Button v-show="IsBianJiLianJie!=index+1" @click="IsBianJiLianJie=index+1" type="info">
                        编辑链接
                      </Button>
                      <Button @click="IsBianJiLianJie=0" v-show="IsBianJiLianJie==index+1" type="success">确定</Button>
                    </td>

                  </tr>
                  <tr v-show="IsAddService">
                    <td>
                      {{SiteConfigDataR.service.length+1}}
                    </td>
                    <td>
                      <i-input v-model="AddServiceUrl.url"></i-input>
                    </td>
                    <td>
                      <i-switch :value="AddServiceUrl.status == 'on'" @on-change="AddchangeKeFu"></i-switch>
                    </td>
                    <td>
                      <Button @click="AddServiceUrl.url='';IsAddService=false" type="warning">
                        取消
                      </Button>
                      <Button @click="AddServiceUrlFn" type="success">
                        确定
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <Button v-show="!IsAddService" @click="IsAddService=true;AddServiceUrl.url=''" long type="success">添加客服</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FormItem>
            <FormItem label="快三样式" prop="k3Theme">
              <Select v-model="SiteConfigDataR.k3Theme" style="width:260px">
                <Option value="default" label="默认"></Option>
                <Option value="theme1" label="主题一"></Option>
              </Select>
            </FormItem>
            <FormItem label="最低存款" prop="paymentLimit">
              <input-number style="width:260px" v-model="SiteConfigDataR.paymentLimit" :step="0.1" :min="0"></input-number>
            </FormItem>

            <FormItem label="最低取款" prop="withdrawalsLimit">
              <input-number style="width:260px" v-model="SiteConfigDataR.withdrawalsLimit" :step="1" :min="0"></input-number>
            </FormItem>

            <FormItem label="汇款赠送比例" prop="paymentBonus">
              <input-number style="width:260px" v-model="SiteConfigDataR.paymentBonus" :step="0.1" :min="0"></input-number>
            </FormItem>

            <FormItem label="彩票最低下注金额" prop="lotteryBetMin">
              <input-number style="width:260px" v-model="SiteConfigDataR.lotteryBetMin" :step="0.01" :min="0.01"></input-number>
            </FormItem>

            <FormItem label="彩票最高下注金额" prop="lotteryBetMax">
              <input-number style="width:260px" v-model="SiteConfigDataR.lotteryBetMax" :step="1000" :min="0"></input-number>
            </FormItem>
            <FormItem label="提款是否需要打码量" prop="isNeedBetAmount">
              <Select v-model="SiteConfigDataR.isNeedBetAmount" style="width:260px">
                <Option value="yes" label="是"></Option>
                <Option value="no" label="否"></Option>
              </Select>
            </FormItem>

            <div class="page-header">
              <h2 class="binding">Android配置</h2>
            </div>
            <FormItem label="版本号">
              <i-input style="width:260px" :rows="5" v-model="SiteConfigDataR.Android.version" placeholder="版本号"></i-input>
            </FormItem>
            <FormItem label="更新类型">
              <RadioGroup v-model="SiteConfigDataR.Android.type">
                <Radio label="yes">
                  <span>强制更新</span>
                </Radio>
                <Radio label="no">
                  <span>不更新</span>
                </Radio>
                <Radio label="selectivity">
                  <span>选择性更新</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="下载链接">
              <i-input style="width:260px" :rows="5" v-model="SiteConfigDataR.Android.link" placeholder="http://www.123.com"></i-input>
            </FormItem>
            <FormItem label="提示文字">
              <i-input style="width:260px" :rows="5" v-model="SiteConfigDataR.Android.tip" placeholder="提示文字"></i-input>
            </FormItem>

            <div class="page-header">
              <h2 class="binding">IOS配置</h2>
            </div>
            <FormItem label="版本号">
              <i-input style="width:260px" :rows="5" v-model="SiteConfigDataR.IOS.version" placeholder="版本号"></i-input>
            </FormItem>
            <FormItem label="更新类型">
              <RadioGroup v-model="SiteConfigDataR.IOS.type">
                <Radio label="yes">
                  <span>强制更新</span>
                </Radio>
                <Radio label="no">
                  <span>不更新</span>
                </Radio>
                <Radio label="selectivity">
                  <span>选择性更新</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="下载链接">
              <i-input style="width:260px" :rows="5" v-model="SiteConfigDataR.IOS.link" placeholder="http://www.123.com"></i-input>
            </FormItem>
            <FormItem label="提示文字">
              <i-input style="width:260px" :rows="5" v-model="SiteConfigDataR.IOS.tip" placeholder="提示文字"></i-input>
            </FormItem>

            <div class="page-header">
              <h2 class="binding">其他配置</h2>
            </div>
            <FormItem label="主题">
              <Select clearable v-model="SiteConfigDataR.theme" style="width:260px">
                <Option value="default">默认主题</Option>
              </Select>
            </FormItem>
            <FormItem label="静态资源路径">
              <i-input type="textarea" style="width:600px" :rows="5" v-model="SiteConfigDataR.statics" placeholder="例如：img.7900005.com"></i-input>
            </FormItem>

            <FormItem label="APP域名">
              <i-input type="textarea" style="width:600px" :rows="5" v-model="SiteConfigDataR.app_domain" placeholder="多个域名请用竖线隔开，例如：9805000.com|9805111.com|9806000.com|9807000.com|9808333.com"></i-input>
            </FormItem>

            <FormItem>
              <Button @click="CreateSite" :loading='$root.btnLoading' type="primary">确定
                <span v-if="$route.query.isVerify">修改</span>
                <span v-else>创建</span>
              </Button>
              <Button @click="$router.push({name:'WebSiteList'})">站点列表</Button>
              <Button @click="$root.go_back">返回</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RebateSelect from "@/template/my-components/RebateSelect";
export default {
  components: { RebateSelect },
  data() {
    return {
      serverOpts: [],
      rebateConfig: {
        type: "site",
        data: {},
        id: ""
      },
      btnLoading: false,
      IsAddService: false,
      IsBianJiLianJie: 0,
      AddServiceUrl: {
        url: "",
        status: "on"
      },
      CreatWebSiteForm: {
        siteCode: "",
        siteName: "",
        siteConfig: "",
        db_id: "",
        rebate: {} // 彩票赔率
      },
      //站点全局配置参数
      Device: [
        { value: "phone", label: "手机" },
        { value: "email", label: "邮箱" },
        { value: "wechat", label: "微信" },
        { value: "realName", label: "真实姓名" },
        { value: "payPassword", label: "支付密码" },
        { value: "registerOnOff", label: "注册开关" }
      ],

      //验证的这个结构
      SiteConfigDataR: {
        k3Theme: "default",
        pc: [],
        h5: [],
        app: [],
        status: "on", // on=正常，off=维护
        timeEnd: "", // 维护结束时间
        service: [
          // 客服链接
        ],
        paymentLimit: 10, // 最低存款
        withdrawalsLimit: 100, // 最低取款
        paymentBonus: 0.01, // 汇款赠送比例
        lotteryBetMin: 0.01, // 彩票最低下注金额
        lotteryBetMax: 10000000, // 彩票最高下注金额
        statics: "", // 手机图片版本
        app_domain: "", // app域名
        theme: "", //主题
        isNeedBetAmount: "", //提款是否需要打码量
        Android: {
          version: "",
          type: "",
          link: "",
          tip: ""
        },
        IOS: {
          version: "",
          type: "",
          link: "",
          tip: ""
        },
        site_model: "invite_link"
      },
      //传递的这个数据
      SiteConfigData: {
        k3Theme: "",
        register: {
          //注册必填项
          pc: [],
          h5: [],
          app: []
        },
        close: {
          // 网站维护状态配置
          status: "on", // on=正常，off=维护
          timeEnd: "" // 维护结束时间
        },
        service: [], // 客服链接
        limit: {
          // 资金范围限制
          paymentLimit: 10, // 最低存款
          withdrawalsLimit: 100, // 最低取款
          paymentBonus: 0.01, // 汇款赠送比例
          lotteryBetMin: 1, // 彩票最低下注金额
          lotteryBetMax: 10000000 // APP域名
        },
        statics: "", // 手机图片版本
        app_domain: "", // app域名
        theme: "", //主题
        isNeedBetAmount: "", //提款是否需要打码量
        Android: {
          version: "",
          type: "",
          link: "",
          tip: ""
        },
        IOS: {
          version: "",
          type: "",
          link: "",
          tip: ""
        },
        site_model: ""
      },
      SiteConfigDataRRelus: {
        isNeedBetAmount: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        timeEnd: [
          {
            required: true,
            message: "请输入结束时间！",
            trigger: "change",
            pattern: /^.*$/
          }
        ],
        paymentLimit: [
          {
            required: true,
            message: "请输入最低存款！",
            trigger: "change",
            pattern: /^.*$/
          }
        ],
        withdrawalsLimit: [
          {
            required: true,
            message: "请输入最低取款！",
            trigger: "change",
            pattern: /^.*$/
          }
        ],
        paymentBonus: [
          {
            required: true,
            message: "请输入优惠赠送比例！",
            trigger: "change",
            pattern: /^.*$/
          }
        ],
        lotteryBetMin: [
          {
            required: true,
            message: "请输入彩票最低下注金额！",
            trigger: "change",
            pattern: /^.*$/
          }
        ],
        lotteryBetMax: [
          {
            required: true,
            message: "请输入结束时间！",
            trigger: "change",
            pattern: /^.*$/
          }
        ]
      },
      CreatWebSiteFormRules: {
        siteName: [
          { required: true, message: "站点名称不能为空", trigger: "blur" }
        ],
        siteCode: [
          {
            required: true,
            message: "站点码必须两个长度",
            trigger: "blur",
            pattern: /^[a-z0-9]{2}$/
          }
        ],
        db_id: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
            type: "number"
          }
        ],
        rebate: [
          {
            required: true,
            message: "请完善返点比例！",
            trigger: "change",
            type: "object"
          }
        ]
      }
    };
  },
  computed: {
    WangZhanWeiHu: {
      get: function(e) {
        if (this.SiteConfigDataR.status == "on") {
          return true;
        } else {
          return false;
        }
      },
      set: function(newValue) {
        this.SiteConfigDataR.status == newValue;
      }
    }
  },
  created() {
    if (this.$route.query.isVerify) {
      this.isVerify(this.$route.query.id);
    } else {
      // this.$refs.RebateSelect.fetchData();
    }
    for (var keyData in this.SiteConfigData) {
      for (var keyDataRules in this.SiteConfigDataR) {
        if (keyData == keyDataRules) {
          this.SiteConfigData[keyData] = this.SiteConfigDataR[keyDataRules];
        } else {
          for (var Neikey in this.SiteConfigData[keyData]) {
            if (Neikey == keyDataRules) {
              this.SiteConfigData[keyData][Neikey] = this.SiteConfigDataR[
                keyDataRules
              ];
            }
          }
        }
      }
    }
    this.CreatWebSiteForm.siteConfig = JSON.stringify(this.SiteConfigData);
    this.getServerOpts();
  },
  watch: {
    SiteConfigDataR: {
      handler(newvalue, value) {
        for (let key in this.SiteConfigData) {
          for (let keyR in this.SiteConfigDataR) {
            if (key == keyR) {
              this.SiteConfigData[key] = this.SiteConfigDataR[keyR];
            } else {
              for (let inKey in this.SiteConfigData[key]) {
                if (inKey == keyR) {
                  this.SiteConfigData[key][inKey] = this.SiteConfigDataR[keyR];
                }
              }
            }
          }
        }
        this.CreatWebSiteForm.siteConfig = JSON.stringify(this.SiteConfigData);
      },
      deep: true
    }
  },
  methods: {
    getServerOpts(){
      const url = this.$root.HTTP_L.HTTP_GetServer;
      this.$root.HTTP_ALLLINKGET(url)
      .then(res => {
        if (res.data.data.length) {
          this.serverOpts = res.data.data;
        }
      })
    },
    listenRebateChange(val) {
      console.log(val)
      this.CreatWebSiteForm.rebate = val;
    },
    DeleteKeFuLink(index, item) {
      this.SiteConfigDataR.service.splice(index, 1);
    },
    AddServiceUrlFn() {
      if (this.AddServiceUrl.url && this.AddServiceUrl.status) {
        this.SiteConfigDataR.service.push(
          JSON.parse(JSON.stringify(this.AddServiceUrl))
        );
        this.IsAddService = false;
      } else {
        this.$Message.error("请输入正确的地址！");
      }
    },
    AddchangeKeFu(e) {
      e
        ? (this.AddServiceUrl.status = "on")
        : (this.AddServiceUrl.status = "off");
    },
    changeKeFu(i, e) {
      e
        ? (this.SiteConfigDataR.service[i].status = "on")
        : (this.SiteConfigDataR.service[i].status = "off");
    },
    ShiJianXuanZe(e) {
      this.SiteConfigDataR.timeEnd = e;
    },
    changeYH(e) {
      e
        ? (this.SiteConfigDataR.status = "on")
        : (this.SiteConfigDataR.status = "off");
    },
    CreateSite() {
      var isPass = false;
      this.$refs.SiteConfigDataR.validate(vali => {
        if (vali) {
          isPass = true;
        } else {
          isPass = false;
        }
      });
      this.$refs.CreatWebSiteForm.validate(valid => {
        if (valid && isPass) {
          this.$root.loading();
          let params = { ...this.CreatWebSiteForm };
          params.rebate = JSON.stringify(params.rebate);
          if (!this.$route.query.id) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_ZhanDianXinZeng,
                params
              )
              .then(res => {
                this.$Spin.hide();
                this.$refs.CreatWebSiteForm.resetFields();
                this.$Modal.success({
                  title: "提示",
                  content: "站点添加成功！"
                });
              })
              .catch(res => {
                this.$Spin.hide();
              });
          } else {
            delete params.db_id;
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_ZhanDianXiuGai,
                params
              )
              .then(res => {
                this.$Spin.hide();
                this.$Modal.success({
                  title: "提示",
                  content: "站点修改成功！"
                });
              })
              .catch(res => {
                this.$Spin.hide();
              });
          }
        }
      });
    },
    isVerify(eid) {
      //编辑状态下
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZhanDianXiangQing, {
          systemId: this.$route.query.id
        })
        .then(res => {
          const { rebate ,siteConfig } = res.data.data;
          var dataMemory = JSON.parse(siteConfig);
          for (let key in this.CreatWebSiteForm) {
            this.CreatWebSiteForm[key] = res.data.data[key];
          }
          this.CreatWebSiteForm.systemId = this.$route.query.id;
          this.CreatWebSiteForm.updateUserName = this.$root.adminuserinfo.adminUserName;

          this.rebateConfig.data = rebate && JSON.parse(rebate); // 自己的返点数据
          this.$refs.RebateSelect.fetchData()
          for (var keyData in dataMemory) {
            for (var keyDataRules in this.SiteConfigDataR) {
              if (keyData == keyDataRules) {
                this.SiteConfigDataR[keyDataRules] = dataMemory[keyData];
              } else {
                for (var Neikey in dataMemory[keyData]) {
                  if (Neikey == keyDataRules) {
                    this.SiteConfigDataR[keyDataRules] =
                      dataMemory[keyData][Neikey];
                  }
                }
              }
            }
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-tabs {
  overflow: visible;
}
.tip {
  padding: 5px 0;
  font-size: 13px;
  color: #aaa;
}
</style>

