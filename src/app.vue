<template>
  <div id="main" class="app-main">
    <router-view></router-view>
    <div id="cssloadd" v-show="cssload">
      <div class="cssload-container">
        <div class="cssload-speeding-wheel"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // theme: this.$store.state.app.themeColor
    };
  },
  computed: {
    cssload() {
      return this.$store.state.cssload;
    }
  },
  mounted() {
    // this.$store.commit('JiaZaiDongHua','true')
  },
  created() {
    // this.$store.commit('JiaZaiDongHua','true')
  },
  methods: {},
  beforeDestroy() {}
};
</script>

<style lang="less">
@primarycolor: #2d8cf0;
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  font-size: 14px;
  font-family: "Microsoft YaHei", "微软雅黑";
  min-width: 800px;
  word-wrap: break-word;
  overflow: hidden;
}
h1,
h2,
h3,
h4,
h5,
h6,
h7 {
  font-weight: 300;
}
.app-main {
  width: 100%;
  height: 100%;
  min-width: 1400px;
  min-height: 100%;
}
.layout-nav {
  .ivu-menu {
    font-size: 18px;
  }
}
.ivu-page {
  margin-top: 8px;
}
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  min-width: 1300px;
}
.children-layout {
  max-width: 100%;
  margin: 0 auto;
  min-width: 1300px;
  background: #fff;
  .tags-con {
    height: 50px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  }
}

/* gongyong css */
.table_more_data {
  border: 1px solid #e9eaec;
  text-align: left;
  .agency-path,
  .remark,
  ul li {
    padding: 7px 0;
    text-indent: 20px;
  }
  ul {
    li {
      list-style: none;
      float: left;
      width: 20%;
      border: 1px solid #e9eaec;
      border-left: 1px solid transparent;
      border-bottom: 1px solid transparent;
      &:nth-child(5n) {
        border-right: 1px solid transparent;
      }
    }
  }
  .remark {
    border-top: 1px solid #e9eaec;
  }
}
.ivu-table-sort i {
  height: 6px;
}
.ivu-table-sort {
  height: 13px;
}

.ivu-table-tbody td .ivu-table-cell {
  padding-left: 0;
  padding-right: 0;
}
.ivu-table-cell {
  .activity {
    border-bottom: 1px solid #e9eaec;
    &:last-of-type {
      border-bottom: 0;
    }
  }
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown {
  border-radius: 0 0 5px 5px;
}
.single-page-con {
  background: #fff;
  padding-bottom: 20px;
  height: 100%;
  &::-webkit-scrollbar {
    width: 8px !important;
  }
}
.page-header {
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  span {
    font-size: 18px;
  }
}

.w-e-toolbar .w-e-menu {
  z-index: 100 !important;
}
.w-e-text-container {
  z-index: 99 !important;
}
.page-con1 {
  clear: both;
  .c_search_top {
    margin-bottom: 8px;
    .ivu-form .ivu-form-item-label {
      font-weight: normal;
    }
  }
  .c_search_top.mmmmmmm {
    form {
      position: relative;
      height: 38px;
      overflow: hidden;
      .WC_NM {
        position: absolute;
        right: 10px;
        top: -4px;
        width: 30px;
        height: 30px;
        font-size: 30px;
        border-radius: 50%;
        color: #2d8cf0;
        cursor: pointer;
        text-align: center;
      }
    }
  }
}
.ivu-tag,
.ivu-btn-small {
  font-size: 14px;
}
.ivu-card-head {
  background: #f8f8f8;
}
.page-boot {
  margin: 15px 0;
  padding-left: 20px;
}
.model_jianju {
  .ivu-form-item {
    margin-bottom: 5px;
  }
}
.c_left {
  .ivu-form-item-content {
    p {
      line-height: 25px;
      b {
        font-size: 14px;
      }
    }
  }
}
input.inputt {
  padding: 0 0 0 5px;
  height: 32px;
  border-radius: 3px;
  border: 1px solid #dddee1;
  outline: none;
  color: #4b5363;
  font-size: 13px;
}
.ivu-card-head p {
  overflow: initial;
}
.ivu-alert-with-desc .ivu-alert-message {
  font-size: 18px;
}
.ivu-table,
.ivu-btn,
.ivu-input,
.ivu-alert-desc {
  font-size: 14px;
}
.ivu-menu {
  font-size: 16px;
}
.page-con1 .ivu-table-tip tr td {
  text-align: center;
}
.blockquote {
  padding: 5px 20px;
  margin: 20px 0;
  border-left: 5px solid #eee;
  .ulDetailsDlCJ {
    overflow: hidden;
    li {
      width: 20%;
      float: left;
      list-style: none;
      margin-bottom: 7px;
    }
  }
  h2 {
    margin-bottom: 10px;
  }
  ul.floatUl {
    overflow: hidden;
    li {
      float: left;
      margin-right: 10px;
      list-style: none;
    }
  }

  div {
    b {
      margin-right: 5px;
    }
  }
  ol {
    li {
      list-style: none;
      padding: 5px 0;
      b {
        margin-right: 5px;
      }
      a {
        padding: 0 10px;
      }
      textarea {
        margin: 10px 0;
      }
    }
  }
  ul.ulDetails {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      list-style: none;
      margin: 5px 0;
    }
  }
  .time {
    margin: 10px 0;
    overflow: hidden;
    > span {
      float: left;
      width: 50%;
    }
  }
  .ivu-row {
    margin: 10px 0;
  }
}
.v-transfer-dom .vertical-center-modal,
.ivu-modal-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.v-transfer-dom {
  .betPlatform-modal {
    .ivu-modal {
      .ivu-modal-body {
        font-size: 16px !important;
        line-height: 2.5 !important;
      }
    }
  }
}

