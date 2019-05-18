<template>
  <div class="content-main SiteMailSend-main">
    <div class="layout">
      <div class="page-con1">
        <div>
          <i-form ref="mailsend" :label-width="110" :model="mailsend" :rules="Rulesmailsend">
            <FormItem label="收件人" prop="send_type">
              <RadioGroup v-model="defult">
                <Radio v-for="item in sendtoList" :value="item.value" :key="item.label" :label="item.label"></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem v-if="defult ==='指定会员'" label="会员名称" prop="send_content">
              <AutoComplete @listenOnChange="AutoCompleteChange" :AutoCompleteData="AutoCompleteDataOfMember"></AutoComplete>
            </FormItem>
            <FormItem v-if="defult ==='指定代理'" label="代理名称" prop="send_content">
              <AutoComplete @listenOnChange="AutoCompleteChange" :AutoCompleteData="AutoCompleteDataOfAgency"></AutoComplete>
            </FormItem>
            <FormItem label="代理等级" v-if="defult==='代理组'" prop="send_content">
              <LevelSelect ref="AgentLevelSelect" :LevelSelectConf="LevelSelectOfAgencyMultiple" v-on:listenLevelChange="AgencyLevelChange"></LevelSelect>
            </FormItem>
            <FormItem label="会员等级" v-if="defult==='会员组'" prop="send_content">
              <LevelSelect ref="MemberLevelSelect" :LevelSelectConf="LevelSelectOfMemberMultiple" v-on:listenLevelChange="MemberLevelChange"></LevelSelect>
            </FormItem>
            <FormItem label="标题" prop="title">
              <i-input type="text" style="width:400px" v-model="mailsend.title"></i-input>
            </FormItem>
            <FormItem label="内容" prop="content">
              <div id="editor"></div>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="send_go">发送</Button>
            </FormItem>
          </i-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import mixins from "@/mixins/create";
