<template>
  <div class="content-main PortalSetting-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}  <span>列表</span> </h1>
            </div>
            <div class="page-con1">
                <i-table border ref='table' style="width:100%" :data="tableData2" :columns="tableColumns2" ></i-table>
            </div>
        </div>

         <Modal class-name="vertical-center-modal"  v-model="huiyaunzhuced" title="会员注册设定">
             <table style="width:100%;text-align:center" class="table table-bordered">
                        <thead>
                            <tr class="active">
                                <th>栏位</th>
                                <th >显示</th>
                                <th >必填</th>
                                <th class="text-center">
                                    <Tooltip content="是否不允许注册相同资料">
                                        <Tag color="blue">唯一</Tag>
                                    </Tooltip>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr>
                                
                                <th>姓名</th>
                                <td>
                                    <Icon type="checkmark"></Icon>
                                </td>
                                <td>
                                    <Icon type="close"></Icon>
                                </td>
                                <td>
                                    <Icon type="close"></Icon>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div slot="footer">
                        <Button type="primary" @click="huiyaunzhuced = false" size="large">关闭</Button>
                    </div>
         </Modal>
         <Modal class-name="vertical-center-modal"  v-model="dailizhuced" title="代理注册设定">
             <table style="width:100%;text-align:center" class="table table-bordered">
                        <thead>
                            <tr class="active">
                                <th>栏位</th>
                                <th >显示</th>
                                <th >必填</th>
                                <th class="text-center">
                                    <Tooltip content="是否不允许注册相同资料">
                                        <Tag color="blue">唯一</Tag>
                                    </Tooltip>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr>
                                
                                <th>姓名</th>
                                <td>
                                    <Icon type="checkmark"></Icon>
                                </td>
                                <td>
                                    <Icon type="close"></Icon>
                                </td>
                                <td>
                                    <Icon type="close"></Icon>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div slot="footer">
                        <Button type="primary" @click="dailizhuced = false" size="large">关闭</Button>
                    </div>
         </Modal>

  </div>
</template>
<script>
export default {
    data () {
        return {
            huiyaunzhuced: false,
            dailizhuced: false,
            tableData2: this.mockTableData2(),
            tableColumns2: this.getTable2Columns()

        };
    },
    methods: {
        mockTableData2 () {
            let data = [
                {
                    name: 'aaa',
                    paomadeng: `欢迎莅临王者威尼斯人，十八大电子平台，天天返水高达3.0%，
          无需流水即可提款，更有超多优惠等着您，让您感受无与伦比线上博彩乐趣；
          365天X24小时专业的客户服务，全新的充值方式，全新的服务理念！尽在王者威尼斯人！
赢家赢在起点, 选也要选对起点, 现在只要在王者威尼斯人成功注册游戏帐号, 并完成绑定银行帐户,
 无需充值立即送8元！无需流水要求, 最多可以提100元以上！！！'`,
                    huiyuanzhucesheding: 'getNum()',
                    dailizhicesheding: 'getNum()',
                    beizhu: '-'
                }
            ];
            return data;
        },
        getTable2Columns () {
            let that = this;
            const table2ColumnList = [
                {
                    title: '名称',
                    key: 'name',
                    width: 200,
                    render: (h, params) => {
                        const style = { cursor: 'pointer', color: '#2d8cf0' };
                        const row = params.row.name;
                        return h('div', [
                            h(
                                'a',
                                {
                                    style: style,
                                    props: {
                                        title: 'aaa'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'PortalSetting_id',
                                                params: {
                                                    id: row
                                                }
                                            });
                                        }
                                    }
                                },
                                row
                            )
                        ]);
                    }
                },
                {
                    title: '跑马灯',
                    key: 'paomadeng',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Poptip',
                                {
                                    style: { cursor: 'pointer', color: '#2d8cf0' },
                                    props: {
                                        trigger: 'hover',
                                        title: '提示标题',
                                        content: params.row.paomadeng,
                                        placement: 'top',
                                        width: '400',
                                        // transfer: true
                                        // placement:"bottom-start"
                                    }
                                },
                                params.row.paomadeng.substring(0, 10) + '...'
                            )
                        ]);
                    }
                },
                {
                    title: '会员注册设定',
                    key: 'huiyuanzhucesheding',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'a',
                                {
                                    props: {

                                    },
                                    on: {
                                        click: () => {
                                            this.huiyaunzhuced = true;
                                        }
                                    }
                                },
                                params.row.huiyuanzhucesheding
                            )
                        ]);
                    }
                },
                {
                    title: '代理注册设定',
                    key: 'dailizhicesheding',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'a',
                                {
                                    props: {

                                    },
                                    on: {
                                        click: () => {
                                            this.dailizhuced = true;
                                        }
                                    }
                                },
                                params.row.dailizhicesheding
                            )
                        ]);
                    }
                },
                {
                    title: '备注',
                    key: 'beizhu'
                }
            ];

            let data = table2ColumnList;
            return data;
        }
    }
};
</script>