.table {
  border-collapse: collapse;
  th,
  td {
    padding: 5px 8px;
    border: 1px solid #e9eaec;
  }
  thead {
    background: #f8f8f9;
  }
}
.ivu-table:before {
  display: none;
}
.ivu-form-item {
  margin-bottom: 28px;
}
.ivu-notice-notice {
  border-radius: 0;
}
.ivu-table-wrapper.center .ivu-table td,
.ivu-table-wrapper.center .ivu-table th {
  text-align: center;
}
.ivu-table-wrapper.center td.ivu-table-column-left,
.ivu-table-wrapper.center th.ivu-table-column-left {
  text-align: left;
}
.b_link {
  a {
    margin-right: 15px;
    padding: 5px;
    display: inline-block;
  }
  span.btns {
    float: right;
    b.label {
      margin-right: 10px;
    }
    input {
      text-align: center;
    }
  }
}

.ivu-poptip-inner {
  white-space: pre-line;
}

.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item {
  padding: 0;
  a {
    padding: 7px 10px 9px;
  }
}
.ivu-form .ivu-form-item-label {
  font-size: 16px;
  font-weight: 800;
}
.ivu-form .ivu-form-item-label,
.ivu-form-item-content,
.ivu-radio-wrapper {
  font-size: 16px;
}

.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value,
input,
.ivu-form-item-error-tip {
  font-size: 14px;
}
.ivu-tooltip-inner {
  white-space: normal;
}
.ivu-card-body {
  padding: 10px;
}
.c_search_top {
  .ivu-form-inline {
    .ivu-form-item-content {
      display: inline-block;
      float: left;
    }
  }
  .ivu-card-body {
    background-color: #ebf7ff;
  }
}
.ivu-form-inline .ivu-form-item {
  margin-bottom: 10px;
}
.HuiYuanPiLiangDengJi {
  .ivu-table-body {
    height: 353px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
#cssloadd {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
  z-index: 10000;
  background: rgba(255, 255, 255, 0.5);
}
//cssloder
.cssload-container {
  width: 56px;
  height: 56px;
  position: absolute;
  left: 50%;
  margin-left: -28px;
  top: 45%;
  // margin-top:45%;
}
.ivu-table {
  font-size: 13px;
}
.ivu-table-header {
  th {
    font-weight: normal;
    .ivu-table-cell {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
}
.cssload-speeding-wheel {
  width: 56px;
  height: 56px;
  margin: 0 auto;
  border: 3px solid #2d8cf0;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: cssload-spin 575ms infinite linear;
  -o-animation: cssload-spin 575ms infinite linear;
  -ms-animation: cssload-spin 575ms infinite linear;
  -webkit-animation: cssload-spin 575ms infinite linear;
  -moz-animation: cssload-spin 575ms infinite linear;
}
.cred {
  color: #ff3333;
}
.cgreen {
  color: #19be6b;
}
.cblue {
  color: #2d8cf0;
}

.fl_l {
  float: left;
}
.fl_r {
  float: right;
}

.clearfix::after {
  display: block;
  content: "";
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  zoom: 1;
} 
@keyframes cssload-spin {
  100% {
    transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-o-keyframes cssload-spin {
  100% {
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-ms-keyframes cssload-spin {
  100% {
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes cssload-spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-moz-keyframes cssload-spin {
  100% {
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
