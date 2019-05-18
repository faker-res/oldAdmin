<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <div>
          <Form ref="CreatPaymentQRCode" :model="CreatPaymentQRCode" :rules="CreatSystemOutPayMentRelus" :label-width="180">
            <FormItem label="创建人">
              <i-input placeholder="请输入创建人" :disabled="true" v-model="CreatPaymentQRCode.created_user" style="width:260px"></i-input>
            </FormItem>

            <FormItem label="站点" prop="siteId">
              <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
            </FormItem>
            <FormItem label="允许的等级" prop="levelId">
              <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMultiple" v-on:listenLevelChange="levelChange"></LevelSelect>
            </FormItem>
            <FormItem label="支付类型" prop="classId">
              <PayClassSelect ref="PayClassSelect" @listenOnChange="mechangeZhiFuFenZu" :PayClassSelectData="PayClassSelectOfQR" />
            </FormItem>
            <FormItem label="支付名称" prop="payName">
              <i-input v-model="CreatPaymentQRCode.payName" style="width:260px" placeholder="请输入支付名称"></i-input>
            </FormItem>
            <FormItem prop="min_amount" label='最小支付金额'>
              <InputNumber :min="0" style="width:260px" v-model="CreatPaymentQRCode.min_amount">
              </inputNumber>
            </FormItem>
            <FormItem prop="max_amount" label='最大支付金额'>
              <InputNumber :min="0" style="width:260px" v-model="CreatPaymentQRCode.max_amount"></InputNumber>
            </FormItem>
            <FormItem label="客户端" prop="devices">
              <CheckboxGroup v-model="devices">
                <Checkbox label="pc">
                  <span>PC</span>
                </Checkbox>
                <Checkbox label="h5">
                  <span>H5</span>
                </Checkbox>
                <Checkbox label="ios">
                  <span>IOS</span>
                </Checkbox>
                <Checkbox label="android">
                  <span>Android</span>
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="二维码图片" prop="qr_code">
              <div v-if="bannerShow">
                <img :src="BannerUrl" />
                <a href="javascript:" @click="gengHuanTuPian">更换图片</a>
              </div>
              <div v-else>
                <a v-if="$route.query.isVerify" href="javascript:" @click="gengHuanTuPian">取消更换</a>
                <div class="image-editor">
                  <img :src="uploadData.src" alt="" v-if="uploadData.src" width="200px" height="200px">
                  <Button type="primary" @click="ShangChuanTuPian" icon="image">上传</Button>
                </div>
              </div>
            </FormItem>
            <FormItem label="排序" prop="sequence">
              <i-input v-model="CreatPaymentQRCode.sequence" style="width:260px"></i-input>
            </FormItem>
            <FormItem label="状态" prop="status">
              <Select v-model="CreatPaymentQRCode.status" style="width:260px">
                <Option value="yes">正常</Option>
                <Option value="no">屏蔽</Option>
              </Select>
            </FormItem>
            <FormItem label="备注" prop="remarks">
              <i-input v-model="CreatPaymentQRCode.remarks" style="width:260px"></i-input>
            </FormItem>
            <FormItem>
              <Button @click="CreatingQRcode" :loading='$root.btnLoading' type="primary">确定提交</Button>
              <Button v-if="$route.query.type === 'out'" @click="$router.push({name:'PaymentQRCodeList'})">二维码列表</Button>
              <Button @click="$root.go_back">返回</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
    <UploadImg :uploadData="uploadData" @refresh="refresh" />
  </div>
</template>

