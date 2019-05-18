<template>
  <AutoComplete
    :disabled="AutoCompleteData.disabled"
    :style="AutoCompleteData.style"
    v-model="semodel.userName"
    @on-focus="tip=0"
    @on-blur="checkExist"
    @on-select="XuanZhong"
    @on-search="SearchID(AutoCompleteData.type)"
    :placeholder="AutoCompleteData.tip"
    :key="0"
    style="width:400px"
  >
    <Option
      v-for="(item,index) in AutoData"
      v-show="semodel.userName!==''&&Object.keys(AutoData[0]).length!==0"
      :value="item.userName"
      :key="index"
    >{{ item.userName }}</Option>
    <small
      style="display:block;text-align:center"
      v-if="tip===1"
    >搜索中...</small>
    <small
      style="display:block;text-align:center"
      v-else-if="tip===2"
    >搜索完成</small>
    <small
      style="display:block;text-align:center;color:#ed3f14"
      v-else-if="tip===3"
    >账户不存在，请重新搜索</small>
    <small
      style="display:block;text-align:center"
      v-else
    >请输入您要查询的内容</small>
  </AutoComplete>
</template>

<script>
export default {
  props: ["AutoCompleteData"],
  data() {
    return {
      tip: 0,
      semodel: {
        id: null,
        userName: "",
        siteId: null,
        siteName: ""
      },
      AutoData: [{ id: "", userName: "", siteId: null, siteName: "" }]
    };
  },
  methods: {
    checkExist() {
      if (!this.AutoData[0].userName) {
        this.$Message.error("该账户不存在！");
      } 
    },
    XuanZhong(er) {
      for (let n = 0; n < this.AutoData.length; n++) {
        if (er == this.AutoData[n].userName) {
          this.semodel.id = this.AutoData[n].id;
          this.semodel.siteId = this.AutoData[n].siteId;
          this.semodel.siteName = this.AutoData[n].siteName;
          // 变更代理上级确认
          this.$emit("listenSelect", {id:this.semodel.id,siteId:this.semodel.siteId});
        }
      }
      if (this.AutoCompleteData.xuanzhong) {
        if (!this.semodel.userName.includes(",")) {
          this.semodel.userName = er + ",";
        } else {
          this.semodel.userName =
            this.semodel.userName.slice(
              0,
              this.semodel.userName.lastIndexOf(",") + 1
            ) +
            er +
            ",";
        }
        this.AutoData = [{ id: "", userName: "", siteId: null, siteName: "" }];
      } else {
        this.AutoData = [{ id: "", userName: "", siteId: null, siteName: "" }];
      }
    },
    SearchID(da) { 
      this.AutoData = [{ id: "", userName: "", siteId: null, siteName: "" }];
      let sd = {};
      let content = "";
      let siteId = this.AutoCompleteData.siteId;
      if (this.semodel.userName.includes(",")) {
        content = this.semodel.userName.substring(
          this.semodel.userName.lastIndexOf(",") + 1
        );
      } else {
        content = this.semodel.userName;
      }
      switch (da) {
        case "指定会员":
          sd = this.AutoCompleteData.siteId
            ? { type: "member", content: content, siteId: siteId }
            : { type: "member", content: content };
          break;
        case "指定代理":
          sd = this.AutoCompleteData.siteId
            ? { type: "agency", content: content, siteId: siteId }
            : { type: "agency", content: content };
          break;
      }
      this.tip = 1;
      if (this.semodel.userName && sd.content) {
        this.$root
          .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuZhangHaoName, sd)
          .then(res => {
            if (res.data.data.length) {
              this.tip = 2;
              this.AutoData = res.data.data;
              var st = this.semodel.userName.split(",");
              for (let a = 0; a < st.length; a++) {
                this.AutoData.forEach((e, v, cb) => {
                  if (e.userName == st[a]) {
                    // this.$emit("listenOnChange",e);
                    this.semodel.siteId = e.siteId;
                    this.semodel.siteName = e.siteName;
                    this.semodel.id = e.id;
                    if (this.AutoCompleteData.xuanzhong) {
                      this.AutoData.splice(v, 1);
                    }
                  } else {
                    // 此处会影响输入用户名返水多个用户列表
                    // this.semodel.id = null;
                    // this.semodel.siteName = '';
                    // this.semodel.siteId = null;
                  }
                });
              }
            } else {
              this.tip = 3;
              this.AutoData = [
                { id: "", userName: "", siteId: null, siteName: "" }
              ];
            }
          })
          .catch(res => {
            this.AutoData = [
              { id: "", userName: "", siteId: null, siteName: "" }
            ];
          });
      }
    }
  },
  watch: {
    AutoCompleteData: {
      handler: function(val, oldVal) {
        if (val.data) {
          this.semodel.userName = val.data.Name;
          this.semodel.id = val.data.Id;
          // this.semodel.siteId = val.data.siteId;
          // this.semodel.siteName =val.data.siteName;
        }
      },
      deep: true
    },
    semodel: {
      handler: function(val, oldVal) {
        if (val.userName == "") {
          this.semodel.id = null;
          // this.semodel.userName = '';
        }
        this.$emit("listenOnChange", val);
      },
      deep: true
    }
  }
};
</script>

<style>
</style>
