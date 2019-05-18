<template>
    <div>
        <Cascader :data="FinanceData" v-model="FinanceValue" trigger="hover" :style="FinanceSelectData.style"
            @on-change='FinanceClassChange'></Cascader>
    </div>
</template>

<script>
    export default {
        props: ["FinanceSelectData"],
        data() {
            return {
                FinanceData: [],
                FinanceValue: []
            }
        },
        created() {
            // this.InitData();
        },
        methods: {
            async InitData() {
                this.$root
                    .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_ZiJinZouXiang, {
                        isRules: "show"
                    })
                    .then(res => {
                        if (this.FinanceSelectData.flag) {
                            delete res.data.data['transfer']
                        }
                        let data = []
                        for (let key in res.data.data) {
                            let dataObj = {}
                            dataObj.type = key
                            dataObj.subType = []
                            let obj = {}
                            obj.value = key
                            switch (key) {
                                case 'bonus':
                                    obj.label = '优惠'
                                    dataObj.name = '优惠'
                                    break;
                                case 'deposit':
                                    obj.label = '存款'
                                    dataObj.name = '存款'
                                    break;
                                case 'other':
                                    obj.label = '其他'
                                    dataObj.name = '其他'
                                    break;
                                case 'transfer':
                                    obj.label = '额度转换'
                                    dataObj.name = '额度转换'
                                    break;
                                case 'withdrawals':
                                    obj.label = '出款'
                                    dataObj.name = '出款'
                                    break;
                            }
                            obj.children = []
                            if (key !== "other") {
                                res.data.data[key].unshift({
                                    key: "",
                                    value: "全部"
                                });
                            }
                            res.data.data[key].forEach(item => {
                                if (this.FinanceSelectData.flag) { //存取款汇总页面不需要的小类
                                    if (item.key !== "cancelRebateBonus" && item.key !== "returnPoints" &&
                                        item.key !== "application" && item.key !== "refuse" && item.key !== "transfer") {
                                        obj.children.push({
                                            value: item.key,
                                            label: item.value,
                                        })
                                        if (item.key) {
                                            dataObj.subType.push({
                                                value: item.key,
                                                label: item.value
                                            })
                                        }
                                    }
                                } else {
                                    obj.children.push({
                                        value: item.key,
                                        label: item.value,
                                    })
                                }
                            });
                            this.FinanceData.push(obj)
                            data.push(dataObj)
                        }
                        this.$emit("init", data)
                        // console.log(data)
                        this.FinanceData.unshift({
                            value: "",
                            label: "全部"
                        })
                    })
            },
            FinanceClassChange(v) {
                this.$emit('listenOnChange', v)

            }
        },
        watch: {
            // FinanceSelectData: {
            //     handler: function (val, oldVal) {
            //         this.FinanceValue = val.data
            //     },
            //     deep: true
            // },
        }
    };
</script>

<style>
</style>