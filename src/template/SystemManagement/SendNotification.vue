<template>
  <div class="content-main SiteMailSend-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span v-if="!$route.query.isVerify">发送</span>
          <span v-else>修改</span>
        </h1>
      </div>
      <div class="page-con1">
        <div>
          <i-form ref="mailsend" :label-width="120" :model="mailsend" :rules="Rulesmailsend">
            <FormItem label="站点" prop="siteId">
              <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
            </FormItem>
            <FormItem label="信息类型" prop="type">
              <RadioGroup v-model="mailsend.type">
                <Radio label="lantern" :disabled="disabled">
                  <span>走马灯</span>
                </Radio>
                <Radio label="popups" :disabled="disabled">
                  <span>弹框</span>
                </Radio>
                <Radio label="notice" :disabled="disabled">
                  <span>公告</span>
                </Radio>
                <Radio label="article" :disabled="disabled">
                  <span>文章</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="类型" v-if="mailsend.type === 'article'">
              <RadioGroup v-model="mailsend.sub_type">
                <Radio label="about" :disabled="disabled">
                  <span>关于我们</span>
                </Radio>
                <Radio label="other" :disabled="disabled">
                  <span>其他</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="内容类型" prop="desc_format_type">
              <RadioGroup v-model="mailsend.desc_format_type">
                <Radio label="text">
                  <span>文本（用于Android和IOS）</span>
                </Radio>
                <Radio label="html">
                  <span>HTML（用于PC和H5）</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="上线时间" prop="ShangJiaShiJian">
              <DatePicker :value="mailsend.publish_at" @on-change="timeChange('star',$event)" format="yyyy-MM-dd HH:mm:ss"
                type="datetime" placeholder="开始时间" style="width: 200px"></DatePicker>
              -
              <DatePicker :value="mailsend.offline_at" @on-change="timeChange('end',$event)" format="yyyy-MM-dd HH:mm:ss"
                type="datetime" placeholder="结束时间" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="标题" prop="title">
              <i-input type="text" style="width:300px" v-model="mailsend.title"></i-input>
            </FormItem>
            <FormItem label="内容" prop="description">
              <div v-show="mailsend.desc_format_type === 'html'" id="editor"></div>
              <Input v-show="mailsend.desc_format_type === 'text'" v-model="text" type="textarea" :rows="5" style="width:500px;"
                @on-change="textChange" />
            </FormItem>
            <FormItem label="状态" prop="status">
              <Select v-model="mailsend.status" style="width:200px">
                <Option value="yes">开启</Option>
                <Option value="no">关闭</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button size="large" v-if="!$route.query.isVerify" type="primary" @click="send_go">发送</Button>
              <Button size="large" v-else type="primary" @click="send_go">编辑</Button>
              <Button size="large" @click="$router.push({name:'Notification'})">返回列表</Button>
            </FormItem>
          </i-form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import E from "wangeditor";
  import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";
  export default {
    components: {
      SiteNameSelect
    },
    data() {
      return {
        disabled: false,
        SiteNameSelectData: {
          type: "单选",
          placeholder: "请选择站点",
          style: {
            width: "260px"
          }
        },
        sendtoList: [{
            value: "all",
            label: "全部"
          },
          {
            value: "agency",
            label: "代理"
          },
          {
            value: "user",
            label: "用户"
          }
        ],
        editor: null,
        text: "",
        mailsend: {
          description: "",
          title: "",
          siteId: "",
          siteName: "",
          type: "",
          publish_at: "",
          offline_at: "",
          status: "yes",
          desc_format_type: "html",
          sub_type: "about"
        },
        Rulesmailsend: {
          title: [{
            required: true,
            message: "请输入标题"
          }],
          type: [{
            required: true,
            trigger: "blur",
            message: "请选择信息类型"
          }],
          desc_format_type: [{
            required: true,
            trigger: "blur",
            message: "请选择内容类型"
          }],
          siteId: [{
            required: true,
            message: "请选择站点",
            pattern: /^.*$/
          }],
          description: [{
            required: true,
            trigger: "blur",
            message: "请输入公告内容"
          }],
          status: [{
            required: true,
            message: "请选择状态"
          }]
        }
      };
    },
    mounted() {
      this.mailsend.publish_at = this.$moment().format("LLL");
      this.mailsend.offline_at = this.$moment.unix(2147483646).format("LLL");
      this.$nextTick(() => {
        var that = this;
        that.editor = new E("#editor");
        that.editor.customConfig.onchange = function (html) {
          // html 即变化之后的内容
          that.mailsend.description = that.editor.txt.html();
        };
        that.editor.create();
        if (this.$route.query.isVerify) {
          this.isVerify();
        }
      });
    },
    watch: {
      "mailsend.desc_format_type": function (val) {
        if (val === "text") {
          this.mailsend.description = this.text;
        } else {
          this.mailsend.description = this.editor.txt.html();
        }
      }
    },
    methods: {
      textChange() {
        this.mailsend.description = this.text;
      },
      isVerify() {
        this.$root
          .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Detail_Notice, {
            id: this.$route.query.id,
            siteId: this.$route.query.siteId
          })
          .then(res => {
            this.disabled = true;
            let noticeDetail = res.data.data[0];
            this.mailsend.title = noticeDetail.title;
            this.mailsend.description = noticeDetail.description;
            if (noticeDetail.desc_format_type === "html") {
              this.editor.txt.html(noticeDetail.description);
            } else {
              this.text = noticeDetail.description;
            }
            this.mailsend.id = noticeDetail.id;
            this.mailsend.siteId = this.$route.query.siteId;
            this.mailsend.siteName = noticeDetail.siteName;
            this.mailsend.type = noticeDetail.type;
            this.mailsend.sub_type = noticeDetail.sub_type;
            this.mailsend.desc_format_type = noticeDetail.desc_format_type;
            this.mailsend.status = noticeDetail.status;
            this.mailsend.publish_at = this.$moment
              .unix(noticeDetail.publish_at)
              .format("LLL");
            this.mailsend.offline_at = this.$moment
              .unix(noticeDetail.offline_at)
              .format("LLL");
            this.$refs.SiteNameSelect.setDefaultSite(res.data.data[0].siteId);
            this.$set(this.SiteNameSelectData, "disabled", true)
          });
      },
      siteChange(re) {
        this.mailsend.siteId = re.SiteId;
        this.mailsend.siteName = re.SiteName;
      },
      timeChange(e, d) {
        e == "star" ?
          (this.mailsend.publish_at = d) :
          (this.mailsend.offline_at = d);
      },
      send_go() {
        let dataSend = {};
        if(this.mailsend.type !== 'article'){
          delete this.mailsend.sub_type
        }
        for (let key in this.mailsend) {
          if (key === "publish_at" || key === "offline_at") {
            dataSend[key] = this.$moment(this.mailsend[key]).unix();
          } else {
            dataSend[key] = this.mailsend[key];
          }
        }
        this.$refs.mailsend.validate(valid => {
          if (valid && this.mailsend.description != "") {
            this.$root.loading();
            if (this.$route.query.isVerify) {
              // delete dataSend.siteId;
              delete dataSend.siteName;
              delete dataSend.type;
              this.$root
                .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_GongGaoXiuGai, dataSend)
                .then(
                  res => {
                    this.$Spin.hide();
                    this.$root.modal("success", "", "公告编辑成功！");
                    // this.$Message.success("公告编辑成功！");
                  },
                  res => {
                    this.$Spin.hide();
                  }
                );
            } else {
              this.$root
                .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_FaSongGongGao, dataSend)
                .then(
                  res => {
                    this.$Spin.hide();
                    this.$root.modal("success", "", "消息发送成功！");
                    // this.$Message.success("消息发送成功！");
                    this.editor.txt.html("");
                  },
                  res => {
                    this.$Spin.hide();
                  }
                );
            }
          } else {
            this.$root.modal("error", "", "请输入正确的内容！");
            // this.$Message.error("请输入正确的内容！！！");
          }
        });
      }
    }
  };
</script>

<style lang="less">
  .SiteMailSend-main {
    .ivu-form-item-label {
      font-weight: 800;
      line-height: 20px;
      font-size: 15px;
    }
  }
</style>