<template>
  <div>
    <Select 
    v-if="SiteNameSelectData.type=='单选'" 
    v-model="singleData.SiteId" 
    :clearable="SiteNameSelectData.clearable" 
    :disabled="SiteNameSelectData.disabled" 
    :placeholder="SiteNameSelectData.placeholder" 
    :style="SiteNameSelectData.style">
      <Option v-for="item in siteIdList" :value="item.id" :key="item.id">{{ item.siteName }}</Option>
    </Select>
    <Select 
    v-else multiple 
    v-model="multipleData.SiteId" 
    :disabled="SiteNameSelectData.disabled" 
    :placeholder="SiteNameSelectData.placeholder" 
    :style="SiteNameSelectData.style">
      <Option v-for="item in siteIdList" :value="item.id" :key="item.id">{{ item.siteName }}</Option>
    </Select>
  </div>
</template>

<script>
/**
 * props[SiteNameSelectData]
 * type => 单选/多选
 * disabled => 禁用
 * clearable => 清除按钮
 * placeholder => 定义placeholder
 * style => { width: "260px" }
 */
export default {
  props: ["SiteNameSelectData"],
  data() {
    return {
      singleData: {
        SiteId: null
      },
      multipleData: {
        SiteId: []
      },
      siteIdList: []
    };
  },
  created() {
    this.$nextTick(()=>{
      this.getSiteList();
    })
  },
  watch: {
    "$root.AllSiteNameList": {
      handler(val, oldVal) {
        if (val) {
          // 如果本地有就从本地取，否则就从根节点取
          this.siteIdList = val;
          this.InitData();
        }
      },
      deep: true
    },
    singleData: {
      handler(val, oldVal) {
        this.singleChange(val);
      },
      deep: true
    },
    multipleData: {
      handler(val, oldVal) {
        this.multipleChange(val);
      },
      deep: true
    }
  },
  methods: {
    getSiteList() {
      // 如果本地有就从本地取，否则就从根节点取
      if (localStorage.AllSiteNameList) {
        this.siteIdList = JSON.parse(localStorage.AllSiteNameList);
        this.InitData();
      }
    },
    async setDefaultSite(siteId) {
      // 如果跳转页面需要同步站点可以异步调用这个方法
      if (this.SiteNameSelectData.type == "单选") {
        this.singleData.SiteId = siteId;
      } else {
        this.multipleData.SiteId = siteId;
      }
    },
    async InitData() {
      //初始化默认站点,多选不需要(创建管理员)
      //编辑时不需要默认第一个站点,只需调用setDefaultSite方法即可，以减少因为站点变化发起的请求
      if (this.SiteNameSelectData.type == "单选" && !this.SiteNameSelectData.edit) {
        this.singleData.SiteId = this.siteIdList[0].id;
      }
    },
    async sendSiteList() {
      // 如其他页面需要站点数据，可直接调用该方法，减少请求数据，如站点列表页面
      return this.siteIdList;
    },
    singleChange(val) {
      let data = { ...this.singleData };
      this.siteIdList.forEach(s => {
        if (s.id == val.SiteId) {
          data.SiteName = s.siteName;
          data.paymentBonus = JSON.parse(s.siteConfig).limit.paymentBonus;
        }
      });
      this.$emit("listenOnChange", data);
    },
    multipleChange(val) {
      let data = { ...this.multipleData };
      data.SiteName = [];
      this.siteIdList.forEach(s => {
        data.SiteId && data.SiteId.forEach(v => {
            if (s.id == v) {
              data.SiteName.push(s.siteName);
            }
          });
      });
      this.$emit("listenOnChange", data);
    }
  }
};
</script>

<style>
</style>