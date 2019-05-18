<template>
  <Cascader :data="foudClassData" v-model="foudClassValue" trigger="hover" :style="FoudClassSelectConf.style" @on-change='foudClassChange'></Cascader>
</template>
<script>
export default {
  props: ["FoudClassSelectConf"],
  data() {
    return {
      foudClassData: [],
      foudClassValue: []
    };
  },
  methods: {
    async InitData() {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_GongGongLeiXingZu)
        .then(res => {
          var result = res.data.data.balance;
          function casePush(targetObj, resObj) {
            for (let key in resObj) {
              targetObj.children.push({
                label: resObj[key],
                value: key
              });
            }
          }
          for (let key in result) {
            let obj = {};
            obj.value = key;
            obj.children = [];
            switch (key) {
              case "bet":
                obj.label = "下注";
                casePush(obj, result["bet"]);
                break;
              case "bonus":
                obj.label = "返水";
                casePush(obj, result["bonus"]);
                break;
              case "deposit":
                obj.label = "线上存款";
                casePush(obj, result["deposit"]);
                break;
              case "withdrawals":
                obj.label = "提款";
                casePush(obj, result["withdrawals"]);
                break;
              default:
                break;
            }
            this.foudClassData.push(obj);
          }
        });
    },
    foudClassChange(v, selectedData) {
      this.$emit("listenOnChange", v);
    }
  }
};
</script>