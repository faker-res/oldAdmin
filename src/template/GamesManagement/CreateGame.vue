<template>
  <div class="content-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1 form-t">
        <Form ref="CreatGameForm" style="max-width:60%" :model="CreatGameForm" :rules="CreatGameFormRules" :label-width="120">
          <FormItem label="创建人">
            <i-input placeholder="请输入创建人" :disabled="true" v-model="CreatGameForm.created_user" style="width:260px"></i-input>
          </FormItem>
          <FormItem label="游戏名称" prop="name">
            <i-input style="width:260px" v-model="CreatGameForm.name" placeholder="游戏名称"></i-input>
          </FormItem>
          <FormItem label="游戏编号" prop="code">
            <i-input style="width:260px" v-model="CreatGameForm.code" placeholder="游戏编号"></i-input>
          </FormItem>
          <!-- <FormItem label="游戏分类ID" prop="classId">
                        <i-input style="width:360px" v-model="CreatGameForm.classId" placeholder="游戏分类ID"></i-input>
                    </FormItem> -->
          <!-- <FormItem label="游戏分类" prop="classId">
            <Select v-model="CreatGameForm.classId" style="width:260px" :label-in-value='true' @on-change="gameClassChange">
              <Option v-for="item in gameClassList" :value="item.id" :key="item.id" :label='item.name'>{{ item.name }}</Option>
            </Select>
          </FormItem> -->
          <!-- <FormItem label="游戏类型">
            <Cascader :data="gameClassData" v-model="gameClassValue" trigger="hover" style="width:260px" @on-change='gameClassChange'></Cascader>
          </FormItem> -->
          <FormItem label="游戏类型">
            <GameClassSelect ref="GameClassSelect" :GameClassSelectData="GameClassSelectData" @listenOnChange='listenOnChange' />
          </FormItem>
          <FormItem label="客户端" prop="devices">
            <!-- <Checkbox v-model="platformAll">Checkbox</Checkbox> -->
            <CheckboxGroup v-model="devices" @on-change="devicesChange">
              <Checkbox label="all">全部</Checkbox>
              <Checkbox label="pc" :disabled="devicesDisabled">PC</Checkbox>
              <Checkbox label="h5" :disabled="devicesDisabled">H5</Checkbox>
              <Checkbox label="android" :disabled="devicesDisabled">安卓</Checkbox>
              <Checkbox label="ios" :disabled="devicesDisabled">IOS</Checkbox>
              <Checkbox label="other" :disabled="devicesDisabled">其他</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <!-- <FormItem label="平台" prop="platform">
            <RadioGroup v-model="CreatGameForm.platform">
              <Radio label="sport">体育赛事</Radio>
              <Radio label="slot">电子游戏</Radio>
              <Radio label="chess">棋牌</Radio>
              <Radio label="lottery">彩票游戏</Radio>
              <Radio label="vr_lottery">VR彩票</Radio>
              <Radio label="live_casino">真人视讯</Radio>
              <Radio label="other">其他</Radio>
            </RadioGroup>
          </FormItem> -->
          <FormItem label="标签" prop="tag">
            <CheckboxGroup v-model="tag" size="large">
              <Checkbox label="FAVORITE">常用</Checkbox>
              <Checkbox label="HOT">热门</Checkbox>
              <Checkbox label="RECOMMOND">推荐</Checkbox>
              <div v-show="CreatGameForm.platform === 'slot'">
                <div v-show="CreatGameForm.className === 'AG电子'">
                  <div>
                    <Checkbox label="NEW">最新游戏</Checkbox>
                    <Checkbox label="HOT">热门游戏</Checkbox>
                    <Checkbox label="SLO">老虎机</Checkbox>
                    <Checkbox label="MAX">大额投注</Checkbox>
                    <Checkbox label="MIN">小额投注</Checkbox>
                    <Checkbox label="FRT">经典拉霸</Checkbox>
                    <Checkbox label="CLH">消消乐</Checkbox>
                  </div>
                  <div>
                    <Checkbox label="5-10">5-10线</Checkbox>
                    <Checkbox label="15-20">15-20线</Checkbox>
                    <Checkbox label="25-30">25-30线</Checkbox>
                    <Checkbox label="MOR">更多</Checkbox>
                  </div>
                </div>
                <div v-show="CreatGameForm.className === 'BBIN电子'">
                  <Checkbox label="NEW">最新游戏</Checkbox>
                  <Checkbox label="HOT">热门游戏</Checkbox>
                  <Checkbox label="SLO">老虎机</Checkbox>
                  <Checkbox label="SCR">刮刮乐</Checkbox>
                  <Checkbox label="TBL">桌上游戏</Checkbox>
                  <Checkbox label="LMC">大型机台</Checkbox>
                </div>
                <div v-show="CreatGameForm.className === 'CQ9电子'">
                  <div>
                    <Checkbox label="NEW">最新游戏</Checkbox>
                    <Checkbox label="HOT">热门游戏</Checkbox>
                    <Checkbox label="SLO">老虎机</Checkbox>
                    <Checkbox label="FSH">捕鱼游戏</Checkbox>
                  </div>
                  <div>
                    <Checkbox label="1-1">单线</Checkbox>
                    <Checkbox label="5-10">5-10线</Checkbox>
                    <Checkbox label="15-20">15-20线</Checkbox>
                    <Checkbox label="243">243游戏</Checkbox>
                  </div>
                </div>
                <div v-show="CreatGameForm.className === 'DT电子' || CreatGameForm.className === 'MG电子'">
                  <div>
                    <Checkbox label="NEW">最新游戏</Checkbox>
                    <Checkbox label="HOT">热门游戏</Checkbox>
                    <Checkbox label="CLA">经典游戏</Checkbox>
                    <Checkbox label="JPT">奖池游戏</Checkbox>
                    <Checkbox label="SLO">老虎机</Checkbox>
                  </div>
                  <div>
                    <Checkbox label="1-1">单线</Checkbox>
                    <Checkbox label="5-10">5-10线</Checkbox>
                    <Checkbox label="15-20">15-20线</Checkbox>
                    <Checkbox label="243">243游戏</Checkbox>
                    <Checkbox label="MOR">更多</Checkbox>
                  </div>
                </div>
                <div v-show="CreatGameForm.className === 'PT电子'">
                  <div>
                    <Checkbox label="NEW">最新游戏</Checkbox>
                    <Checkbox label="HOT">热门游戏</Checkbox>
                    <Checkbox label="CLA">经典游戏</Checkbox>
                    <Checkbox label="JPT">奖池游戏</Checkbox>
                    <Checkbox label="SLO">老虎机</Checkbox>
                    <Checkbox label="ANI">卡通</Checkbox>
                    <Checkbox label="RCK">洛奇</Checkbox>
                    <Checkbox label="GIR">少女</Checkbox>
                  </div>
                  <div>
                    <Checkbox label="1-1">单线</Checkbox>
                    <Checkbox label="5-10">5-10线</Checkbox>
                    <Checkbox label="15-20">15-20线</Checkbox>
                    <Checkbox label="243">243游戏</Checkbox>
                    <Checkbox label="MOR">更多</Checkbox>
                  </div>
                </div>
                <div v-show="CreatGameForm.className === 'TTG电子'">
                  <div>
                    <Checkbox label="NEW">最新游戏</Checkbox>
                    <Checkbox label="HOT">热门游戏</Checkbox>
                    <Checkbox label="CLA">经典游戏</Checkbox>
                    <Checkbox label="SLO">老虎机</Checkbox>
                  </div>
                  <div>
                    <Checkbox label="1-1">单线</Checkbox>
                    <Checkbox label="5-10">5-10线</Checkbox>
                    <Checkbox label="15-20">15-20线</Checkbox>
                    <Checkbox label="243">243游戏</Checkbox>
                    <Checkbox label="MOR">更多</Checkbox>
                  </div>
                </div>

              </div>
            </CheckboxGroup>
            <!-- <RadioGroup v-model="CreatGameForm.tag">
                        <Radio label="HOT">热门</Radio>
                        <Radio label="FAVORITE">常用</Radio>
                        <Radio label="RECOMMOND">推荐</Radio>
                        <Radio label="CLASSIC">经典</Radio>
                        <Radio label="VIDEO_SLOTS">电动吃角子</Radio>
                      </RadioGroup> -->
          </FormItem>
          <FormItem label="排序" prop='sequence'>
            <i-input style="width:260px" v-model="CreatGameForm.sequence" placeholder="排序"></i-input>
          </FormItem>
          <FormItem label="H5菜单显示" prop='isSelect'>
            <Select v-model="CreatGameForm.isSelect" style="width:260px">
              <Option value="yes">开启</Option>
              <Option value="no">关闭</Option>
            </Select>
          </FormItem>
          <FormItem label="状态" prop='status'>
            <Select v-model="CreatGameForm.status" style="width:260px">
              <Option v-for="item in StatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="图片" prop="upload">
            <div v-if="bannerShow">
              <img :src="BannerUrl" />
              <a href="javascript:" @click="gengHuanTuPian">更换图片</a>
            </div>
            <div v-else>
              <a v-if="$route.query.isVerify" href="javascript:" @click="gengHuanTuPian">取消更换</a>
              <div class="image-editor">
                <input v-show="0" ref="UploadImg" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange1" id="fileinput1" class="fileinput" />
                <Button v-show="!imgInfo.imgurl" type="primary" @click="ShangChuanTuPian" icon="image">上传</Button>
                <Button v-show="imgInfo.imgurl" type="primary" @click="ShangChuanTuPian" icon="image">重新上传</Button>
                <span v-show="imgInfo.imgurl">文件名称为：{{imgInfo.imgname}}</span>
                <span v-show="imgInfo.imgurl">文件大小为：{{imgInfo.imgsize}}</span>
                <a href="javascript:" v-show="imgInfo.imgurl" @click="funDeleteFile">删除</a>
              </div>
              <div class="ShangChuanT">
                <div v-show="!imgInfo.imgurl" @click="ShangChuanTuPian" style="line-height:150px;cursor:pointer">请上传图片</div>
                <img :src="imgInfo.imgurl" alt="" v-if="imgInfo.imgurl" width="200px" height="200px">
              </div>
              图片档案大小不超过2M，必需为*.png,*.jpg
            </div>
          </FormItem>
          <FormItem label="特殊设置">
            <i-input v-model="CreatGameForm.special_setting" type="textarea" :rows="6" style="width:260px"></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="CreatMemberBankSubmit()">提交</Button>
            <Button @click="$root.go_back">取消</Button>
            <Button @click="$router.push({name:'GamesManger'})">游戏列表</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import GameClassSelect from "@/template/my-components/GameClassSelect.vue";
