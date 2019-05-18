<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          <div v-if="$route.query.type === 'out'">系统出款卡</div>
          <div v-else>系统入款卡</div>
          <span v-if="$route.query.isVerify">修改</span>
          <span v-else>新增</span>
        </h1>
      </div>
      <div class="page-con1">
        <div>
          <Form ref="CreatSystemOutPayMent" :model="CreatSystemOutPayMent" :rules="CreatSystemOutPayMentRelus" :label-width="180">
            <FormItem label="创建人">
              <i-input placeholder="请输入创建人" :disabled="true" v-model="CreatSystemOutPayMent.addUserName" style="width:260px"></i-input>
            </FormItem>

            <FormItem label="站点" prop="siteId">
              <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
            </FormItem>
            <FormItem label="会员等级" prop="level">
              <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMultiple" v-on:listenLevelChange="levelChange"></LevelSelect>
            </FormItem>

            <FormItem label="银行名称" prop="bankName">
              <!-- <Select v-model="CreatSystemOutPayMent.bankName" style="width:260px">
                <Option v-for="(item,i) in bankList" :value="item.bankName" :key="i">{{ item.bankName }}</Option>
              </Select> -->
              <BankSelect ref='BankSelect' @listenOnChange="bankChange" :BankSelectData="BankSelectData"></BankSelect>
            </FormItem>

            <FormItem label="银行所属人" prop="cardName">
              <i-input v-model="CreatSystemOutPayMent.cardName" style="width:260px" placeholder="请输入银行所属人"></i-input>
            </FormItem>

            <FormItem label="银行卡号" prop="cardNum">
              <i-input v-model="CreatSystemOutPayMent.cardNum" style="width:260px" placeholder="请输入银行卡号"></i-input>
            </FormItem>

            <FormItem label="银行卡地址" prop="cardAddress">
              <i-input v-model="CreatSystemOutPayMent.cardAddress" style="width:260px" placeholder="请输入银行卡地址"></i-input>
            </FormItem>
            <FormItem label="状态">
              <Select v-model="CreatSystemOutPayMent.status" style="width:260px">
                <Option v-for="item in Status" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button @click="CreatingPreferen" :loading='$root.btnLoading' type="primary">确定提交</Button>
              <Button v-if="$route.query.type === 'out'" @click="$router.push({name:'SystemOutPaymentCard'})">系统出款列表</Button>
              <Button v-if="$route.query.type === 'in'" @click="$router.push({name:'SystemInPaymentCard'})">系统入款列表</Button>
              <Button @click="$root.go_back">返回</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/create";
