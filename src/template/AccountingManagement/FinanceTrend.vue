<template>
    <div class="content-main member-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}
                </h1>
            </div>
            <div class="page-con1">
                <Button type="info" class="back-button" @click="$root.go_back">返回上一页</Button>
                <div class="c_left">
                    <i-col class="c_search_top" span="24">
                        <Card dis-hover>
                            <i-form :model="search" inline>
                                <!-- <FormItem label="存款">
                                    <Select placeholder="选择" v-model="typeSearch.deposit" style="width:160px">
                                        <Option v-for="(item,i) in financeList.deposit" :value="item.key" :key="i" :label="item.value"></Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="出款">
                                    <Select placeholder="选择" v-model="typeSearch.withdrawals" style="width:160px">
                                        <Option v-for="(item,i) in financeList.withdrawals" :value="item.key" :key="i" :label="item.value"></Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="优惠">
                                    <Select placeholder="选择" v-model="typeSearch.bonus" style="width:160px">
                                        <Option v-for="(item,i) in financeList.bonus" :value="item.key" :key="i" :label="item.value"></Option>
                                    </Select>
                                </FormItem> -->
                                <!-- <FormItem v-model="typeSearch.transfer" multiple label="额度转换">
                                    <Select placeholder="选择" style="width:160px">
                                        <Option v-for="(item,i) in transferList" :value="item.key" :key="i" :label="item.value"></Option>
                                    </Select>
                                </FormItem> -->
                                <FormItem label="类型">
                                    <FinanceSelect ref="FinanceSelect" :FinanceSelectData="FinanceSelectData"
                                        @listenOnChange="financeChange" />
                                </FormItem>
                                <FormItem label="日期">
                                    <DatePicker type="datetimerange" v-model="Time" format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="请选择日期" style="width: 330px"></DatePicker>
                                </FormItem>
                                <FormItem label="每页笔数">
                                    <Select v-model="search.limit" style="width:80px">
                                        <Option value="10" label="10">10</Option>
                                        <Option value="25" label="25">25</Option>
                                        <Option value="50" label="50">50</Option>
                                        <Option value="80" label="80">80</Option>
                                    </Select>
                                </FormItem>
                                <FormItem class="form-group">
                                    <Button @click="Search" type="primary">查询</Button>
                                    <Button @click="SearchRest" type="warning">重置</Button>
                                </FormItem>
                            </i-form>
                        </Card>
                    </i-col>
                </div>
                <div class="c_right">
                    <i-col class="c_search_result" span="24">
                        <div style="margin: 10px 0;overflow: hidden">
                            <FinanceTrendTable :table="table"></FinanceTrendTable>
                        </div>
                        <div v-if="Object.keys(this.total).length">
                            <p>
                                <span>{{total.bonus.bonus_name}}：{{total.bonus.bonus_total}}，</span>
                                <span v-for="(item,i) in total.bonus.list" :key="i">{{item.name}}：{{item[Object.keys(item)[1]]}}，</span>
                            </p>
                            <p>
                                <span>{{total.deposit.deposit_name}}：{{total.deposit.deposit_total}}，</span>
                                <span v-for="(item,i) in total.deposit.list" :key="i">{{item.name}}：{{item[Object.keys(item)[1]]}}，</span>
                            </p>
                            <p>
                                <span>{{total.transfer.transfer_name}}：{{total.transfer.transfer_total}}，</span>
                                <span v-for="(item,i) in total.transfer.list" :key="i">{{item.name}}：{{item[Object.keys(item)[1]]}}，</span>
                            </p>
                            <p>
                                <span>{{total.withdrawals.withdrawals_name}}：{{total.withdrawals.withdrawals_total}}，</span>
                                <span v-for="(item,i) in total.withdrawals.list" :key="i">{{item.name}}：{{item[Object.keys(item)[1]]}}，</span>
                            </p>
                        </div>
                    </i-col>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import FinanceTrendTable from "@/template/my-components/iview-table/table";
    import FinanceSelect from "@/template/my-components/FinanceSelect.vue";
    export default {
        components: {
            FinanceTrendTable,
            FinanceSelect
        },
        data() {
            return {
                Time: [],
                // financeList: {}, //资金走向类型
                // transferList: [], //转账平台走向类型(额度转换)
                total: {},
                // typeSearch: {
                //     deposit: '', //入款
                //     withdrawals: '', //出款
                //     bonus: '', //优惠
                //     transfer: ''//额度转换
                // },
                search: {
                    siteId: this.$route.query.siteId,
                    username: this.$route.query.username,
                    type: "",
                    subType: "",
                    startTime: "",
                    endiTime: "",
                    limit: "10"
                },
                FinanceSelectData: {
                    // default: true,
                    // type: "单选",
                    placeholder: "请选择",
                    style: {
                        width: "200px"
                    }
                },
                table: {
                    TableColumn: [{
                            title: "站点",
                            key: "siteName",
                            minWidth: 120
                        },
                        {
                            title: "账号",
                            key: "username",
                            minWidth: 100
                        },
                        {
                            title: "账变类型",
                            key: "type_name",
                            minWidth: 80
                        },
                        {
                            title: "账变内容",
                            minWidth: 140,
                            key: "subType_name"
                        },
                        {
                            title: "账变前金额",
                            minWidth: 120,
                            key: "beforMoney"
                        },
                        {
                            title: "账变金额",
                            key: "money",
                            minWidth: 120
                        },
                        {
                            title: "账变后金额",
                            key: "afterMoney",
                            minWidth: 120
                        },
                        {
                            title: "备注",
                            key: "remarks",
                            minWidth: 300,
                            // render: (h, params) => {
                            //     return h("a", [
                            //         h(
                            //             "Tooltip", {
                            //                 props: {
                            //                     content: params.row.remarks == "" ? "无" : params.row.remarks,
                            //                     placement: "left"
                            //                 }
                            //             },
                            //             params.row.remarks.length > 5 ?
                            //             params.row.remarks.slice(0, 5) + "..." :
                            //             params.row.remarks == "" ? "无" : params.row.remarks
                            //         )
                            //     ]);
                            // }
                        },
                        {
                            title: "存入时间",
                            key: "created_at",
                            minWidth: 150,
                            render: (h, params) => {
                                return h('span',this.$moment.unix(params.row.created_at - 0).format("LLL"));
                            }
                        }
                    ],
                    TableData: {},
                    loading: true,
                    align: "center",
                    posturl: this.$root.HTTP_L.HTTP_ZiJinZouXiangJiLu,
                    Refresh: 0,
                    dataform: {
                        isRules: 'select',
                        username: this.$route.query.username,
                        siteId: this.$route.query.siteId,
                        startTime: this.$route.query.startTime,
                        endTime: this.$route.query.endTime,
                        limit: "10"
                    }
                }
            };
        },
        created() {
            this.Time = [this.$route.query.startTime, this.$route.query.endTime];
            //获取转账平台走向类型，即‘额度转换’
            // this.$root
            //     .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_ZhuanZhangPingTai,{isRules : "show"})
            //     .then(res => {
            //         this.transferList = res.data.data;
            //     });
            //获取资金走向类型，即‘出款、入款、优惠’
            // this.$root
            //     .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_ZiJinZouXiang ,{isRules : "show"})
            //     .then(res => {
            //         this.financeList = res.data.data;
            //     });
        },
        methods: {
            // mechange(re) {
            //     this.search.siteId = re.SiteId;
            //     this.LevelSelectConf.siteId = re.SiteId;
            //     // this.$refs.CommonLevelSelect.InitData();
            // },
            getToal() {
                //总计
                this.search.startTime = this.$moment(this.Time[0]).format("LLL")
                this.search.endTime = this.$moment(this.Time[1]).format("LLL")

                // for (let key in this.typeSearch) {
                //     if (this.typeSearch[key]) {
                //         this.search.type = key
                //         this.search.subType = this.typeSearch[key]
                //     }
                // }
                for (let key in this.search) {
                    if (this.search[key] == null || this.search[key] == "") {
                        delete this.search[key];
                    }
                }
                this.$root
                    .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Statistics_FinanceSummary, this.search)
                    .then(res => {
                        this.total = res.data.data;
                    });
            },
            Search() {
                this.search.startTime = this.$moment(this.Time[0]).format("LLL")
                this.search.endTime = this.$moment(this.Time[1]).format("LLL")
                // 多选
                // let type = [];
                // let subType = [];
                // let data = {};
                // for (let key in this.typeSearch) {
                //     if (this.typeSearch[key].length !== 0) {
                //         type.push(key);
                //         this.typeSearch[key].forEach(i => {
                //             subType.push(i);
                //         });
                //     }
                // }
                // this.search.type = type.toString()
                // this.search.subType = subType.toString()

                // for (let key in this.typeSearch) {
                //     if (this.typeSearch[key]) {
                //         this.search.type = key
                //         this.search.subType = this.typeSearch[key]
                //     }
                // }
                for (let key in this.search) {
                    if (this.search[key] == null || this.search[key] == "") {
                        delete this.search[key];
                    }
                }
                this.table.dataform = JSON.parse(JSON.stringify(this.search));
                this.getToal()
            },
            SearchRest() {
                this.$refs.FinanceSelect.FinanceValue = []
                // this.typeSearch = {
                //     deposit: '', //入款
                //     withdrawals: '', //出款
                //     bonus: '', //优惠
                //     transfer: '' //额度转换
                // }
                this.search = {
                    username: this.$route.query.username,
                    siteId: this.$route.query.siteId,
                    type: "",
                    subType: "",
                    startTime: "",
                    endTime: "",
                    limit: "10"
                };
                this.Time = [this.$moment({
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                }).format("LLL"), this.$moment(new Date().getTime() - 2000).format("LLL")];
                // this.Time = [this.$route.query.startTime, this.$route.query.endTime];
                this.Search()
            },
            financeChange(v) {
                this.search.type = v[0]
                this.search.subType = v[1]
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.FinanceSelect.InitData();
                this.getToal(this.$route.query.siteId, this.$route.query.username, this.$route.query.startTime,
                    this.$route
                    .query.endTime)
            });
        },
        // watch: {
        //     'typeSearch.deposit': function (val, oldVal) {
        //         if (val) {
        //             this.typeSearch.withdrawals = ''
        //             this.typeSearch.bonus = ''
        //         }
        //     },
        //     'typeSearch.withdrawals': function (val, oldVal) {
        //         if (val) {
        //             this.typeSearch.deposit = ''
        //             this.typeSearch.bonus = ''
        //         }
        //     },
        //     'typeSearch.bonus': function (val, oldVal) {
        //         if (val) {
        //             this.typeSearch.withdrawals = ''
        //             this.typeSearch.deposit = ''
        //         }
        //     },
        // }
    };
</script>
<style lang="less" scoped>
    .back-button {
        margin-bottom: 10px;
    }
</style>