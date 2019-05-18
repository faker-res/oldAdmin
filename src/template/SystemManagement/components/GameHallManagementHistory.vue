<template>
    <div class="content-main verfify-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}} <span></span></h1>
            </div>
            <div class="page-con1">
                <div class="search_button">
                    <Button type="primary" @click="m_serarch=true">搜索</Button>
                    <router-link style="float:right" :to="{name:'GameHallManagement_id'}">回娱乐城管理详细资料 >></router-link>
                </div>
                <Alert show-icon>
                    暂无内容
                    <template slot="desc">请添加搜索条件进行搜索</template>
                </Alert>
                <div class="table_data">
                    <Table :columns="columns" :data="search_data"></Table>
                </div>
            </div>
        </div>
        <Modal class-name="vertical-center-modal"  v-model="m_serarch" title="条件搜索">
            <Form :model="SearchItem" :label-width="100">
                <FormItem label="日期">
                    <DatePicker v-model="SearchItem.date" type="datetimerange" placeholder="选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="内容包含">
                    <i-input v-model="SearchItem.baohanneirong" style="width:300px" placeholder="单一序号搜寻"></i-input>
                </FormItem>
                <FormItem label="内容排除">
                    <i-input v-model="SearchItem.neironhgpaichu" style="width:300px" placeholder="可输入多个，请以半形逗号隔开"></i-input>
                </FormItem>
                <FormItem label="操作人员">
                    <i-input v-model="SearchItem.caozuoren" style="width:300px"></i-input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
export default {
    data () {
        return {
            routerParams: this.$route.params.id,
            m_serarch: false,
            SearchItem: {
                danhao: '',
                baohanneirong: '',
                neironhgpaichu: '',
                caozuoren: ''
            },
            columns: [
                {
                    title: '时间',
                    key: 'Time',
                    render: (h, params) => {
                        return h(
                            'span', {
                                props: {}

                            }, this.$moment(Number(params.row.Time.slice(6, params.row.Time.indexOf(')')))).format('llll') + '-' + this.$moment(Number(params.row.Time.slice(6, params.row.Time.indexOf(')')))).fromNow()
                        );
                    }
                },
                {
                    title: '内容',
                    key: 'Content',
                    //   render: (h, params) => {
                    //     let x = "";
                    //     switch (params.row.Content) {
                    //       case "关闭":
                    //         x = <b style="color:red">未完成</b>;
                    //         break;
                    //       case "开启":
                    //         x = <b style="color:blue">已完成</b>;
                    //         break;
                    //       default:
                    //         x = <b>其他</b>;
                    //     }
                    //     h('a',[

                    //     ],11+x)
                    //   },
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'span',
                                {
                                    props: {}
                                },
                                params.row.Content
                            ),
                            h(
                                'a',
                                {
                                    props: {

                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({name: 'GameHallManagement_id'});
                                        }
                                    }
                                },
                                this.routerParams
                            )
                        ]);
                    }
                },
                {
                    title: '操作人员',
                    key: 'Display'
                }
            ],
            search_data: [
                {
                    Id: null,
                    Time: '/Date(1515361165363)/',
                    Display: 'atkk88999',
                    Content: '开启'
                },
                {
                    Id: null,
                    Time: '/Date(1515361165363)/',
                    Display: 'atkk88999',
                    Content: '关闭'
                },
                {
                    Id: null,
                    Time: '/Date(1515361165363)/',
                    Display: 'atkk88999',
                    Content: '关闭'
                }
            ]
        };
    },
    created () {
    // alert(this.$route.params.id)
    }
};
</script>
<style scoped lang='less'>
.search_button {
  margin-bottom: 10px;
}
</style>
