<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <Alert show-icon>
          新增注意事项
          <template slot="desc">
            <div>支持批量添加</div>
          </template>
        </Alert>
      </div>
      <div class="page-header">
        <h1 class="binding">
          <Icon type="star" color="red"></Icon> 必填栏位
        </h1>
      </div>
      <div class="page-con1 form-t">
        <Form v-if="!$route.query.agencyType" ref="CreateAgentDomainForm" :model="CreateAgentDomainForm" :rules="ruleValidate" :label-width="180">
          <FormItem label="站点" prop="siteName">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>
          <FormItem label="代理名称" prop="userName">
            <AutoComplete @listenOnChange="AutoCompleteChange" @listenSelect="AutoCompleteSelect" :AutoCompleteData="AutoCompleteData"></AutoComplete>
          </FormItem>
          <FormItem label="代理网址" prop="domain">
            <i-input style="width:260px" v-model="CreateAgentDomainForm.domain" placeholder="代理网址，不加http://"></i-input>
          </FormItem>
          <FormItem label="状态" prop='status'>
            <Select v-model="CreateAgentDomainForm.status" style="width:260px">
              <Option value="yes" label="开启">
                <span>开启</span>
              </Option>
              <Option value="no" label="关闭">
                <span>关闭</span>
              </Option>
            </Select>
          </FormItem>

          <FormItem label="返点比例" prop='rebate' required>
            <RebateSelect ref="RebateSelect" :rebateConfig="rebateConOfMember" @listenRebateChange="listenRebateChange"></RebateSelect>
          </FormItem>
          
          <FormItem prop='platform' label="代理返水设置">
             <Collapse>
                <Panel name="refund">
                  <div slot="content">
                      <site-refund-select @listenOnChange="siteRefundSelectChange" :SiteRefundSelectData="SiteRefundSelectData"></site-refund-select>
                  </div>
                </Panel>
              </Collapse>
          </FormItem>

          <FormItem>
            <Button v-if="$route.query.isVerify" type="primary" @click="FormSubmit()">确认修改</Button>
            <Button v-else type="primary" @click="FormSubmit()">提交</Button>
            <Button type="ghost" style="margin-left: 8px" @click="$root.go_back">返回</Button>
          </FormItem>
        </Form>
        <!-- 批量添加大股东域名 -->
        <Form v-else ref="BatchAgentDomainForm" :model="BatchAgentDomainForm" :label-width="180">
          <FormItem label="站点名称">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>
          <FormItem label="大股东">
            <Select v-model="BatchAgentDomainForm.uid" style="width:260px">
              <Option v-for="(shareholder,i) in shareholderList" :key="i" :value="shareholder.uid">{{shareholder.userName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="域名名称">
            <i-input style="width:260px" type="textarea" :autosize="{minRows:5}" v-model="BatchAgentDomainForm.urlstr" placeholder="域名串，用英文分号隔开例如：www.baidu.com;www.cctv.com"></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="batchFormSubmit()">提交</Button>
            <Button type="ghost" style="margin-left: 8px" @click="$root.go_back">返回</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/create";
export default {
  name: "AgentCreatDomain",
  mixins: [mixins],
  data() {
    return {
      shareholderList: [],
      resDefault: ["河北省", "张家口市", "怀来县", "沙城镇"],
      showRes: [],
      AgentDimainData: {},
      CreateAgentDomainForm: {
        uid: null,
        userName: "",
        siteId: null,
        siteName: "",
        domain: "",
        status: "yes",
        rebate: {},
        agencyCode: "asdfasdf"
      },
      BatchAgentDomainForm: {
        siteId: null,
        uid: "",
        urlstr: ""
      },
      ruleValidate: {
        uid: [
          {
            required: true,
            message: "请输入您的代理ID",
            trigger: "blur",
            type: "number"
          }
        ],
        userName: [
          {
            required: true,
            message: "请输入您的代理代理名称",
            trigger: "blur"
          }
        ],
        siteId: [
          {
            required: true,
            message: "请输入您的域名id",
            trigger: "blur",
            pattern: /^.*$/
          }
        ],
        siteName: [
          {
            required: true,
            message: "请输入您的代理域名名称",
            trigger: "blur"
          }
        ],
        domain: [
          {
            required: true,
            message: "请输入您的网址",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请输入您的状态",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (
        this.$route.query &&
        this.$route.query.id &&
        this.$route.query.isVerify
      ) {
        this.isVerifyFn(this.$route.query.id);
      } else {
        this.CreateAgentDomainForm.domain = "";
      }
    });
  },
  methods: {
    listenRebateChange(rebate) {
      this.CreateAgentDomainForm.rebate = rebate;
    },
    fetchShareholder(sid) {
      let params = {
        siteId: sid,
        agencyType: "shareholder"
      };
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_DaiLiLieBiao, params)
        .then(res => {
          this.shareholderList = [];
          if (res.data.data.data.length) {
            res.data.data.data.forEach(item => {
              let obj = {};
              obj.uid = item.uid;
              obj.userName = item.userName;
              this.shareholderList.push(obj);
            });
          } else {
            this.shareholderList = [{ uid: "", userName: "暂无数据" }];
          }
        });
    },
    //返水
    siteRefundSelectChange(re) {
      if (re.length) {
        re.forEach(item => {
          item.list.forEach(i => {
            this.CreateAgentDomainForm[i.key] = i.value;
          });
        });
      }
    },
    isVerifyFn(eid) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_DaiLiYuMingXiangXiXinXi, {
          id: this.$route.query.id,
          siteId: this.$route.query.siteId
        })
        .then(res => {
          this.AgentDimainData = res.data.data;

          for (let Key in this.CreateAgentDomainForm) {
            this.CreateAgentDomainForm[Key] = this.AgentDimainData[Key];
          }
          const { rebate, userName, uid, platform, siteId } = res.data.data;
          this.CreateAgentDomainForm.id = this.$route.query.id;
          this.rebateConOfMember.data = rebate && JSON.parse(rebate); //自己的返点数据
          this.rebateConOfMember.siteId = siteId;
          this.rebateConOfMember.id = uid;
          this.$refs.RebateSelect.fetchData()

          this.$set(this.AutoCompleteData, "data", {
            Name: userName,
            Id: uid
          });
          this.$refs.SiteNameSelect.setDefaultSite(siteId);
          this.$set(this.SiteNameSelectData, "disabled", true);
          this.$set(this.SiteRefundSelectData, "data", {
            platform: platform
          });
        });
    },
    siteChange(re) {
      if (re.SiteId) {
        this.AutoCompleteData.siteId = re.SiteId;
        this.CreateAgentDomainForm.siteId = re.SiteId;
        this.CreateAgentDomainForm.siteName = re.SiteName;
        this.SiteRefundSelectData.siteId = re.SiteId; 
        // this.rebateConOfMember.siteId = re.SiteId; //查询上级彩票返点
        this.BatchAgentDomainForm.siteId = re.SiteId;
        if (this.$route.query.agencyType === "shareholder") {
          this.BatchAgentDomainForm.uid = "";
          this.fetchShareholder(re.SiteId);
        }
      }
    },
    AutoCompleteChange(re) {
      if (re.id || re.id + "" === "0") {
        this.CreateAgentDomainForm.userName = re.userName;
        this.CreateAgentDomainForm.uid = re.id;
        this.SiteRefundSelectData.id = re.id - 0; //查询上级的返水
        // this.rebateConOfMember.id = re.id - 0; //查询上级彩票返点
      }
    },
    AutoCompleteSelect(re){
      this.rebateConOfMember.id = re.id
      this.rebateConOfMember.siteId = re.siteId
      this.$refs.RebateSelect.fetchData()
    },
    FormSubmit() {
      var that = this;
      this.$refs.CreateAgentDomainForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          let sendParams = { ...this.CreateAgentDomainForm };
          sendParams.rebate = JSON.stringify(sendParams.rebate);
          if (!this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_TianJiaDaiLiYuMing,
                sendParams
              )
              .then(
                res => {
                  this.$Spin.hide();
                  this.$Modal.success({
                    title: "",
                    content: "添加代理域名成功！"
                  });
                  // this.$refs.CreateAgentDomainForm.resetFields();
                },
                res => {
                  this.$Spin.hide();
                }
              );
          } else {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_BianJiDaiLiYuMing,
                sendParams
              )
              .then(
                res => {
                  // this.$refs.CreateAgentDomainForm.resetFields();
                  this.$Spin.hide();
                  this.$Modal.success({
                    title: "",
                    content: "修改代理域名成功！"
                  });
                },
                res => {
                  this.$Spin.hide();
                }
              );
          }
        } else {
          this.$Modal.success({ title: "", content: "请填写正确的信息" });
        }
      });
    },
    batchFormSubmit() {
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_Insert_BatchShareholderDomain,
          this.BatchAgentDomainForm
        )
        .then(res => {
          this.$Modal.success({ title: "提示", content: "批量添加成功！" });
          this.BatchAgentDomainForm.uid = "";
          this.BatchAgentDomainForm.urlstr = "";
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

