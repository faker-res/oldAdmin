<template>
    <Modal class-name="vertical-center-modal system-log-modal" v-model="data.dianJiHuiYuan" :loading="$root.btnLoading" width="800"
        ok-text="搜索" cancel-text="取消" @on-ok="Search">
        <div>
            投注平台：
            <span v-if="betPlatform.length">
                <a href="javascript:void(0);" v-for="(item,index) in betPlatform" :key="index" :label="item.tmp" @click="searchBetInfo(item.tmp,item.platform)">{{item.platform_name}}(投注次数：{{item.betCount}})</a>
            </span>
            <span v-else>无</span>
        </div>
        <table>
            <tbody>
                <tr>
                    <td rowspan="2">
                        <!-- <Checkbox> -->
                        <span>入款、出款交易</span>
                        <!-- </Checkbox> -->
                    </td>
                    <td>
                        <Checkbox v-model="deposit" @click.prevent.native="checkAll('deposit')">
                            <span>入款</span>
                        </Checkbox>
                    </td>
                    <td>
                        <Checkbox v-model="withdrawals" @click.prevent.native="checkAll('withdrawals')">
                            <span>出款</span>
                        </Checkbox>
                    </td>
                    <td>
                        <Checkbox v-model="bonus" @click.prevent.native="checkAll('bonus')">
                            <span>优惠</span>
                        </Checkbox>
                    </td>
                    <td>
                        <Checkbox v-model="transfer" @click.prevent.native="checkAll('transfer')">
                            <span>额度转换</span>
                        </Checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <CheckboxGroup v-model="search.deposit">
                            <Checkbox v-for="(item,index) in financeList.deposit" :key="index" :label="item.key">
                                <span>{{item.value}}</span>
                            </Checkbox>
                        </CheckboxGroup>
                    </td>
                    <td>
                        <CheckboxGroup v-model="search.withdrawals">
                            <Checkbox v-for="(item,index) in financeList.withdrawals" :key="index" :label="item.key">
                                <span>{{item.value}}</span>
                            </Checkbox>
                        </CheckboxGroup>
                    </td>
                    <td>
                        <CheckboxGroup v-model="search.bonus">
                            <Checkbox v-for="(item,index) in financeList.bonus" :key="index" :label="item.key">
                                <span>{{item.value}}</span>
                            </Checkbox>
                        </CheckboxGroup>
                    </td>
                    <td>
                        <CheckboxGroup v-model="search.transfer">
                            <Checkbox v-for="(item,index) in transferList" :key="index" :label="item.key">
                                <span>{{item.value}}</span>
                            </Checkbox>
                        </CheckboxGroup>
                    </td>
                </tr>
            </tbody>

        </table>
    </Modal>
