<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
          <span>{{MemberData.userName}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <Alert show-icon>
          注意事项
          <template slot="desc">
            <p>新增会员：选择站点后，根据站点搜索所属代理。</p>
            <p>修改会员：切换上级代理,请移步代理账户进行变更。</p>
          </template>
        </Alert>
      </div>
      <div class="page-header">
        <h1 class="binding">
          <Icon type="star" color="red"></Icon> 必填栏位
        </h1>
      </div>
      <div class="page-con1 form-t">
        <Form ref="MemberCreateForm" :model="MemberCreateForm" :rules="ruleValidate" :label-width="180">
          <FormItem label="会员账户名称" prop="userName">
            <i-input :disabled="!!$route.query.isVerify" v-model="MemberCreateForm.userName" placeholder="会员账户名称" style="width:260px"></i-input>
          </FormItem>

          <FormItem label="所属站点" prop="siteId">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>

          <FormItem label="所属代理" prop="agencyName">
            <AutoComplete @listenOnChange="AutoCompleteChange" @listenSelect="selectAgencyType" :AutoCompleteData="AutoCompleteData"></AutoComplete>
          </FormItem>

          <FormItem label="会员等级" prop="levelId">
            <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMember" v-on:listenLevelChange="levelChange"></LevelSelect>
          </FormItem>

          <FormItem label="是否返水">
            <Select v-model="MemberCreateForm.refundBonus" style="width:260px">
              <Option value="yes" label="是">
                <span>是</span>
              </Option>
              <Option value="no" label="否">
                <span>否</span>
              </Option>
            </Select>
          </FormItem>

          <FormItem label="返点比例">
            <RebateSelect ref="RebateSelect" :rebateConfig="rebateConOfMember" @listenRebateChange="listenRebateChange"></RebateSelect>
          </FormItem>

          <FormItem label="状态">
            <Select v-model="MemberCreateForm.status" style="width:260px">
              <Option value="yes" label="开启">
                <span>开启</span>
              </Option>
              <Option value="no" label="关闭">
                <span>关闭</span>
              </Option>
            </Select>
          </FormItem>

          <FormItem prop='platform' label="会员返水设置">
            <Collapse>
              <Panel name="refund">
                <div slot="content">
                  <site-refund-select @listenOnChange="siteRefundSelectChange" :SiteRefundSelectData="SiteRefundSelectData"></site-refund-select>
                </div>
              </Panel>
            </Collapse>
          </FormItem>

          <div class="page-header" style="margin-bottom:10px">
            <h1 class="binding">
              <Icon type="star" color="#ffbe00"></Icon>选填栏位
            </h1>
          </div>
          <FormItem label="真实姓名" prop="realName">
            <i-input :disabled="$route.query.isVerify&&MemberData.realName!==''" style="width:260px" v-model="MemberCreateForm.realName" placeholder="例：奥巴马"></i-input>
          </FormItem>
          <FormItem label="手机" prop="phone">
            <i-input style="width:260px" v-model="MemberCreateForm.phone" placeholder="例：0912345678"></i-input>
          </FormItem>
          <FormItem label="Email">
            <i-input style="width:260px" v-model="MemberCreateForm.email" placeholder="例：ant001@outlook.com"></i-input>
          </FormItem>
          <FormItem label="微信号">
            <i-input style="width:260px" v-model="MemberCreateForm.wechat" placeholder="例：A123456789"></i-input>
          </FormItem>
          <FormItem label="备注">
            <i-input style="width:260px" v-model="MemberCreateForm.remark" type="textarea" :rows="3" placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" v-if="$route.query.isVerify" :loading='$root.btnLoading' @click="FormSubmitCreate()">修改</Button>
            <Button type="primary" v-else :loading='$root.btnLoading' @click="FormSubmitCreate()">创建</Button>
            <Button v-if="$route.query.isVerify" @click="ResetMemberSecret">重设密保答案</Button>
            <Button v-if="$route.query.isVerify" @click="QuKuanPS">重设取款密码</Button>
            <Button v-if="$route.query.isVerify" @click="DengLuPS">重设登录密码</Button>
            <Button type="ghost" style="margin-left: 8px" @click="$router.push({name:'Member'})">返回会员列表</Button>
          </FormItem>
        </Form>
      </div>
      <Modal class-name="vertical-center-modal" v-model="MiMaSheZhiTC" :width='200' title="重设密码成功" ok-text="确定">
        <div style="text-align:center">
          <b style="font-size:35px">{{NewPas}}</b>
        </div>
        <div>
          <Button long :data-clipboard-text='NewPas' id="fuzhi" type="success">复制</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/create";
import Clipboard from "clipboard";
var clipboard = {};
export default {
  // name: "MemberCreate",
  mixins:[mixins],
  data() {
    return {
      // rebateConOfMember: {
      //   type: "member",
      //   data: null,
      //   id: "",
      //   siteId: ""
      // },
      MemberData: {},
      MiMaSheZhiTC: false,
      NewPas: "",
      ansycPostFinish: [],
      siteName: "",
      siteId: null,
      MemberCreateForm: {
        levelId: null,
        levelName: "",
        userName: "",
        refundBonus: "yes",
        agencyId: null,
        siteId: "",
        siteName: "",
        rebate: {},
        agencyName: "",
        status: "yes",
        realName: "",
        phone: "",
        email: "",
        wechat: "",
        remark: ""
      },
      ruleValidate: {
        levelId: [
          {
            required: true,
            type: "number",
            message: "请输入您的会员层级ID",
            trigger: "change"
          }
        ],
        userName: [
          {
            required: true,
            message: "请输入您的会员账户名称",
            trigger: "blur"
          },
          {
            pattern: /^.*$/,
            message: "英文、数字但不包括下划线等符号长度为6-20位！",
            trigger: "blur"
          }
        ],
        siteId: [
          {
            required: true,
            type: "number",
            message: "请选择站点",
            trigger: "change",
            pattern: /^.*$/
          }
        ],
        refundBonus: [
          {
            required: true,
            type: "string",
            message: "请选择返水状态",
            trigger: "change"
          }
        ],
        agencyName: [
          {
            required: true,
            type: "string",
            message: "请输入您的代理",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            type: "string",
            message: "请选择状态",
            trigger: "change"
          }
        ],
        rebate: [
          {
            required: true,
            type: "object",
            message: "请输入您的返点比例",
            trigger: "change",
            pattern: /^.*$/
          }
        ],
        realName: [
          {
            message: "真实姓名长度为2-15个字符",
            trigger: "blur",
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5\·\_]{2,15}$/
          }
        ],
        phone: [
          {
            message: "电话号码不正确",
            trigger: "blur"
          }
        ]
      }
    };
  },
  // beforeRouteUpdate(to, from, next) {
  //   if (to.query && to.query.id && to.query.isVerify) {
  //     this.isVerifyFn(to.query.id);
  //   } else {
  //     this.MemberCreateForm.userName = "";
  //     this.MemberCreateForm.phone = "";
  //   }
  //   next();
  // },
  mounted() {
    this.$nextTick(() => {
      clipboard = new Clipboard("#fuzhi");
      clipboard.on("success", e => {
        this.$Message.success(`复制 ${e.text} 成功`);
        e.clearSelection();
        this.MiMaSheZhiTC = false;
      });
      if (
        this.$route.query &&
        this.$route.query.id &&
        this.$route.query.isVerify
      ) {
        this.isVerifyFn(this.$route.query.id,this.$route.query.siteId);
      }else{
        // 创建页面默认选中默认等级
        this.$set(this.LevelSelectOfMember,"initDefault",true);
      }
    });
  },
  methods: {
    listenRebateChange(rebate) {
      this.MemberCreateForm.rebate = rebate;
    },
    levelChange(re) {
      this.MemberCreateForm.levelId = re.levelLabel;
      this.MemberCreateForm.levelName = re.levelName;
    },
    siteRefundSelectChange(re) {
      //返水
      // this.MemberCreateForm.platform = re;
      if (re.length) {
        re.forEach(item => {
          item.list.forEach(i => {
            this.MemberCreateForm[i.key] = i.value;
          });
        });
      }
    },
    DengLuPS() {
      var that = this;
      this.$Modal.confirm({
        content: "确认修改登录密码？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanDengLuMiMaXiuGai, {
              id: this.$route.query.id,
              siteId: this.$route.query.siteId
            })
            .then(res => {
              this.$Modal.remove();
              this.NewPas = res.data.data;
              this.MiMaSheZhiTC = true;
            })
            .catch(res => {
              this.$Modal.remove();
            });
        }
      });
    },
    QuKuanPS() {
      var that = this;
      this.$Modal.confirm({
        content: "确认修改取款密码？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanQuKuanMiMaXiuGai, {
              id: this.$route.query.id,
              siteId: this.$route.query.siteId
            })
            .then(res => {
              this.$Modal.remove();
              this.NewPas = res.data.data;
              this.MiMaSheZhiTC = true;
            })
            .catch(res => {
              this.$Modal.remove();
            });
        }
      });
    },
    isVerifyFn(eid,siteId) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanXiangQing, {
          id: eid,
          siteId: siteId
        })
        .then(res => {
          this.MemberData = res.data.data;
          for (let key in this.MemberCreateForm) {
            this.MemberCreateForm[key] = this.MemberData[key]
              ? this.MemberData[key]
              : "";
          }
          const { rebate, agencyName, agencyId, siteId, levelId, platform } = res.data.data;
          this.rebateConOfMember.data = rebate && JSON.parse(rebate); //自己的返点数据
          this.rebateConOfMember.siteId = siteId;
          this.rebateConOfMember.id = agencyId; 
          this.$refs.RebateSelect.fetchData()
          this.$set(this.AutoCompleteData, "data", {
            Name: agencyName,
            Id: agencyId
          });

          // 编辑状态下设置上级和站点为禁用，会员是不可以变更站点的，变更代理需在代理模块进行变更
          this.$refs.SiteNameSelect.setDefaultSite(siteId);

          this.$set(this.SiteNameSelectData, "disabled", true);
          this.$refs.LevelSelect.setDefaultLevel(levelId);

          this.$set(this.AutoCompleteData, "disabled", true);

          this.$set(this.SiteRefundSelectData, "data", {
            platform: platform
          });
          // 编辑页面时，同步等级
          this.$refs.LevelSelect.setDefaultLevel(levelId);
          this.MemberCreateForm.id = this.MemberData.uid;
        });
    },
    FanDianmechange(re) {
      this.MemberCreateForm.refundLevelId = re.id;
    },
    siteChange(re) {
      // 站点名称
      if (re.SiteId) {
        this.siteId = re.SiteId; // 会员下的站点ID
        this.siteName = re.SiteName; // 会员下的站点名称
        this.AutoCompleteData.siteId = re.SiteId;
        this.MemberCreateForm.siteId = re.SiteId;
        this.SiteRefundSelectData.siteId = re.SiteId;
        // this.rebateConOfMember.siteId = re.SiteId;
        this.MemberCreateForm.siteName = re.SiteName;
        this.$refs.LevelSelect.getLevelById(re.SiteId,"MemberLevelModel");
      }
    },
    AutoCompleteChange(re) {
      // 上级代理自动查询
      if (re.id || re.id + "" === "0") {
        this.MemberCreateForm.agencyName = re.userName;
        this.MemberCreateForm.agencyId = re.id - 0;
        this.SiteRefundSelectData.id = re.id - 0; // 查询上级的返水
        // this.rebateConOfMember.id = re.id - 0; //查询上级彩票返点
      }
    },
    FormSubmitCreate() {
      if (!this.$route.query.isVerify) {
        // 修复老会员账户5位不能编辑的问题
        if (!/^[A-Za-z0-9]{6,10}$/.test(this.MemberCreateForm.userName)) {
          this.$Modal.error({
            title: "提示",
            content: "会员账户：英文、数字但不包括下划线等符号长度为6-20位！"
          });
          return false;
        }
      }
      this.$refs.MemberCreateForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          if (!this.$route.query.isVerify) {
            let sendParams = { ...this.MemberCreateForm };
            sendParams.rebate = JSON.stringify(sendParams.rebate);
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_ChuangJianHuiYuan,
                sendParams
              )
              .then(res => {
                this.$Spin.hide();
                this.$Modal.success({ title: "提示", content: "创建成功!" });
                this.MemberCreateForm.realName = "";
                this.MemberCreateForm.phone = "";
                this.MemberCreateForm.userName = "";
              })
              .catch(res => {
                this.$Spin.hide();
              })
          } else {
            let MemberRefuData = { ...this.MemberCreateForm };
            MemberRefuData.rebate = JSON.stringify(MemberRefuData.rebate);
            delete MemberRefuData.platform;
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_XiuGaiHuiYuanXinXi,
                MemberRefuData
              )
              .then(res => {
                this.$Spin.hide();
                this.$Modal.success({
                  title: "提示",
                  content: "会员修改成功!"
                });
              })
              .catch(res => {
                this.$Spin.hide();
              })
          }
        } else {
          this.$Modal.error({
            title: "提示",
            content: "请填写正确的用户信息!"
          });
        }
      });
    },
    selectAgencyType(v) {
      this.rebateConOfMember.id = v.id
      this.rebateConOfMember.siteId = v.siteId
      this.$refs.RebateSelect.fetchData()
      if (this.$route.query.isVerify) {
        this.$root
          .HTTP_ALLLINKPOST(
            this.$root.HTTP_L.HTTP_YanZhengShangJiDaiLiHuiYuan,
            {
              id: this.MemberCreateForm.id,
              superiorId: v.id,
              siteId: v.siteId
            }
          )
          .then(res => {
            if (typeof res.data.data === "string") {
              this.$root.confirm({
                title: "提示",
                content: res.data.data,
                loading: true,
                onOk: () => {
                  this.$Modal.remove();
                },
                onCancel: () => {
                  // this.MemberCreateForm.superiorId = this.AgentData.superiorId;
                  // this.MemberCreateForm.superiorUserName = this.AgentData.superiorUserName;

                  this.AutoCompleteData.data.Name =
                    res.data.data.superiorUserName;
                  this.AutoCompleteData.data.superiorId =
                    res.data.data.superiorId;
                  this.$set(this.AutoCompleteData, "data", {
                    Name: this.AgentData.superiorUserName,
                    superiorId: this.AgentData.superiorId
                  });
                  // this.$set(this.AutoCompleteData.data, "superiorId", this.AgentData.superiorId);
                }
              });
            }
          });
      }
    },
    ResetMemberSecret() {
      var that = this;
      this.$Modal.confirm({
        content: "确认修改密保答案？",
        loading: true,
        onOk: () => {
          let params = {
            siteId: this.MemberData.siteId,
            id: this.MemberData.uid
          };
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_Update_ResetMemberSecret,
              params
            )
            .then(res => {
              this.$Modal.remove();
              this.NewPas = res.data.data;
              this.MiMaSheZhiTC = true;
            })
            .catch(res => {
              this.$Modal.remove();
            });
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
