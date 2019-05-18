<template>
  <Select clearable :placeholder="BankSelectData.placeholder" :disabled="BankSelectData.disabled" v-model="defaultBank" :style="BankSelectData.style" @on-change="bankChange">
    <Option v-for="(item,i) in bankList" :value="item.bankName" :key="i">{{item.bankName}}</Option>
  </Select>
</template>

<script>
/**
 * props: ["BankSelectData"]
 * disabled => 是否禁用
 * style => 宽度width
 * placeholder => placeholder
 */
import bankList from '@/local/bankList'
export default {
  props: ["BankSelectData"],
  data() {
    return {
      defaultBank: "",
      bankList : bankList
    };
  },
  methods: {
    setDefaultBank(bank) {
      // 如果没有该银行就push到银行列表
      let flag = this.bankList.some(item => item.bankName == bank);
      if (!flag) this.bankList.push({ bankName: bank, imgSrc: "" });
      this.defaultBank = bank;
    },
    bankChange(re) {
      this.$emit("listenOnChange", re);
    }
  }
};
</script>

<style>
</style>