export default {
  components: {
    GameClassSelect
  },
  data() {
    return {
      BannerUrl: "",
      bannerShow: false,
      gameClassValue: [],
      GameClassSelectData: {
        style: {
          width: "260px"
        }
      },
      devices: ["all"],
      devicesDisabled: true,
      CreatGameForm: {
        name: "",
        code: "",
        classId: "",
        className: "",
        devices: "all",
        tag: "",
        sequence: "",
        status: "yes",
        created_user: "",
        special_setting: "{}",
        images: null,
        platform: "",
        isSelect: "no"
      },
      tag: ["FAVORITE"],
      imgInfo: {
        imgurl: "",
        imgsize: "",
        imgpx: "",
        imgname: ""
      },
      StatusList: [
        {
          value: "yes",
          label: "开启"
        },
        {
          value: "no",
          label: "关闭"
        }
      ],
      CreatGameFormRules: {
        name: [
          {
            required: true,
            message: "游戏名称不能为空！",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "游戏编号不能为空！",
            trigger: "blur"
          }
        ],
        classId: [
          {
            required: true,
            message: "分类ID不能为空！",
            trigger: "blur",
            pattern: /^.*$/
          }
        ],
        isSelect: [
          {
            required: true,
            message: "状态不正确！",
            trigger: "blur"
          }
        ],
        devices: [
          {
            required: true,
            message: "设备不能为空！",
            trigger: "blur"
          }
        ],
        // tag: [{
        //   required: true,
        //   message: "标签不能为空！",
        //   trigger: "blur"
        // }],
        sequence: [
          {
            required: true,
            message: "排序不能为空！",
            trigger: "blur",
            pattern: /^.*$/
          }
        ],
        status: [
          {
            required: true,
            message: "状态不正确！",
            trigger: "blur"
          }
        ],
        platform: [
          {
            required: true,
            message: "设备不能为空！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  created() {
    this.CreatGameForm.created_user = this.$root.adminuserinfo.adminUserName;
  },
  mounted() {
    this.$nextTick(() => {
      Promise.all([this.$refs.GameClassSelect.InitData()]).then(() => {
        if (
          this.$route.query &&
          this.$route.query.id &&
          this.$route.query.isVerify
        ) {
          this.bannerShow = true;
          this.isVerifyFn(this.$route.query.id);
        }
      });
    });
  },
  methods: {
    devicesChange(v) {
      if (v.lastIndexOf("all") !== -1) {
        this.devicesDisabled = true;
        this.devices = ["all"];
      } else {
        this.devicesDisabled = false;
      }
    },
    listenOnChange(v, selectedData) {
      this.tag = ["FAVORITE"];
      this.gameClassValue = v;
      this.CreatGameForm.platform = v[0];
      this.CreatGameForm.className = selectedData[1].label;
      this.CreatGameForm.classId = selectedData[1].value;
    },
    isVerifyFn(id) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouXiXiangQing, {
          gameId: id
        })
        .then(res => {
          for (let key in this.CreatGameForm) {
            this.CreatGameForm[key] = res.data.data[key];
            if (key == "sequence") {
              this.CreatGameForm[key] = res.data.data[key] + "";
            }
          }
          this.CreatGameForm.images = "";
          this.tag = res.data.data.tag.split(",");
          this.devices = res.data.data.devices.split(",");
          this.devicesDisabled = false;
          this.CreatGameForm.gameId = res.data.data.id;
          this.CreatGameForm.updated_user = this.$root.adminuserinfo.adminUserName;
          this.gameClassValue = [res.data.data.platform, res.data.data.classId];
          this.$set(this.GameClassSelectData, "data", this.gameClassValue);
          this.BannerUrl = res.data.data.images;
        });
    },
    gengHuanTuPian() {
      this.bannerShow = !this.bannerShow;
      if (this.bannerShow) {
        // this.CreatGameForm.images = this.BannerUrl;
        this.CreatGameForm.images = "";
        this.imgInfo.imgurl = "";
        this.$refs.UploadImg.value = "";
      } else {
        // this.CreatGameForm.images = "";
      }
    },
    // gameClassChange(v, selectedData) {
    //   // this.CreatGameForm.className = re.label;
    //   this.CreatGameForm.className = selectedData[1].label;
    //   this.CreatGameForm.classId = selectedData[1].value;
    // },
    mechange(er) {
      this.CreatGameForm.userName = er.userName;
      this.CreatGameForm.uid = er.id;
    },
    handleChange1(e) {
      var that = this;
      let file = e.target.files[0];
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
          this.CreatGameForm.images = file;
          reader.onload = null;
        };
        reader.readAsDataURL(file);
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
      this.CreatGameForm.images = "";
    },
    CreatMemberBankSubmit() {
      var that = this;
      this.CreatGameForm.tag = this.tag.join();
      this.CreatGameForm.devices = this.devices.join();
      this.$refs.CreatGameForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          var data = new FormData();
          for (let key in this.CreatGameForm) {
            if (this.CreatGameForm[key] != "")
              data.append(key, this.CreatGameForm[key]);
          }
          if (this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XiuGaiYouXi, data)
              .then(
                res => {
                  this.$Spin.hide();
                  this.$root.modal("success", "", res.data.data);
                },
                res => {
                  this.$Spin.hide();
                }
              );
          } else {
            this.$root
              .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ChuangJianYouXi, data)
              .then(
                res => {
                  this.$Spin.hide();
                  that.$Message.success(res.data.data);
                  this.CreatGameForm.name = "";
                },
                res => {
                  this.$Spin.hide();
                }
              );
          }
        } else {
          this.$root.modal("error", "", "请填写完整的表单内容！");
        }
      });
    }
  },
  watch: {
    "CreatGameForm.platform"(value, old) {
      if (old === "slot") {
        this.tag = ["FAVORITE"];
      }
    }
    // gameClassValue(value, old) {
    //   this.CreatGameForm.platform = value[0]
    // }
  }
};
</script>

<style scoped lang="less">
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

.ivu-checkbox-wrapper {
  font-size: 16px;
}
</style>