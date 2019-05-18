<template>
  <div class="content-main GameHallManagement-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}} </h1>
      </div>
      <div class="page-con1">
        <Table style="width:100%" :data="GameGulp" :columns="Col"></Table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            GameGulp: [],
            Col: [
                {
                    title: '娱乐城',
                    key: 'GameHallText',
                    sortable: true,
                    render: (h, params) => {
                        //   debugger
                        return h(
                            'a',
                            {
                                props: {
                                    //   type: fav === 0 ? "ios-star-outline" : "ios-star"
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'GameHallManagement_id',
                                            params: {
                                                id: params.row.GameHallText
                                            }
                                        });
                                    }
                                }
                            },
                            params.row.GameHallText
                        );
                    }
                },
                {
                    title: '状态',
                    key: 'IsEnterable',
                    sortable: true,
                    render: (h, params) => {
                        //   debugger
                        return h(
                            'Button',
                            {
                                props: {
                                    type: params.row.IsEnterable ? 'primary' : 'error',
                                    size: 'small'
                                },
                                on: {
                                    //   click: () => {
                                    //     alert('a')
                                    //   }
                                }
                            },
                            params.row.IsEnterable ? '开启' : '关闭'
                        );
                    }
                },
                {
                    title: '转帐额度确认未结案笔数',
                    key: 'GameHallId',
                    sortable: true
                },
                {
                    title: '转帐额度确认未结案金额',
                    key: 'GameHallSort',
                    sortable: true
                }
            ]
        };
    },
    created () {
        this.$http.get('./src/data/GetGameHallList.json').then(response => {
            this.GameGulp = response.data;
        });
    }
};
</script>

<style lang="less">
.GameHallManagement-main {
  table {
    tr {
      th {
        cursor: pointer;
      }
    }
  }
}
</style>