<script>
import mixins from "@/mixins/create";
export default {
  //   name: "CreatPaymentQRCode",
  mixins: [mixins],
  // components: {
  //   LevelSelect
  // },
  data() {
    return {
      showModal: false, //图片库组件
      levelId: [],
      devices: ["pc", "h5", "ios", "android"],
      bannerShow: false, //图片展示true,不展示false
      BannerUrl: "", //展示的图片路径
      sendUrl: "", //修改时，保存返回的图片路径
      uploadData: {
        //上传图片data
        upload: false,
        siteId: null,
        src: "",
        path: "",
        size: true
      },
      CreatPaymentQRCode: {
        siteId: null,
        siteName: "",
        classId: null,
        className: "",
        payName: "",
        min_amount: null,
        max_amount: null,
        qr_code: null,
        status: "yes",
        levelId: "",
        devices: "",
        sequence: "",
        remarks: "",
        created_user: ""
      },
      Status: [
        {
          value: "enabled",
          label: "开启"
        },
        {
          value: "disabled",
          label: "关闭"
        }
      ],
      CreatSystemOutPayMentRelus: {
        status: [
          {
            required: true,
            message: "状态不能为空",
            trigger: "change"
          }
        ],
        sequence: [
          {
            required: true,
            message: "排序不能为空",
            trigger: "blur",
            pattern: /^.*$/
          }
        ],
        remarks: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur"
          }
        ],
        qr_code: [
          {
            required: true,
            message: "图片不能为空"
          }
        ],
        classId: [
          {
            pattern: /^.*$/,
            required: true,
            message: "支付类型不能为空",
            // trigger: "change"
            trigger: "blur"
          }
        ],
        devices: [
          {
            required: true,
            message: "客户端不能为空"
            // trigger: "change",
            // type: "array",
          }
        ],
        payName: [
          {
            required: true,
            message: "支付名称不能为空",
            trigger: "blur"
          }
        ],
        min_amount: [
          {
            required: true,
            message: "最小支付金额不正确",
            trigger: "blur",
            type: "number"
          }
        ],
        max_amount: [
          {
            required: true,
            message: "最大支付金额不正确",
            trigger: "blur",
            type: "number"
          }
        ],
        levelId: [
          {
            // type: "array",
            required: true,
            message: "等级不能为空",
            trigger: "blur"
          }
        ],
        siteId: [
          {
            pattern: /^.*$/,
            required: true,
            message: "站点名称不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.CreatPaymentQRCode.created_user = this.$root.adminuserinfo.adminUserName;
  },
  mounted() {
    this.$nextTick(() => {
      Promise.all([this.$refs.PayClassSelect.InitData()]).then(() => {
        if (
          this.$route.query &&
          this.$route.query.isVerify &&
          this.$route.query.QRCodeId
        ) {
          this.bannerShow = true;
          this.isVerifyFn(this.$route.query.QRCodeId,this.$route.query.siteId);
        }
      });
      // }
    });
  },
  methods: {
    filterStaticPath(siteId) {
      let target = this.$root.staticsPathArr.filter(
        item => item.siteId === siteId
      )[0];
      return target.path;
    },
    refresh() {
      //图片上传成功
      this.CreatPaymentQRCode.qr_code = this.uploadData.path;
    },
    isVerifyFn(id,siteId) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Show_QR_code, {
          QRCodeId: id,
          siteId: siteId
        })
        .then(res => {
          for (let key in this.CreatPaymentQRCode) {
            this.CreatPaymentQRCode[key] = res.data.data[key];
          }
          this.$refs.LevelSelect.setDefaultLevel(
            res.data.data["levelId"].split(",").map(res => +res)
          );
          this.devices = res.data.data["devices"].split(",").map(res => {
            return res;
          });
          this.$set(this.PayClassSelectOfQR, "data", {});
          this.PayClassSelectOfQR.data.id = res.data.data["classId"];
          let path = this.filterStaticPath(res.data.data.siteId);
          this.BannerUrl = path + res.data.data.qr_code;
          this.sendUrl = res.data.data.qr_code;
          this.$refs.SiteNameSelect.setDefaultSite(res.data.data["siteId"]);

          this.CreatPaymentQRCode.min_amount = Number(
            res.data.data["min_amount"]
          );
          this.CreatPaymentQRCode.max_amount = Number(
            res.data.data["max_amount"]
          );

          this.CreatPaymentQRCode.QRCodeId = res.data.data["id"];
          this.CreatPaymentQRCode.updated_user = this.$root.adminuserinfo.adminUserName;
        });
    },
    siteChange(re) {
      //站点等级选择
      if (re.SiteId) {
        this.CreatPaymentQRCode.siteId = re.SiteId;
        this.CreatPaymentQRCode.siteName = re.SiteName;
        this.uploadData.siteId = re.SiteId;
        this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberLevelModel");
      }
    },
    mechangeZhiFuFenZu(re) {
      //支付分组选择
      this.CreatPaymentQRCode.classId = re.id;
      this.CreatPaymentQRCode.className = re.className;
    },
    levelChange(re) {
      if (re) {
        this.levelId = [...re.levelLabel];
        this.CreatPaymentQRCode.levelId = this.levelId.toString();
      }
    },
    mechangeHuiYuanDengJi(re) {
      //会员等级选择
      this.levelId = [...re.id];
      this.CreatPaymentQRCode.levelId = this.levelId.toString();
    },
    gengHuanTuPian() {
      this.bannerShow = !this.bannerShow;
      if (this.bannerShow) {
        //取消更换
        this.CreatPaymentQRCode.qr_code = this.sendUrl;
      } else {
        this.CreatPaymentQRCode.qr_code = "";
      }
    },
    ShangChuanTuPian() {
      this.uploadData.upload = true;
    },
    CreatingQRcode() {
      this.CreatPaymentQRCode.devices = this.devices.toString();
      this.$refs.CreatPaymentQRCode.validate(valid => {
        if (valid) {
          this.$root.loading();
          if (this.$route.query && this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_Update_QR_code,
                this.CreatPaymentQRCode
              )
              .then(res => {
                this.$Spin.hide();
                this.$root.modal("success", "", res.data.data);
              })
              .catch(res => {
                this.$Spin.hide();
              });
          } else {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_Create_QR_code,
                this.CreatPaymentQRCode
              )
              .then(res => {
                this.$Spin.hide();
                this.$root.modal("success", "", res.data.data);
              })
              .catch(res => {
                this.$Spin.hide();
              });
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.binding {
  div {
    display: inline;
  }
}

.ShangChuanT {
  height: 150px;
  width: 300px;
  background: #eee;
  border-radius: 3px;
  padding: 10px;
  margin-top: 20px;
  text-align: center;

  img {
    height: 100%;
    width: auto;
    max-width: 100%;
  }
}

.file-list {
  .file-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 1000;
  }

  .file-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    width: 90%;

    .content-main {
      background-color: #fff;

      .have_con {
        .ivu-scroll-container {
          width: 90%;
        }
      }
    }
  }
}
</style>