import BankSelect from "@/template/my-components/BankSelect.vue";
export default {
  name: "CreatSystemOutPayMent",
  mixins: [mixins],
  components:{ BankSelect },
  data() {
    return {
      bannerShow: false,
      BannerUrl: "",
      files: null,
      btnLoading: false,
      // bankNameList: [],
      imgInfo: {
        imgurl: "",
        imgsize: "",
        imgpx: "",
        imgname: "",
        isShow: false
      },
      CreatSystemOutPayMent: {
        siteId: null,
        siteName: "",
        bankName: "",
        cardName: "",
        status: "enabled",
        cardNum: "6217000010036589954",
        cardImg: null,
        bankType: this.$route.query.type,
        cardAddress: "",
        level: [],
        addUserName: ""
      },
      BankSelectData: {
        placeholder: "请输入银行名称",
        style: {
          width: "260px"
        }
      },
      WebSiteList: [],
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
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        bankName: [
          {
            required: true,
            message: "银行名不能为空",
            trigger: "blur"
          }
        ],
        cardName: [
          {
            required: true,
            message: "银行所属人不能为空",
            trigger: "blur"
          }
        ],
        cardAddress: [
          {
            required: true,
            message: "银行开卡地址不能为空",
            trigger: "blur"
          }
        ],
        cardNum: [
          {
            required: true,
            message: "银行卡号不能为空",
            trigger: "blur"
          }
        ],
        level: [
          {
            type: "array",
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
    this.CreatSystemOutPayMent.addUserName = this.$root.adminuserinfo.adminUserName;
  },
  mounted() {
    this.$nextTick(() => {
      // Promise.all([this.getBankName()]).then(() => {
        if (
          this.$route.query &&
          this.$route.query.systemBankId &&
          this.$route.query.isVerify
        ) {
          this.bannerShow = true;
          this.isVerifyFn();
        }
      // });
    });
  },
  methods: {
    isVerifyFn() {
      let url = this.$root.HTTP_L.HTTP_ChuRuKuanKaXiangQing;
      let params = {
        siteId: this.$route.query.siteId,
        systemBankId: this.$route.query.systemBankId,
      }
      this.$root
        .HTTP_ALLLINKPOST(url,params)
        .then(res => {
          for (let key in this.CreatSystemOutPayMent) {
            this.CreatSystemOutPayMent[key] = res.data.data[key];
          }
          this.BannerUrl = res.data.data.cardImg;
          this.$refs.BankSelect.setDefaultBank(res.data.data.bankName);
          this.$refs.SiteNameSelect.setDefaultSite(res.data.data.siteId);
          this.$refs.LevelSelect.setDefaultLevel(
            res.data.data["level"].split(",").map(res => +res)
          );
          this.CreatSystemOutPayMent.systemBankId = res.data.data["id"];
          this.CreatSystemOutPayMent.updateUserName = this.$root.adminuserinfo.adminUserName;
        });
    },
    // async getBankName() {
    //   await this.$root
    //     .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuYinHangLieBiao)
    //     .then(res => {
    //       this.bankNameList = res.data.data;
    //     });
    // },
    //re为银行名字
    bankChange(re){
      if(re) this.CreatSystemOutPayMent.bankName = re;
    },
    siteChange(re) {
      //站点等级选择
      if (re.SiteId) {
        this.CreatSystemOutPayMent.siteId = re.SiteId;
        this.CreatSystemOutPayMent.siteName = re.SiteName;
        this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberLevelModel");
      }
    },
    levelChange(re) {
      //会员等级选择
      this.CreatSystemOutPayMent.level = [...re.levelLabel];
    },
    handleChange1(e) {
      var that = this;
      let file = e.target.files[0];
      this.files = e.target.files[0];
      let reader = new FileReader();
      let fileType = this.getFileType(e.target.files[0].name);
      if (
        fileType != "jpg" &&
        fileType != "jpeg" &&
        fileType != "bmp" &&
        fileType != "png" &&
        fileType != "gif"
      ) {
        this.$Message.warning(
          `图片${file.name}'上传失败，上传的文件格式不正确！`
        );
        return;
      } else if (file.size > 1024000 * 2) {
        this.$Message.warning(
          `'图片'${
            file.name
          }'上传失败，上传的文件格式为大小不超过2M的JPG、PNG、文件！'`
        );
        return;
      } else {
        reader.onload = () => {
          this.imgInfo.imgurl = reader.result;
          this.imgInfo.imgsize = (file.size / 1024000).toFixed(2) + "M";
          this.imgInfo.imgname = file.name;
          this.imgInfo.isShow = true;
          this.CreatSystemOutPayMent.cardImg = file;
          reader.onload = null;
        };
        reader.readAsDataURL(file);
      }
    },
    gengHuanTuPian() {
      this.bannerShow = !this.bannerShow;
      if (this.bannerShow) {
        this.CreatSystemOutPayMent.cardImg = this.BannerUrl;
        this.imgInfo.imgurl = "";
        this.$refs.UploadImg.value = "";
      } else {
        this.CreatSystemOutPayMent.cardImg = "";
      }
    },
    ShangChuanTuPian() {
      this.$refs.UploadImg.click();
    },
    getFileType(filePath) {
      var startIndex = filePath.lastIndexOf(".");
      if (startIndex != -1) {
        return filePath
          .substring(startIndex + 1, filePath.length)
          .toLowerCase();
      } else return "";
    },
    funDeleteFile(fileDelete) {
      this.imgInfo.imgurl = "";
      this.imgInfo.imgsize = "";
      this.imgInfo.imgname = "";
      this.imgInfo.isShow = false;
      this.$refs.UploadImg.value = "";
      this.CreatSystemOutPayMent.cardImg = "";
    },
    CreatingPreferen() {
      this.$refs.CreatSystemOutPayMent.validate(valid => {
        if (valid) {
          this.$root.loading();
          var data = new FormData();
          for (let key in this.CreatSystemOutPayMent) {
            data.append(key, this.CreatSystemOutPayMent[key]);
          }
          if (this.$route.query && this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_XiuGaiXiTongChuRuKuanKa,
                data
              )
              .then(res => {
                this.$Spin.hide();
                // this.$refs.CreatSystemOutPayMent.resetFields();
                this.$root.modal("success", "", res.data.data);
                // this.CreatSystemOutPayMent.userName++;
              })
              .catch(res => {
                this.$Spin.hide();
              });
          } else {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_XinZengXiTongChuRuKuanKa,
                data
              )
              .then(res => {
                this.$Spin.hide();
                // this.$refs.CreatSystemOutPayMent.resetFields();
                this.$root.modal("success", "", res.data.data);
                // this.CreatSystemOutPayMent.userName++;
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
</style>
