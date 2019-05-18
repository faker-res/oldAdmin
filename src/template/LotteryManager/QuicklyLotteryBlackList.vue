<template>
    <div class="content-main member-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}</h1>
            </div>
            <div class="page-con1">
                <div class="c_left">
                    <i-col class="c_search_top" span="24">
                        <Card dis-hover>
                            <Form :model="search" inline>
                                <FormItem label="站点">
                                    <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange"
                                        :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                                </FormItem>
                                <FormItem label="会员账号">
                                    <i-input v-model="search.userName"></i-input>
                                </FormItem>
                                <FormItem class="form-group">
                                    <Button @click="Search" type="primary">查询</Button>
                                    <Button @click="SearchRest" type="warning">重置</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </i-col>
                    <i-col class="c_search_result" span="24">
                        <div class="serach">
                            <div class="have_con">
                                <div class="data_sj">
                                    <div class="caozuo_btn">
                                        <Button type="primary" @click="addModal=true;add.userName=''">添加黑名单</Button>
                                    </div>
                                    <div style="margin: 10px 0;overflow: hidden">
                                        <QuickLotteryBackList :table="table"></QuickLotteryBackList>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </i-col>
                </div>
            </div>
        </div>
        <Modal v-model="addModal" title="添加黑名单" @on-ok="addBlackList">
            <Form :model="search" :label-width="80">
                <FormItem label="站点">
                    <SiteNameSelect ref="SiteNameSelect" @listenOnChange="addSiteChange" :SiteNameSelectData="AddSiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="会员账号">
                    <i-input v-model="add.userName" style="width:260px;"></i-input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import QuickLotteryBackList from "@/template/my-components/iview-table/table";
    import mixins from "@/mixins";
    export default {
        name: "QuicklyLotteryBlackList",
        mixins: [mixins],
        components: {
            QuickLotteryBackList
        },
        data() {
            return {
                addModal: false,
                search: {
                    siteId: "",
                    userName: ""
                },
                add: {
                    siteId: "",
                    userName: ""
                },
                AddSiteNameSelectData: {
                    type: '单选',
                    placeholder: '请选择站点名称',
                    style: {
                        width: '260px'
                    }
                },
                // addBlackListRelus: {
                //     siteId: [{
                //         required: true,
                //         message: "请选择站点",
                //     }],
                //     userName: [{
                //         required: true,
                //         message: "会员账号不能为空",
                //         trigger: "blur"
                //     }],
                // },
                table: {
                    TableColumn: [{
                            title: "站点",
                            key: "siteName",
                        },
                        {
                            title: "会员账号",
                            key: "userName",
                        },
                        {
                            title: "添加时间",
                            key: "addTime",
                            render: (h, params) => {
                                return h('span', this.$moment.unix(params.row.addTime - 0).format("LLL"));
                            }
                        },
                        {
                            title: "操作",
                            key: "",
                            width: 200,
                            render: (h, params) => {
                                var that = this;
                                return h("div", [
                                    h(
                                        "Button", {
                                            props: {
                                                size: "small"
                                            },
                                            on: {
                                                click: () => {
                                                    this.$Modal.confirm({
                                                        title: "提示",
                                                        content: `<h3>确认删除吗？</h3>`,
                                                        loading: false,
                                                        onOk: () => {
                                                            this.$root.HTTP_ALLLINKPOST(
                                                                this.$root.HTTP_L.HTTP_QuicklyLotteryBackList_Delete, {
                                                                    siteId: params.row.siteId,
                                                                    id: params.row.id
                                                                }).then(res => {
                                                                    this.$Modal.success({
                                                                        title: "提示",
                                                                        content: res.data.data
                                                                    });
                                                                    this.table.TableData.data.splice(params.index,1);
                                                            })
                                                        },
                                                        onCancel: () => {}
                                                    });

                                                }
                                            }
                                        },
                                        "删除"
                                    )
                                ]);
                            }
                        }
                    ],
                    TableData: {},
                    loading: true,
                    align: "center",
                    posturl: this.$root.HTTP_L.HTTP_QuicklyLotteryBackList,
                    Refresh: 0,
                    dataform: {
                        isRules: "select",
                        siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
                    }
                }
            };
        },
        methods: {
            siteChange(re) {
                if (re.SiteId) {
                    this.search.siteId = re.SiteId;
                }
            },
            addSiteChange(re) {
                if (re.SiteId) {
                    this.add.siteId = re.SiteId;
                }
            },
            Search() {
                this.table.dataform = JSON.parse(JSON.stringify(this.search));
            },
            SearchRest() {
                this.search = {
                    siteId: this.defaultSiteId,
                    userName: ""
                };
                this.Search()
            },
            addBlackList() {
                if (this.add.siteId && this.add.userName) {
                    this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_QuicklyLotteryBackList_Add, this.add)
                        .then(res => {
                            this.add.userName = ""
                            this.$Modal.success({
                                title: "提示",
                                content: res.data.data
                            });
                            this.table.Refresh++
                        })

                } else {
                    this.$Modal.error({
                        title: "提示",
                        content: "请填写完整信息"
                    });

                }
            }
        }
    };
</script>