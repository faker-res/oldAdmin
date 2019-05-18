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
              <Form :model="DataSearch" inline>
                <FormItem class="form-group" label="日期">
                  <DatePicker type="daterange" confirm v-model="nowTime" format="yyyy-MM-dd" placeholder="请选择日期" style="width:210px"></DatePicker>
                </FormItem>
                <FormItem class="form-group">
                  <Button @click="Search" type="primary">查询</Button>
                </FormItem>
              </Form>
            </Card>
          </i-col>
          <i-col class="c_search_result" span="24">
            <div class="serach">
              <div class="have_con">
                <div class="data_sj">
                  <div style="margin:10px 0; overflow: hidden">
                    <AdminlistTable :table="table"></AdminlistTable>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminlistTable from "@/template/my-components/iview-table/table";
export default {
  name:"NoPrizesList",
  components: {
    AdminlistTable
  },
  data() {
    return {
      nowTime: [],
      DataSearch: {
        st: null,
        et: null
      },
      table: {
        TableColumn: [
          {
            title: "日期",
            key: "date",
            render: (h, params) => {
              return h('span',"20"+params.row.date);
            }
          },
          {
            title: "期数",
            key: "issue",
          },
          {
            title: "彩种",
            key: "lotteryName",
          },
          {
            title: "操作",
            key: "lotteryName",
            render: (h, params) => {
              return h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "warning"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "撤销注单",
                        content: "请确认是否撤销注单",
                        loading: true,
                        onOk: () => {
                          this.$root
                            .HTTP_ALLLINKPOST(
                              this.$root.HTTP_L.HTTP_Update_CancellationList,
                              {
                                lid: params.row.lotteryId,
                                issue: params.row.issue,
                                date: params.row.date
                              }
                            )
                            .then(res => {
                              this.$Modal.remove();
                              this.$Modal.success({
                                title: "撤销注单",
                                content: "撤销注单成功！"
                              });
                            })
                            .catch(res => {
                              this.$Modal.remove();
                              this.$Modal.error({
                                title: "撤销注单",
                                content: "撤销注单失败！"
                              });
                            });
                        }
                      });
                    }
                  }
                },
                "撤单"
              );
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_Get_CancellationList,
        Refresh: 0,
        dataform: {
          isRules: "select",
          st: () => {
            return this.$moment(new Date()).format("L");
          },
          et: () => {
            return this.$moment(new Date()).format("L");
          }
        }
      }
    };
  },
  methods: {
    Search() {
      this.DataSearch.st = this.$moment(this.nowTime[0]).format("L");
      this.DataSearch.et = this.$moment(this.nowTime[1]).format("L");
      for (let key in this.DataSearch) {
        if (this.DataSearch[key] == null || this.DataSearch[key] == "") {
          delete this.DataSearch[key];
        }
      }
      if (Object.keys(this.DataSearch).length > 0) {
        if (this.nowTime[0] && this.nowTime[1]) {
          this.table.dataform = JSON.parse(JSON.stringify(this.DataSearch));
        } else {
          this.$Modal.info({
            title: "提示",
            content: "请选择日期再进行搜索"
          });
        }
      }
    },
    recallOrder() {
      var that = this;
      function mom(keye) {
        return that.$moment(keye).format("L");
      }
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_Insert_OpenLotteryNumber,
          this.OpenLotteryForm
        )
        .then(res => {
          this.$Modal.success({
            title: "提示",
            content: "开奖成功!"
          });
          this.showOpenLotteryModal = false;
          this.table.dataform = { isRules: "select", lid: 1 };
        })
        .catch(res => {
          this.$Modal.error({
            title: "提示",
            content: "开奖失败!"
          });
        });
    }
  }
};
</script>
