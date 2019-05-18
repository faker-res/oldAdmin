<template>
  <div class="clearfix">
    <AutoComplete
      :disabled="AutoCompleteData.disabled"
      :style="AutoCompleteData.style"
      v-model="userName"
      :placeholder="AutoCompleteData.tip"
      @on-focus="onFocus"
      @on-blur="onBlur"
      @on-select="onSelect"
      @on-search="onSearch"
      class="fl_l"
    >
      <Option
        v-for="(item,index) in AutoData"
        :value="item.userName"
        :key="index"
      >{{ item.userName }}</Option>
      <span
        style="display:block;text-align:center"
        v-if="tip===0"
      >请输入您要查询的内容</span>
      <span
        style="display:block;text-align:center"
        v-else-if="tip===1"
      >搜索中...</span>
      <span
        style="display:block;text-align:center"
        v-else-if="tip===2"
      >搜索完成</span>
      <span
        style="display:block;text-align:center;color:#ed3f14"
        v-else-if="tip===3"
      >账户不存在，请重新搜索</span>
    </AutoComplete>
    <div
      class="fl_l"
      style="margin-left:10px;font-size:12px;"
    >{{selectedUser.join(",")}}</div>
  </div>
</template>

<script>
export default {
  props: ["AutoCompleteData"],
  data() {
    return {
      tip: 0,
      userName: "",
      selectedUser: [],
      AutoData: []
    };
  },
  methods: {
    onFocus() {
      this.tip = 0;
      this.resetOption();
    },
    onBlur() {
      if (!this.AutoData.length) {
        this.$Message.error("该账户不存在！");
      }
    },
    onSelect(val) {
      console.log(val);
      if (val) {
        let mode = this.AutoCompleteData.mode;
        if (mode === "multiple") {
          this.selectedUser.push(val);
        }
        // 变更代理上级确认
        this.AutoData.forEach(item, i => {
          if (val === item.userName) {
            let data = {};
            data.id = item.id;
            data.siteId = item.siteId;
            this.$emit("listenSelect", data);
          }
        });
      }
      this.tip = 0;
      this.resetOption();
    },
    resetOption() {
      this.AutoData = [];
    },
    onSearch(val) {
      console.log(val);
      let params = {};
      let type = this.AutoCompleteData.type;
      switch (type) {
        case "指定会员":
          params.type = "member";
          break;
        case "指定代理":
          params.type = "agency";
          break;
        default:
          break;
      }
      params.siteId = this.AutoCompleteData.siteId;
      params.content = val;
      this.tip = 1;
      if (params.content) {
        let url = this.$root.HTTP_L.HTTP_HuoQuZhangHaoName;
        this.$root.HTTP_ALLLINKPOST(url, params).then(res => {
          if (res.data.data.length) {
            this.tip = 2;
            this.AutoData = res.data.data;
            // var st = this.params.userName.split(",");
            // for (let i = 0; i < st.length; i++) {
            //   this.AutoData.forEach((e, v, cb) => {
            //     if (e.userName == st[a]) {
            //       // this.$emit("listenOnChange",e);
            //       this.params.siteId = e.siteId;
            //       this.params.siteName = e.siteName;
            //       this.params.id = e.id;
            //       if (this.AutoCompleteData.xuanzhong) {
            //         this.AutoData.splice(v, 1);
            //       }
            //     } else {
            //       // 此处会影响输入用户名返水多个用户列表
            //       // this.params.id = null;
            //       // this.params.siteName = '';
            //       // this.params.siteId = null;
            //     }
            //   });
            // }
          } else {
            this.tip = 3;
            this.AutoData = [];
          }
        });
      }
    }
  },
  watch: {
    AutoCompleteData: {
      handler(val, oldVal) {
        if (val.data) {
          this.params.userName = val.data.Name;
        }
      },
      deep: true
    },
    userName: {
      handler(val, oldVal) {
        if (val.userName == "") return;
        this.$emit("listenOnChange", this.AutoData[0]);
      }
    }
  }
};
</script>

<style>
</style>
