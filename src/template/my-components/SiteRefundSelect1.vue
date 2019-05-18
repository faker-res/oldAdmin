<template>
  <div class="blockquote">
    <div v-if="!Object.keys(refundData).length">
      <Alert type="error" style="width:50%">当前代理下无返水信息，请选择有正确的返水的代理！</Alert>
    </div>
    <div v-else>
      <div v-for="(item, index) in refundData" :key="index">
        <div class="page-header">
          <h4 class="binding">
            <b>{{item.name}}</b>
          </h4>
        </div>
        <ul class="ulDetailsDlCJ">
          <li v-for="(v, k) in item.list" :key="k">
            <span class="key">{{v.name}}：</span>
            <span class="value">
              <input-number @on-change="ChangeRefunData(index,k,$event)" size="small" :value="Number(v.value)" :min="0" :max="SiteRefundSelectData.maxNum ? Number(superiorRefundData[index].list[k].value) : Infinity" :step="0.05"></input-number>
              <span v-if="SiteRefundSelectData.maxNum" style="font-size:10px;color:#ed3f14">上限：{{Number(superiorRefundData[index].list[k].value)}}</span>
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
 * type => siteId,大股东/返水等级时type为siteId
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
        if (newvalue !== oldvalue && newvalue) {
          this.InitData({
            isVerify: true
          });
          this.$emit("listenOnChange", this.refundData);
        }
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
    //获取上级的返水
    InitData(des) {
      //判断是不是传递siteId
      var SendData = {
        superiorId: this.SiteRefundSelectData.id || "0",
        siteId: this.SiteRefundSelectData.siteId
      };
      if (
        //大股东
        this.SiteRefundSelectData.type &&
        this.SiteRefundSelectData.type == "siteId"
      ) {
        //大股东没有上级，superiorId = 0 ,siteId 
        SendData.superiorId = 0;
        // SendData.siteId = this.SiteRefundSelectData["id"];
      }else {
        delete SendData.siteId;
      }
      if (this.SiteRefundSelectData.id) {
        //查询上级的返水(大股东为查询所属站点的返水)
        this.$root
          .HTTP_ALLLINKPOST(
            this.$root.HTTP_L.HTTP_ZhanDianFanShuiSheZhi,
            SendData 
          )
          .then(res => {
            this.$emit("getRebate", res.data.data.rebate);
            this.superiorRefundData = JSON.parse(
              JSON.stringify(res.data.data.platform)
            );
            if (
              des.isVerify &&
              this.SiteRefundSelectData.hasOwnProperty("data")
            ) {
              //编辑
              this.refundData = JSON.parse(
                JSON.stringify(this.SiteRefundSelectData.data.platform)
              );
              //如果有最大限制，若自己的返水大于上级的返水，调整为上级的返水
              if (this.SiteRefundSelectData.maxNum) {
                this.refundData.forEach((item, index) => {
                  item.list.forEach((i, k) => {
                    if (
                      i.value > this.superiorRefundData[index].list[k].value
                    ) {
                      i.value = this.superiorRefundData[index].list[k].value;
                    }
                  });
                });
              }
            } else {
              //新增
              this.refundData = JSON.parse(
                JSON.stringify(res.data.data.platform)
              );
            }
          });
      }
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