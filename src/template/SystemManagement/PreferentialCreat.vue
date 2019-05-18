<template>
  <div class="content-main PromotionManagementCreate-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          优惠管理
          <span v-if="$route.query.isVerify">修改</span>
          <span v-else>新增</span>
          <span> Bao-威尼斯人 </span>
        </h1>
      </div>
      <div class="page-con1">
        <Form ref="PromotionManagementCreate" :model="PromotionManagementCreate" :rules="PromotionManagementCreateRules" :label-width="180">
          <FormItem label="优惠名称" prop="title">
            <i-input style="width:260px" v-model="PromotionManagementCreate.title" placeholder="优惠名称"></i-input>
          </FormItem>
          <!-- <FormItem label="分类" prop="FenLei">
            <Select v-model="PromotionManagementCreate.FenLeiChoice" style="width:200px">
              <Option v-for="(item,index) in PromotionManagementCreate.FenLeiList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </FormItem> -->
          <!-- <FormItem label="站点" prop="siteId">
            <Select v-model="PromotionManagementCreate.siteId" style="width:50%">
              <Option v-for="item in WebSiteList" :value="item.id" :key="item.value">{{ item.siteName }}</Option>
            </Select>
          </FormItem> -->
          <FormItem label="站点" prop="siteId">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>
          <FormItem label="优惠分类">
            <Select v-model="PromotionManagementCreate.classId" multiple style="width:260px">
              <Option v-for="item in preferentialClassId" :value="item.id-0" :key="item.id">{{ item.className }}</Option>
            </Select>
            <!-- <i-input style="width:50%" v-model="PromotionManagementCreate.classId"></i-input> -->
          </FormItem>
          <FormItem label="创建方式">
            <RadioGroup v-model="PromotionManagementCreate.type">
              <Radio label="manually">手动</Radio>
              <Radio label="automatic">自动</Radio>
              <Radio label="review">审核</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="程序处理模块" prop='url'>
            <i-input style="width:260px" v-model="PromotionManagementCreate.url"></i-input>
            <p v-if="0">
              <a target="_blank" :href="PromotionManagementCreate.url">{{PromotionManagementCreate.url}}</a>
            </p>
          </FormItem>
          <FormItem label="优惠活动链接" prop='jump_link'>
            <i-input style="width:260px" v-model="PromotionManagementCreate.jump_link"></i-input>
            <p v-if="0">
              <a target="_blank" :href="PromotionManagementCreate.url">{{PromotionManagementCreate.jump_link}}</a>
            </p>
          </FormItem>
          <!-- <FormItem label="游戏分类ID">
            <i-input style="width:50%" v-model="PromotionManagementCreate.shield_game_class"></i-input>
          </FormItem> -->
          <FormItem label="禁止游戏分类">
            <Select v-model="PromotionManagementCreate.shield_game_class" multiple style="width:260px" :label-in-value='true' @on-change="shieldGameClassChange">
              <Option v-for="item in shieldGameClassList" :value="item.id-0" :key="item.id">{{ item.name }}</Option>
            </Select>
            <!-- <i-input style="width:50%" v-model="PromotionManagementCreate.shield_game"></i-input> -->
          </FormItem>
          <FormItem label="允许游戏分类">
            <Select v-model="PromotionManagementCreate.allow_game_class" multiple style="width:260px" :label-in-value='true' @on-change="allowGameClassChange">
              <Option v-for="item in shieldGameClassList" :value="item.id-0" :key="item.id">{{ item.name }}</Option>
            </Select>
            <!-- <i-input style="width:50%" v-model="PromotionManagementCreate.allow_game_class"></i-input> -->
          </FormItem>
          <!-- <FormItem label="允许游戏">
            <i-input style="width:50%" v-model="PromotionManagementCreate.allow_game"></i-input>
          </FormItem> -->
          <FormItem label="排序" prop="sequence">
            <i-input style="width:260px" v-model="PromotionManagementCreate.sequence" placeholder="排序"></i-input>
          </FormItem>
          <!-- <FormItem label="banner图">
            <Upload :on-progress="handleProgress" :showUploadList='false' ref="upload" :on-error="handleFormatError" :on-format-error="handleFormatError" accept="image/png, image/jpeg, image/gif, image/jpg" :on-success="handleSuccess" :on-exceeded-size="handleMaxSize" :max-size="2048" action="//jsonplaceholder.typicode.com/posts/">
              <Button type="ghost" icon="image">上传banner</Button>
            </Upload>
            <div class="ShangChuanT">
              <img :src="BannerUrl" alt="" v-if="BannerUrl">
            </div>
          </FormItem> -->
          <!-- <FormItem label="优惠banner图" prop="qrcode">
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
          </FormItem> -->
          <FormItem label="优惠banner图" prop="qrcode">
            <div v-if="bannerShow">
              <img :src="BannerUrl" />
              <a href="javascript:" @click="gengHuanTuPian">更换图片</a>
            </div>
            <div v-else>
              <a v-if="$route.query.isVerify" href="javascript:" @click="gengHuanTuPian">取消更换</a>
              <div class="image-editor">
                <input v-show="0" ref="UploadImg" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange1" id="fileinput1" class="fileinput" />
                <Button v-show="!imgInfo.isShow" type="primary" @click="ShangChuanTuPian" icon="image">上传</Button>
                <Button v-show="imgInfo.isShow" type="primary" @click="ShangChuanTuPian" icon="image">重新上传</Button>
                <span v-show="imgInfo.isShow">文件名称为：{{imgInfo.imgname}}</span>
                <span v-show="imgInfo.isShow">文件大小为：{{imgInfo.imgsize}}</span>
                <a href="javascript:" v-show="imgInfo.isShow" @click="funDeleteFile">删除</a>
              </div>
              <div class="ShangChuanT">
                <div v-show="!imgInfo.isShow" @click="ShangChuanTuPian" style="line-height:150px;cursor:pointer">请上传图片</div>
                <img :src="imgInfo.imgurl" alt="" v-if="imgInfo.isShow" width="200px" height="200px">
              </div>
              图片档案大小不超过2M，必需为*.png,*.jpg
            </div>
          </FormItem>
          <FormItem label="上架时间" prop="ShangJiaShiJian">
            <DatePicker :value="PromotionManagementCreate.star_date" @on-change="timeChange('star',$event)" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="留空表示立即上架" style="width: 200px"></DatePicker>
            -
            <DatePicker :value="PromotionManagementCreate.end_date" @on-change="timeChange('end',$event)" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="留空表示永不下架" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="备注" prop="remarks">
            <i-input type="textarea" :row="3" style="width:50%" v-model="PromotionManagementCreate.remarks"></i-input>
          </FormItem>
          <FormItem label="是否启用">
            <i-switch v-model="IsStar" @on-change="changeYh('qiyong',$event)"></i-switch>
          </FormItem>

          <FormItem label="显示会员中心">
            <i-switch v-model="IsStarMember" @on-change="changeYh('xianshi',$event)"></i-switch>
          </FormItem>
          <!-- <FormItem label="是否启用">

            <i-switch v-model="PromotionManagementCreate.DianNaoKaiGuan" @on-change="change"></i-switch>
            <Icon :size="25" style="vertical-align: -6px;" type="monitor"></Icon> 电脑版

            <i-switch v-model="PromotionManagementCreate.ShouJiKaiGuan" @on-change="change"></i-switch>
            <Icon :size="25" style="vertical-align: -6px;" type="ipad"></Icon> 手机版

          </FormItem> -->
          <FormItem label="优惠内容" prop="content">
            <!-- <div id="ueditor" type="text/plain"></div> -->
            <!-- <textarea class='tinymce-textarea' id="tinymceEditer"></textarea> -->
            <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
            <Spin fix v-if="spinShow">
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              <div>加载组件中...</div>
            </Spin>
          </FormItem>
          <FormItem>
            <Button :loading="$root.btnLoading" @click="QueDingFaBuYouHui" type="primary">确定发布</Button>
            <Button @click="QingKongBianJi" icon="android-delete" type="error">清空</Button>
            <Button @click="$root.go_back">返回</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";