</template>
<script>
    export default {
        name: "",
        props: ["data", "time"],
        data() {
            return {
                platformData: this.data,
                betPlatform: [], //下注平台
                financeList: {},//资金走向类型
                transferList: [],//转账平台走向类型
                search: {
                    deposit: [],//入款
                    withdrawals: [],//出款
                    bonus: [],//优惠
                    transfer: []//额度转换
                },
                deposit: false,
                withdrawals: false,
                bonus: false,
                transfer: false
            };
        },
        created() {
            //获取转账平台走向类型，即‘额度转换’
            this.$root
                .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_ZhuanZhangPingTai)
                .then(res => {
                    this.transferList = res.data.data;
                });
            //获取资金走向类型，即‘出款、入款、优惠’
            this.$root
                .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_ZiJinZouXiang)
                .then(res => {
                    this.financeList = res.data.data;
                });
        },
        cumputed: {},
        watch: {
            "platformData.dianJiHuiYuan": function (val) {
                if (val) {
                    //获取会员的下注平台
                    this.$root
                        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XiaZhuPingTai, {
                            //测试写死
                            // siteId: 2,
                            // username: "weinisi888",
                            // startTime: "2018-07-10 00:00:00",
                            // endTime: "2018-07-16 00:00:00"
                            siteId: this.data.siteId,
                            username: this.data.username,
                            startTime: this.$moment(this.time[0]).format("LLL"),
                            endTime: this.$moment(this.time[1]).format("LLL")
                        })
                        .then(res => {
                            this.betPlatform = res.data.data;
                        });
                } else {
                    this.search = {
                        deposit: [],
                        withdrawals: [],
                        bonus: [],
                        transfer: []
                    };
                }
            },
            search: {
                handler: function (newValue, oldValue) {
                    this.deposit =
                        newValue.deposit.length === this.financeList.deposit.length ?
                        true :
                        false;
                    this.withdrawals =
                        newValue.withdrawals.length === this.financeList.withdrawals.length ?
                        true :
                        false;
                    this.bonus =
                        newValue.bonus.length === this.financeList.bonus.length ?
                        true :
                        false;
                    this.transfer =
                        newValue.transfer.length === this.transferList.length ? true : false;
                },
                deep: true
            }
        },
        methods: {
            Search() {
                let type = [];
                let subType = [];
                let data = {};
                for (let key in this.search) {
                    if (this.search[key].length !== 0) {
                        type.push(key);
                        this.search[key].forEach(i => {
                            subType.push(i);
                        });
                    }
                }
                data = {
                    type: type.toString(),
                    subType: subType.toString(),
                    siteId: this.data.siteId,
                    username: this.data.username,
                    startTime: this.$moment(this.time[0]).format("LLL"),
                    endTime: this.$moment(this.time[1]).format("LLL")
                    //测试写死
                    // siteId: 2,
                    // username: "weinisi888",
                    // startTime: "2018-07-10 00:00:00",
                    // endTime: "2018-07-16 00:00:00"
                };
                this.$emit("SouSuoJieGuoXianShi", {
                    flag: true,
                    data: data
                })
            },
            checkAll(type) {//全选
                switch (type) {
                    case "deposit":
                        this.deposit = !this.deposit;
                        if (this.deposit) {
                            let depositList = [];
                            this.financeList.deposit.forEach(item => {
                                depositList.push(item.key);
                            });
                            this.search.deposit = depositList;
                        } else {
                            this.search.deposit = [];
                        }
                        break;
                    case "withdrawals":
                        this.withdrawals = !this.withdrawals;
                        if (this.withdrawals) {
                            let withdrawalsList = [];
                            this.financeList.withdrawals.forEach(item => {
                                withdrawalsList.push(item.key);
                            });
                            this.search.withdrawals = withdrawalsList;
                        } else {
                            this.search.withdrawals = [];
                        }
                        break;
                    case "bonus":
                        this.bonus = !this.bonus;
                        if (this.bonus) {
                            let bonusList = [];
                            this.financeList.bonus.forEach(item => {
                                bonusList.push(item.key);
                            });
                            this.search.bonus = bonusList;
                        } else {
                            this.search.bonus = [];
                        }
                        break;
                    case "transfer":
                        this.transfer = !this.transfer;
                        if (this.transfer) {
                            let transferList = [];
                            this.transferList.forEach(item => {
                                transferList.push(item.key);
                            });
                            this.search.transfer = transferList;
                        } else {
                            this.search.transfer = [];
                        }
                        break;
                }
            },
            searchBetInfo(type, platform) {
                //查询平台的下注记录
                let data = {
                    //测试写死
                    // userName: "weinisi888",
                    userName: this.data.username,
                    platform: platform,
                    timeStart: this.$moment(this.time[0]).format("LLL"),
                    timeEnd: this.$moment(this.time[1]).format("LLL"),
                    type: type
                };
                this.$root
                    .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ChaXunXiaZhuJiLu, data)
                    .then(res => {});
            }
        },
        mounted() {}
    };
</script>
<style lang='less' scoped>
    table {
        margin: 0 auto;
        border-collapse: collapse;
        tr {
            width: 100%;
            td {
                border: 1px solid #e9eaec;
                padding: 10px 20px;
                vertical-align: top;
                .ivu-checkbox-group {
                    .ivu-checkbox-group-item {
                        display: block;
                    }
                }
            } // &:first-child{
            //     td{
            //         text-align: center;
            //     }
            // }
        }
    }
</style>