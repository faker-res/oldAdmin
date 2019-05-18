
<template>
    <div>
        <Row>
            <Row type="flex" justify="center" align="middle" class="advanced-router">
                <Table style="width: 100%;" border :columns="columns1" :data="data1"></Table>
            </Row>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'argument-page',
    data () {
        return {
            columns1: [
                {
                    title: '日期',
                    key: 'RiQi'
                },
                {
                    title: '总代理（人）',
                    key: 'ZongDaiLi'
                },
                {
                    title: '代理（人）',
                    key: 'DaiLi'
                },
                {
                    title: '代理（人）',
                    key: 'DaiLi'
                },
                {
                    title: '代理（人）',
                    key: 'DaiLi'
                },
                {
                    title: '代理（人）',
                    key: 'DaiLi'
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ]
        };
    }
};
</script>