// import tinymce from "tinymce";
export default {
  components: { SiteNameSelect },
  data() {
    return {
      SiteNameSelectData: {
        default: true,
        type: "单选",
        placeholder: "请输入站点名称",
        style: { width: "260px" }
      },
      // WebSiteList: [],
      bannerShow: false,
      imgInfo: {
        imgurl: "",
        imgsize: "",
        imgpx: "",
        imgname: "",
        isShow: false
      },
      preferentialClassId: [],
      shieldGameClassList: [],
      IsStar: false,
      IsStarMember: false,
      PromotionManagementCreate: {
        siteId: null,
        siteName: "",
        title: "优惠名称",
        content: "",
        type: "manually",
        classId: [],
        url: "",
        shield_game_class: [],
        shield_game: [],
        allow_game_class: [],
        allow_game: [],
        sequence: "",
        showMemberCenter: "yes",
        status: "yes",
        remarks: "备注信息",
        star_date: "",
        end_date: "",
        createUserName: "",
        img: null,
        jump_link: ""
      },
      PromotionManagementCreateRules: {
        title: [
          {
            required: true,
            message: "请输入优惠名称！",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入优惠内容！",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "url不能为空",
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
      },
      UploadList: {},
      BannerUrl: "",
      // ue: ""
      spinShow: true
    };
  },
  created() {
    this.$root
      .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouHuiFenZuJiLu)
      .then(res => {
        this.preferentialClassId = res.data.data.data;
      });
    this.$root
      .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouXiFenLeiLieBiao)
      .then(res => {
        this.shieldGameClassList = res.data.data.data;
      });
    this.PromotionManagementCreate.status == "yes"
      ? (this.IsStar = true)
      : (this.IsStar = false);
    this.PromotionManagementCreate.showMemberCenter == "yes"
      ? (this.IsStarMember = true)
      : (this.IsStarMember = false);
  },
  methods: {
    async getList() {
      await this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouHuiFenZuJiLu)
        .then(res => {
          this.preferentialClassId = res.data.data.data;
        });
      await this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouXiFenLeiLieBiao)
        .then(res => {
          this.shieldGameClassList = res.data.data.data;
        });
    },
    isVerifyFn() {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouHuiXiangQing, {
          preferentialId: this.$route.query.preferentialId
        })
        .then(res => {
          let obj = {};
          for (var key in this.PromotionManagementCreate) {
            if (
              key == "allow_game_class" ||
              key == "shield_game_class" ||
              key == "classId"
            ) {
              obj[key] = res.data.data[key].split(",").map(e => {
                return e - 0;
              });
              this.PromotionManagementCreate[key] = obj[key];
            } else if (key == "allow_game" || key == "shield_game") {
              this.PromotionManagementCreate[key] = res.data.data[key];
            } else if (key == "star_date" || key == "end_date") {
              this.PromotionManagementCreate[key] = this.$moment(
                res.data.data[key] * 1000
              ).format("LLL");
            } else {
              this.PromotionManagementCreate[key] = res.data.data[key];
            }
          }
          this.BannerUrl = res.data.data.img;
          this.PromotionManagementCreate.preferentialId = res.data.data.id;
          this.PromotionManagementCreate.updateUserName = this.$root.adminuserinfo.adminUserName;
          this.$refs.SiteNameSelect.setDefaultSite(res.data.data["siteId"]);

          this.PromotionManagementCreate.status == "yes"
            ? (this.IsStar = true)
            : (this.IsStar = false);
          this.PromotionManagementCreate.showMemberCenter == "yes"
            ? (this.IsStarMember = true)
            : (this.IsStarMember = false);
          this.tinymceInit();
        });
    },
    gengHuanTuPian() {
      this.bannerShow = !this.bannerShow;
      if (this.bannerShow) {
        this.PromotionManagementCreate.img = this.BannerUrl;
        this.imgInfo.imgurl = "";
        this.$refs.UploadImg.value = "";
      } else {
        this.PromotionManagementCreate.img = "";
      }
    },
    shieldGameClassChange(re) {
      this.PromotionManagementCreate.shield_game = [];
      re.forEach(item => {
        // this.PromotionManagementCreate.shield_game_class.forEach(i => {
        //   if (item.value == i) {
        //     this.PromotionManagementCreate.shield_game.push(item.label);
        //   }
        // });
        this.shieldGameClassList.forEach(i => {
          if (item.value == i.id) {
            this.PromotionManagementCreate.shield_game.push(i.name);
          }
        });
      });
    },
    allowGameClassChange(re) {
      this.PromotionManagementCreate.allow_game = [];
      re.forEach(item => {
        // this.PromotionManagementCreate.allow_game_class.forEach(i => {
        //   if (item.value - 0 == i) {
        //     this.PromotionManagementCreate.allow_game.push(item.label);
        //   }
        // });
        this.shieldGameClassList.forEach(i => {
          if (item.value == i.id) {
            this.PromotionManagementCreate.allow_game.push(i.name);
          }
        });
      });
    },
    // classIdChange(re){
    //   this.PromotionManagementCreate.classId=[];
    //   re.forEach(item => {
    //     this.PromotionManagementCreate.allow_game_class.forEach(i => {
    //       if(item.value == i){
    //         this.PromotionManagementCreate.allow_game.push(item.label)
    //       }
    //     })
    //   })
    // },
    mechange(re) {
      this.PromotionManagementCreate.siteId = re.SiteId;
      this.PromotionManagementCreate.siteName = re.SiteName;
    },
    timeChange(e, d) {
      e == "star"
        ? (this.PromotionManagementCreate.star_date = d)
        : (this.PromotionManagementCreate.end_date = d);
    },
    QueDingFaBuYouHui() {
      var that = this;

      var aaa = tinymce.get("tinymceEditer").getContent();
      that.PromotionManagementCreate.content = aaa.slice(
        aaa.indexOf("<body>") + 7,
        aaa.indexOf("</body>") - 1
      );
      // if (that.PromotionManagementCreate.type != "automatic") {
      //   delete that.PromotionManagementCreate.url;
      // }
      if (that.PromotionManagementCreate.content == "") {
        that.$Message.error("请输入正确的内容！！！");
        return;
      }
      this.$refs.PromotionManagementCreate.validate(valid => {
        if (valid) {
          var data = new FormData();
          for (let key in this.PromotionManagementCreate) {
            data.append(key, this.PromotionManagementCreate[key]);
          }
          if (
            this.$route.query &&
            this.$route.query.preferentialId &&
            this.$route.query.isVerify
          ) {
            this.$root
              .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouHuiXiuGai, data)
              .then(res => {
                this.$root.modal("success", "", "修改优惠成功！");
                // this.$Message.success("修改优惠成功！");
              });
          } else {
            this.$root
              .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouHuiXinZeng, data)
              .then(res => {
                this.$root.modal("success", "", "创建优惠成功！");
                // this.$Message.success("创建优惠成功！");
              });
          }
        }
      });
    },
    QingKongBianJi() {
      tinymce.activeEditor.setContent("");
      tinymce.triggerSave();
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
          this.PromotionManagementCreate.img = file;
          reader.onload = null;
        };
        reader.readAsDataURL(file);
      }
    },
    funDeleteFile(fileDelete) {
      this.imgInfo.imgurl = "";
      this.imgInfo.imgsize = "";
      this.imgInfo.imgname = "";
      this.imgInfo.isShow = false;
      this.$refs.UploadImg.value = "";
      this.PromotionManagementCreate.img = "";
    },
    // handleSuccess () {
    //     this.BannerUrl = 'https://file.iviewui.com/iview-admin/login_bg.jpg';
    //     this.$Message.success('上传成功！');
    // },
    // handleMaxSize () {
    //     this.$Message.info('上传的文件格式为大小不超过2M的JPG、PNG、文件！');
    // },
    // handleFormatError (error, file, fileList) {
    //     this.$Notice.warning({
    //         title: '图片上传失败！',
    //         desc:
    //   '图片 ' +
    //   fileList.name +
    //   ' 上传失败，上传的文件格式为大小不超过2M的JPG、PNG、文件！'
    //     });
    // },
    // handleProgress (event, file, fileList) {},
    changeYh(n, e) {
      if (n == "qiyong") {
        if (e) {
          this.PromotionManagementCreate.status = "yes";
        } else {
          this.PromotionManagementCreate.status = "no";
        }
      } else {
        if (e) {
          this.PromotionManagementCreate.showMemberCenter = "yes";
        } else {
          this.PromotionManagementCreate.showMemberCenter = "no";
        }
      }
    },
    tinymceInit() {
      let vm = this;
      tinymce.init({
        selector: "#tinymceEditer",
        branding: false,
        elementpath: false,
        height: 500,
        language: "zh_CN.GB2312",
        menubar: "edit insert view format table tools",
        plugins: [
          "advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools",
          "searchreplace visualblocks visualchars code fullpage",
          "insertdatetime media nonbreaking save table contextmenu directionality",
          "emoticons paste textcolor colorpicker textpattern imagetools codesample"
        ],
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt",
        toolbar1:
          " newnote print preview | undo redo | insert | styleselect | formatselect fontsizeselect forecolor backcolor bold italic link ",
        toolbar2:
          " alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image emoticons media codesample",
        autosave_interval: "20s",
        image_advtab: true,
        table_default_styles: {
          width: "100%",
          borderCollapse: "collapse"
        },
        plugin_preview_width: 1000,
        plugin_preview_height: 600,
        init_instance_callback: function(editor) {
          editor.on("Change", function(e) {
            var aaa = tinymce.get("tinymceEditer").getContent();
            vm.PromotionManagementCreate.content = aaa.slice(
              aaa.indexOf("<body>") + 7,
              aaa.indexOf("</body>") - 1
            );
          });
        },
        setup: function(editor) {
          editor.on("init", function(e) {
            vm.spinShow = false;
            if (vm.PromotionManagementCreate.content) {
              tinymce
                .get("tinymceEditer")
                .setContent(vm.PromotionManagementCreate.content);
            }
          });
          editor.on("keydown", function(e) {
            localStorage.editorContent = tinymce
              .get("tinymceEditer")
              .getContent();
          });
        }
      });
    }
  },
  mounted() {
    // this.UploadList = this.$refs.upload.fileList;
    this.$nextTick(() => {
      if (
        this.$route.query &&
        this.$route.query.preferentialId &&
        this.$route.query.isVerify
      ) {
        this.bannerShow = true;
        this.isVerifyFn(this.$route.query.preferentialId);
      } else {
        this.tinymceInit();
      }
      this.PromotionManagementCreate.createUserName = this.$root.adminuserinfo.adminUserName;

      // let height = document.body.offsetHeight - 300;
      // let vm = this;
      // tinymce.init({
      //   selector: "#tinymceEditer",
      //   branding: false,
      //   elementpath: false,
      //   height: 500,
      //   language: "zh_CN.GB2312",
      //   menubar: "edit insert view format table tools",
      //   plugins: [
      //     "advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools",
      //     "searchreplace visualblocks visualchars code fullpage",
      //     "insertdatetime media nonbreaking save table contextmenu directionality",
      //     "emoticons paste textcolor colorpicker textpattern imagetools codesample"
      //   ],
      //   fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt",
      //   toolbar1:
      //     " newnote print preview | undo redo | insert | styleselect | formatselect fontsizeselect forecolor backcolor bold italic link ",
      //   toolbar2:
      //     " alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image emoticons media codesample",
      //   autosave_interval: "20s",
      //   image_advtab: true,
      //   table_default_styles: {
      //     width: "100%",
      //     borderCollapse: "collapse"
      //   },
      //   plugin_preview_width: 1000,
      //   plugin_preview_height: 600,
      //   init_instance_callback: function(editor) {
      //     editor.on("Change", function(e) {
      //       vm.PromotionManagementCreate.content = tinymce
      //         .get("tinymceEditer")
      //         .getContent();
      //     });
      //   },
      //   setup: function(editor) {
      //     editor.on("init", function(e) {
      //       vm.spinShow = false;
      //         // tinymce
      //         //   .get("tinymceEditer")
      //         //   .setContent(localStorage.editorContent);
      //       // if (localStorage.editorContent) {
      //       if(vm.PromotionManagementCreate.content){
      //         tinymce
      //           .get("tinymceEditer")
      //           // .setContent("");
      //           .setContent(vm.PromotionManagementCreate.content);
      //       }
      //     });
      //     editor.on("keydown", function(e) {
      //       localStorage.editorContent = tinymce
      //         .get("tinymceEditer")
      //         .getContent();
      //     });
      //   }
      // });
    });
  },
  destroyed() {
    tinymce.get("tinymceEditer").destroy();
  }
  // watch: {
  //   "PromotionManagementCreate.siteId": function(newvalue, old) {
  //     this.WebSiteList.forEach((m, i) => {
  //       if (m.id === newvalue) {
  //         this.PromotionManagementCreate.siteName = this.WebSiteList[
  //           i
  //         ].siteName;
  //       }
  //     });
  //   }
  // }
};
</script>

<style scoped lang="less">
.ShangChuanT {
  height: 200px;
  width: 70%;
  background: #eee;
  border-radius: 3px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  img {
    height: 100%;
    width: auto;
    max-width: 100%;
  }
}
</style>
