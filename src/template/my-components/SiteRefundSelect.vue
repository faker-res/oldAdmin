<template>
  <div class="blockquote">
    <Alert
      type="error"
      style="width:50%"
      v-if="!Object.keys(refundData).length&&!!(SiteRefundSelectData.id+'')"
    >当前代理下无返水信息！</Alert>
    <Alert
      type="error"
      style="width:50%"
      v-else-if="!(SiteRefundSelectData.id+'')"
    >请先输入所属代理账号！</Alert>
    <div v-else>
      <div
        v-for="(item, index) in refundData"
        :key="index"
      >
        <div class="page-header">
          <h4 class="binding">
            <b>{{item.name}}</b>
          </h4>
        </div>
        <ul class="ulDetailsDlCJ">
          <li
            v-for="(v, k) in item.list"
            :key="k"
          >
            <span class="key">{{v.name}}：</span>
            <span class="value">
              <input-number
                @on-change="ChangeRefunData(index,k,$event)"
                size="small"
                :value="Number(v.value)"
                :min="0"
                :max="SiteRefundSelectData.maxNum ? Number(superiorRefundData[index].list[k].value) : Infinity"
                :step="0.05"
              ></input-number>
              <span
                v-if="SiteRefundSelectData.maxNum"
                style="font-size:10px;color:#ed3f14"
              >上限：{{Number(superiorRefundData[index].list[k].value)}}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * props[SiteRefundSelectData]
 * maxNum => 是否有最大限制
 * id => 上级id
 * siteId => 站点id
 * data => {platform:[]},会员/代理的返水
 */
export default {
  props: ["SiteRefundSelectData"],
  data() {
    return {
      refundData: {}, //会员/代理返水
      superiorRefundData: {} //上级返水
    };
  },
  watch: {
    "SiteRefundSelectData.id": {
      handler: function(newvalue, oldvalue) {
        this.fetchData();
        this.$emit("listenOnChange", this.refundData);
      },
      deep: true
    },
    refundData: {
      handler: function(newvalue, oldvalue) {
        this.$emit("listenOnChange", this.refundData);
      },
      deep: true
    }
  },
  methods: {
    ChangeRefunData(index, k, event) {
      this.refundData[index].list[k].value = event;
    },
    // 获取上级的返水
    fetchData() {
      /**
       * 新增页面，输入框自动显示上级的，方便操作调节，上限显示上级的
       * 编辑页面，输入框自动显示自己的，上限显示上级的
       */
      let params = {
        superiorId: this.SiteRefundSelectData.id,
        siteId: this.SiteRefundSelectData.siteId
      };

      let url = this.$root.HTTP_L.HTTP_ZhanDianFanShuiSheZhi;
      this.$root.HTTP_ALLLINKPOST(url, params).then(res => {
        if (this.SiteRefundSelectData.hasOwnProperty("data")) {
          // 编辑
          this.refundData = JSON.parse(
            JSON.stringify(this.SiteRefundSelectData.data.platform)
          );
        } else {
          // 新增
          this.refundData = JSON.parse(JSON.stringify(res.data.data.platform));
        }
        this.superiorRefundData = JSON.parse(
          JSON.stringify(res.data.data.platform)
        );
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ulDetailsDlCJ {
  .key {
    display: inline-block;
    width: 92px;
  }
}
</style>