export default {
  name: "markdown-editor",
  mixins: [mixins],
  data() {
    return {
      md: [],
      editor: null,
      sendtoList: [
        { value: "member", label: "指定会员" },
        { value: "agency", label: "指定代理" },
        { value: "memberGroup", label: "会员组" },
        { value: "agencyGroup", label: "代理组" },
        { value: "memberAll", label: "全部会员" },
        { value: "agencyAll", label: "全部代理" }
      ],
      defult: "指定会员",
      mailsend: {
        send_type: "member", //类型
        send_content: "", //收件人
        title: "",
        content: "",
        siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
      },
      Rulesmailsend: {
        send_type: [
          {
            required: true,
            trigger: "change",
            message: "请输入发件人"
          }
        ],
        siteId: [
          {
            required: true,
            trigger: "blur",
            message: "请输入站点",
            pattern: /^.*$/
          }
        ],
        user: [
          {
            required: true,
            trigger: "change",
            message: "请输入会员名称"
          }
        ],
        title: [
          {
            required: true,
            trigger: "blur",
            message: "请输入标题"
          }
        ],
        content: [
          {
            required: true,
            trigger: "blur",
            message: "请输入发信内容"
          }
        ]
      }
    };
  },
  watch: {
    md: {
      handler: function(val, oldVal) {
        this.mailsend.send_content = val.toString();
      },
      deep: true
    },
    defult: function(val, o) {
      this.$nextTick(() => {
        this.semodel = "";
        if (val == "指定会员") {
          this.mailsend.send_type = "member";
          this.$set(this.AutoCompleteDataOfMember, "data", {});
        }
        if (val == "指定代理") {
          this.mailsend.send_type = "agency";
          this.$set(this.AutoCompleteDataOfAgency, "data", {});
        }
        if (val == "全部会员") {
          this.mailsend.send_type = "memberAll";
          this.mailsend.send_content = "";
        }
        if (val == "全部代理") {
          this.mailsend.send_type = "agencyAll";
          this.mailsend.send_content = "";
        }
        if (val == "会员组") {
          this.mailsend.send_type = "memberGroup";
          this.md = [];
          this.$refs.MemberLevelSelect.getLevelById(
            this.mailsend.siteId,
            "MemberLevelModel"
          );
        }
        if (val == "代理组") {
          this.mailsend.send_type = "agencyGroup";
          this.md = [];
          this.$refs.AgentLevelSelect.getLevelById(
            this.mailsend.siteId,
            "AgencyLevelModel"
          );
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      var that = this;
      that.editor = new E("#editor");
      that.editor.customConfig.onchange = function(html) {
        // html 即变化之后的内容
        that.mailsend.content = that.editor.txt.text();
      };
      that.editor.create();
      // siteSelect组件设为全局之后，第一次渲染的时候，需要制定默认site
      this.AutoCompleteDataOfMember.siteId = JSON.parse(localStorage.AllSiteNameList)[0].id;
      this.AutoCompleteDataOfAgency.siteId = JSON.parse(localStorage.AllSiteNameList)[0].id;
    });
  },
  methods: {
    AgencyLevelChange(re) {
      //代理等级选择
      this.md = re.levelLabel;
      this.mailsend.send_content = re.levelLabel + "";
    },
    MemberLevelChange(re) {
      //会员等级选择
      this.md = re.levelLabel;
      this.mailsend.send_content = re.levelLabel + "";
    },
    siteChange(re) {
      if (re) {
        this.mailsend.siteId = re.SiteId;
        this.AutoCompleteDataOfAgency.siteId = this.mailsend.siteId;
        this.AutoCompleteDataOfMember.siteId = this.mailsend.siteId;
        if (this.defult === "会员组") {
          this.$refs.MemberLevelSelect.getLevelById(
            re.SiteId,
            "MemberLevelModel"
          );
        }
        if (this.defult === "代理组") {
          this.$refs.AgentLevelSelect.getLevelById(
            re.SiteId,
            "AgencyLevelModel"
          );
        }
      }
    },
    AutoCompleteChange(re) {
      //自动完成选择
      if (re.id || re.id + "" === "0") {
        this.mailsend.send_content = re.id;
      }
    },
    filters: function(value) {
      if (this.mailsend.send_content.includes("，")) {
        this.mailsend.send_content = this.mailsend.send_content.replace(
          /，/g,
          ","
        );
      }
    },
    send_go() {
      this.$refs.mailsend.validate(valid => {
        if (valid) {
          this.$root.loading();
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_FaSongZhanNeiXin,
              this.mailsend
            )
            .then(res => {
              this.$Spin.hide();
              this.$root.modal("success", "", "消息发送成功！");
              // this.$refs.mailsend.resetFields();
              this.editor.txt.html("");
            })
            .catch(res => {
              this.$Spin.hide();
            });
        } else {
        }
      });
    },
    sele(value) {
      this.mailsend.shoujianren = this.mailsend.shoujianren + value + ",";
    }
  }
};
</script>

<style lang="less">
.CodeMirror {
  color: #000;
}
.CodeMirror-lines {
  padding: 4px 0;
}
.CodeMirror pre {
  padding: 0 4px;
}
.CodeMirror-gutter-filler,
.CodeMirror-scrollbar-filler {
  background-color: #fff;
}
.CodeMirror-gutters {
  border-right: 1px solid #ddd;
  background-color: #f7f7f7;
  white-space: nowrap;
}
.CodeMirror-linenumber {
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  color: #999;
  white-space: nowrap;
}
.CodeMirror-guttermarker {
  color: #000;
}
.CodeMirror-guttermarker-subtle {
  color: #999;
}
.CodeMirror-cursor {
  border-left: 1px solid #000;
  border-right: none;
  width: 0;
}
.CodeMirror div.CodeMirror-secondarycursor {
  border-left: 1px solid silver;
}
.cm-fat-cursor .CodeMirror-cursor {
  width: auto;
  border: 0 !important;
  background: #7e7;
}
.cm-fat-cursor div.CodeMirror-cursors {
  z-index: 1;
}
.cm-animate-fat-cursor {
  width: auto;
  border: 0;
  -webkit-animation: blink 1.06s steps(1) infinite;
  -moz-animation: blink 1.06s steps(1) infinite;
  animation: blink 1.06s steps(1) infinite;
  background-color: #7e7;
}
@-moz-keyframes blink {
  50% {
    background-color: transparent;
  }
}
@-webkit-keyframes blink {
  50% {
    background-color: transparent;
  }
}
@keyframes blink {
  50% {
    background-color: transparent;
  }
}
.cm-tab {
  display: inline-block;
  text-decoration: inherit;
}
.CodeMirror-ruler {
  border-left: 1px solid #ccc;
  position: absolute;
}
.cm-s-default .cm-header {
  color: #00f;
}
.cm-s-default .cm-quote {
  color: #090;
}
.cm-negative {
  color: #d44;
}
.cm-positive {
  color: #292;
}
.cm-header,
.cm-strong {
  font-weight: 700;
}
.cm-em {
  font-style: italic;
}
.cm-link {
  text-decoration: underline;
}
.cm-strikethrough {
  text-decoration: line-through;
}
.cm-s-default .cm-keyword {
  color: #708;
}
.cm-s-default .cm-atom {
  color: #219;
}
.cm-s-default .cm-number {
  color: #164;
}
.cm-s-default .cm-def {
  color: #00f;
}
.cm-s-default .cm-variable-2 {
  color: #05a;
}
.cm-s-default .cm-variable-3 {
  color: #085;
}
.cm-s-default .cm-comment {
  color: #a50;
}
.cm-s-default .cm-string {
  color: #a11;
}
.cm-s-default .cm-string-2 {
  color: #f50;
}
.cm-s-default .cm-meta,
.cm-s-default .cm-qualifier {
  color: #555;
}
.cm-s-default .cm-builtin {
  color: #30a;
}
.cm-s-default .cm-bracket {
  color: #997;
}
.cm-s-default .cm-tag {
  color: #170;
}
.cm-s-default .cm-attribute {
  color: #00c;
}
.cm-s-default .cm-hr {
  color: #999;
}
.cm-s-default .cm-link {
  color: #00c;
}
.cm-invalidchar,
.cm-s-default .cm-error {
  color: red;
}
.CodeMirror-composing {
  border-bottom: 2px solid;
}
div.CodeMirror span.CodeMirror-matchingbracket {
  color: #0f0;
}
div.CodeMirror span.CodeMirror-nonmatchingbracket {
  color: #f22;
}
.CodeMirror-matchingtag {
  background: rgba(255, 150, 0, 0.3);
}
.CodeMirror-activeline-background {
  background: #e8f2ff;
}
.CodeMirror {
  position: relative;
  overflow: hidden;
  background: #fff;
}
.CodeMirror-scroll {
  overflow: scroll !important;
  margin-bottom: -30px;
  margin-right: -30px;
  padding-bottom: 30px;
  height: 100%;
  outline: 0;
  position: relative;
}
.CodeMirror-sizer {
  position: relative;
  border-right: 30px solid transparent;
}
.CodeMirror-gutter-filler,
.CodeMirror-hscrollbar,
.CodeMirror-scrollbar-filler,
.CodeMirror-vscrollbar {
  position: absolute;
  z-index: 6;
  display: none;
}
.CodeMirror-vscrollbar {
  right: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.CodeMirror-hscrollbar {
  bottom: 0;
  left: 0;
  overflow-y: hidden;
  overflow-x: scroll;
}
.CodeMirror-scrollbar-filler {
  right: 0;
  bottom: 0;
}
.CodeMirror-gutter-filler {
  left: 0;
  bottom: 0;
}
.CodeMirror-gutters {
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100%;
  z-index: 3;
}
.CodeMirror-gutter {
  white-space: normal;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  margin-bottom: -30px;
}
.CodeMirror-gutter-wrapper {
  position: absolute;
  z-index: 4;
  background: 0 0 !important;
  border: none !important;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.CodeMirror-gutter-background {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 4;
}
.CodeMirror-gutter-elt {
  position: absolute;
  cursor: default;
  z-index: 4;
}
.CodeMirror-lines {
  cursor: text;
  min-height: 1px;
}
.CodeMirror pre {
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
  border-width: 0;
  background: 0 0;
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  white-space: pre;
  word-wrap: normal;
  line-height: inherit;
  color: inherit;
  z-index: 2;
  position: relative;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
}
.CodeMirror-wrap pre {
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal;
}
.CodeMirror-linebackground {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
}
.CodeMirror-linewidget {
  position: relative;
  z-index: 2;
  overflow: auto;
}
.CodeMirror-code {
  outline: 0;
}
.CodeMirror-gutter,
.CodeMirror-gutters,
.CodeMirror-linenumber,
.CodeMirror-scroll,
.CodeMirror-sizer {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}
.CodeMirror-measure {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.CodeMirror-cursor {
  position: absolute;
}
.CodeMirror-measure pre {
  position: static;
}
div.CodeMirror-cursors {
  visibility: hidden;
  position: relative;
  z-index: 3;
}
.CodeMirror-focused div.CodeMirror-cursors,
div.CodeMirror-dragcursors {
  visibility: visible;
}
.CodeMirror-selected {
  background: #d9d9d9;
}
.CodeMirror-focused .CodeMirror-selected,
.CodeMirror-line::selection,
.CodeMirror-line > span::selection,
.CodeMirror-line > span > span::selection {
  background: #d7d4f0;
}
.CodeMirror-crosshair {
  cursor: crosshair;
}
.CodeMirror-line::-moz-selection,
.CodeMirror-line > span::-moz-selection,
.CodeMirror-line > span > span::-moz-selection {
  background: #d7d4f0;
}
.cm-searching {
  background: #ffa;
  background: rgba(255, 255, 0, 0.4);
}
.cm-force-border {
  padding-right: 0.1px;
}
@media print {
  .CodeMirror div.CodeMirror-cursors {
    visibility: hidden;
  }
}
.cm-tab-wrap-hack:after {
  content: "";
}
span.CodeMirror-selectedtext {
  background: 0 0;
}
.CodeMirror {
  height: auto;
  min-height: 200px;
  border: 1px solid #ddd;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 10px;
  font: inherit;
  z-index: 1;
}
.CodeMirror-scroll {
  min-height: 200px;
}
.CodeMirror-fullscreen {
  background: #fff;
  position: fixed !important;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
  z-index: 9;
}
.CodeMirror-sided {
  width: 50% !important;
}
.editor-toolbar {
  position: relative;
  opacity: 0.6;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  padding: 0 10px;
  border-top: 1px solid #bbb;
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.editor-toolbar:after,
.editor-toolbar:before {
  display: block;
  content: " ";
  height: 1px;
}
.editor-toolbar:before {
  margin-bottom: 8px;
}
.editor-toolbar:after {
  margin-top: 8px;
}
.editor-toolbar:hover,
.editor-wrapper input.title:focus,
.editor-wrapper input.title:hover {
  opacity: 0.8;
}
.editor-toolbar.fullscreen {
  width: 100%;
  height: 50px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  background: #fff;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: 9;
}
.editor-toolbar.fullscreen::before {
  width: 20px;
  height: 50px;
  background: -moz-linear-gradient(
    left,
    rgba(255, 255, 255, 1) 0,
    rgba(255, 255, 255, 0) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgba(255, 255, 255, 1)),
    color-stop(100%, rgba(255, 255, 255, 0))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 1) 0,
    rgba(255, 255, 255, 0) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(255, 255, 255, 1) 0,
    rgba(255, 255, 255, 0) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(255, 255, 255, 1) 0,
    rgba(255, 255, 255, 0) 100%
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 0,
    rgba(255, 255, 255, 0) 100%
  );
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}
.editor-toolbar.fullscreen::after {
  width: 20px;
  height: 50px;
  background: -moz-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 1) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgba(255, 255, 255, 0)),
    color-stop(100%, rgba(255, 255, 255, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 1) 100%
  );
  position: fixed;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
}
.editor-toolbar a {
  display: inline-block;
  text-align: center;
  text-decoration: none !important;
  color: #2c3e50 !important;
  width: 30px;
  height: 30px;
  margin: 0;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
}
.editor-toolbar a.active,
.editor-toolbar a:hover {
  background: #fcfcfc;
  border-color: #95a5a6;
}
.editor-toolbar a:before {
  line-height: 30px;
}
.editor-toolbar i.separator {
  display: inline-block;
  width: 0;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #fff;
  color: transparent;
  text-indent: -10px;
  margin: 0 6px;
}
.editor-toolbar a.fa-header-x:after {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 65%;
  vertical-align: text-bottom;
  position: relative;
  top: 2px;
}
.editor-toolbar a.fa-header-1:after {
  content: "1";
}
.editor-toolbar a.fa-header-2:after {
  content: "2";
}
.editor-toolbar a.fa-header-3:after {
  content: "3";
}
.editor-toolbar a.fa-header-bigger:after {
  content: "▲";
}
.editor-toolbar a.fa-header-smaller:after {
  content: "▼";
}
.editor-toolbar.disabled-for-preview a:not(.no-disable) {
  pointer-events: none;
  background: #fff;
  border-color: transparent;
  text-shadow: inherit;
}
@media only screen and (max-width: 700px) {
  .editor-toolbar a.no-mobile {
    display: none;
  }
}
.editor-statusbar {
  padding: 8px 10px;
  font-size: 12px;
  color: #959694;
  text-align: right;
}
.editor-statusbar span {
  display: inline-block;
  min-width: 4em;
  margin-left: 1em;
}
.editor-preview,
.editor-preview-side {
  padding: 10px;
  background: #fafafa;
  overflow: auto;
  display: none;
  box-sizing: border-box;
}
.editor-statusbar .lines:before {
  content: "lines: ";
}
.editor-statusbar .words:before {
  content: "words: ";
}
.editor-statusbar .characters:before {
  content: "characters: ";
}
.editor-preview {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 7;
}
.editor-preview-side {
  position: fixed;
  bottom: 0;
  width: 50%;
  top: 50px;
  right: 0;
  z-index: 9;
  border: 1px solid #ddd;
}
.editor-preview-active,
.editor-preview-active-side {
  display: block;
}
.editor-preview-side > p,
.editor-preview > p {
  margin-top: 0;
}
.editor-preview pre,
.editor-preview-side pre {
  background: #eee;
  margin-bottom: 10px;
}
.editor-preview table td,
.editor-preview table th,
.editor-preview-side table td,
.editor-preview-side table th {
  border: 1px solid #ddd;
  padding: 5px;
}
.CodeMirror .CodeMirror-code .cm-tag {
  color: #63a35c;
}
.CodeMirror .CodeMirror-code .cm-attribute {
  color: #795da3;
}
.CodeMirror .CodeMirror-code .cm-string {
  color: #183691;
}
.CodeMirror .CodeMirror-selected {
  background: #d9d9d9;
}
.CodeMirror .CodeMirror-code .cm-header-1 {
  font-size: 200%;
  line-height: 200%;
}
.CodeMirror .CodeMirror-code .cm-header-2 {
  font-size: 160%;
  line-height: 160%;
}
.CodeMirror .CodeMirror-code .cm-header-3 {
  font-size: 125%;
  line-height: 125%;
}
.CodeMirror .CodeMirror-code .cm-header-4 {
  font-size: 110%;
  line-height: 110%;
}
.CodeMirror .CodeMirror-code .cm-comment {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}
.CodeMirror .CodeMirror-code .cm-link {
  color: #7f8c8d;
}
.CodeMirror .CodeMirror-code .cm-url {
  color: #aab2b3;
}
.CodeMirror .CodeMirror-code .cm-strikethrough {
  text-decoration: line-through;
}
.CodeMirror .CodeMirror-placeholder {
  opacity: 0.5;
}
.CodeMirror
  .cm-spell-error:not(.cm-url):not(.cm-comment):not(.cm-tag):not(.cm-word) {
  background: rgba(255, 0, 0, 0.15);
}
.CodeMirror,
.CodeMirror-scroll {
  min-height: 300px !important;
}
.SiteMailSend-main {
  .ivu-form-item-label {
    font-weight: 800;
    line-height: 20px;
    font-size: 15px;
  }
}
</style>
