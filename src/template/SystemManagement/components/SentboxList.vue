<template>
  <div>
    <div class="M_head" style="min-height:60px">
      <!-- <div style="float:left;line-height:32px">
                <Button :disabled="xuanzele" @click="deletes">
                    <Icon type="trash-a"></Icon>
                </Button>
                <ButtonGroup>
                    <Button :disabled="xuanzele">标示为已读</Button>
                    <Button :disabled="xuanzele">标示为未读</Button>
                </ButtonGroup>
            </div> -->
      <div class="c_search_top">
        <i-form ref="searchform" :model="searchform" inline>
          <FormItem label="发件人" prop="send_username">
            <i-input type="text" style="width:150px" v-model="searchform.send_username" placeholder="输入发件人帐号">
            </i-input>
          </FormItem>
          <FormItem label="收件人" prop="to_username">
            <i-input type="text" style="width:150px" v-model="searchform.to_username" placeholder="输入收件人帐号">
            </i-input>
          </FormItem>
          <FormItem label="标题" prop="title">
            <i-input style="width:150px" v-model="searchform.title" placeholder="输入标题关键字">
            </i-input>
            <Button style="margin-left:15px" @click="SearchMail()" type="primary">
              <Icon type="search"></Icon>搜索</Button>
            <Button @click="ClearSearchMail()">清空</Button>
          </FormItem>
          <!-- <FormItem label="日期">
                        <DatePicker v-model="searchform.riqi" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
                    </FormItem> -->
          <!-- <span style="line-height:32px">
                        <Checkbox v-model="searchform.yidu">已读</Checkbox>
                        <Checkbox v-model="searchform.weidu">已读</Checkbox>
                    </span> -->
        </i-form>
      </div>
    </div>
    <div class="M_con">
      <InboxDataTable :table='table'></InboxDataTable>
    </div>
    <Modal class-name="vertical-center-modal" v-model="YouJianDo" width="800">
      <p slot="header" style="color:#f60;font-size:18px">
        <span>{{YouJianXiangQing.title}}</span>
      </p>
      <div style="font-size:15px">
        <p v-html="YouJianXiangQing.content"></p>
        <br>
        <p>
          <small>
            发件时间：{{$moment.unix(YouJianXiangQing.send_time-0).format("llll")}} 发件人:{{YouJianXiangQing.send_username}} 收件人：{{YouJianXiangQing.to_username}}
          </small>
        </p>
      </div>
      <div slot="footer">
        <!-- <Button type="error" style="float:left" size="large">删除</Button> -->
        <!-- <Button type="primary" size="large">再寄一次</Button> -->
        <Button size="large" @click="YouJianDo = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import InboxDataTable from "@/template/my-components/iview-table/table";

export default {
  components: { InboxDataTable },
  data() {
    return {
      xuanzele: true,
      YouJianDo: false,
      searchform: {
        title: "",
        to_username: "",
        send_username: ""
      },
      YouJianXiangQing: {},
      table: {
        //数据部分开始
        TableColumn: [
          {
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "标题",
            key: "title",
            width: 200,
            render: (h, params) => {
              let text = params.row.title.length > 15
                ? params.row.title.slice(0, 15) + "..."
                : params.row.title;
              return h('span',text);
            }
          },
          {
            title: "内容",
            key: "content",
            width: 350,
            render: (h, params) => {
              let text = params.row.content.length > 20
                ? params.row.content.slice(0, 20) + "..."
                : params.row.content;
              return h('span',text);
            }
          },
          {
            title: "发件人",
            key: "send_username",
          },
          {
            title: "收件人",
            key: "to_username",
          },
          {
            title: "发送时间",
            key: "send_time",
            width: 160,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.send_time - 0).format("LLL"));
            }
          },
          {
            title: "阅读状态",
            key: "status",
            render: (h, params) => {
              var color = params.row.status == "yes" ? "green" : "red";
              return h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.status == "yes" ? "已读" : "未读"
              );
            }
          },
          {
            title: "操作",
            key: "status",
            render: (h, params) => {
              var color = params.row.status == "yes" ? "error" : "success";
              var that = this;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: { marginLeft: "5px" },
                    on: {
                      click: () => {
                        // this.$router.push({
                        //   name: "AdminGroupDetails",
                        //   query: { Id: params.row.id }
                        // });
                        this.YouJianDo = true;
                        this.YouJianXiangQing = JSON.parse(
                          JSON.stringify(params.row)
                        );
                        // if(this.DataMemory.openDay.indexOf(',')>0){
                        //     this.DataMemory.openDay = this.DataMemory.openDay.split(',')
                        // }
                      }
                    }
                  },
                  "详情"
                )
                // h(
                //   "Button",
                //   {
                //     props: {
                //       size: "small"
                //     },
                //     style: { marginLeft: "5px" },
                //     on: {
                //       click: () => {
                //         this.$router.push({
                //           name: "ModifyAdminGroup",
                //           query: { Id: params.row.id }
                //         });
                //       }
                //     }
                //   },
                //   "修改"
                // ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       size: "small"
                //     },
                //     style: { marginLeft: "5px" },
                //     on: {
                //       click: () => {
                //         this.$Modal.confirm({
                //           content: "确认删除？",
                //           loading: true,
                //           onOk: () => {
                //             this.$root
                //               .HTTP_GuanLiYuanZuShanChu({ Id: params.row.id })
                //               .then(
                //                 res => {
                //                   this.$Modal.remove();
                //                   this.$Message.info("会员删除成功！");
                //                   this.table.TableData.data.splice(
                //                     params.index,
                //                     1
                //                   );
                //                   this.table.TableData.total--;
                //                 },
                //                 res => {
                //                   setTimeout(() => {
                //                     this.$Modal.remove();
                //                   }, 2000);
                //                 }
                //               );
                //           }
                //         });
                //       }
                //     }
                //   },
                //   "删除"
                // )
              ]);
            }
          }
        ],
        TableData: [],
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_ZhanNeiXinLieBiao,
        dataform: {
            siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
        },
        Refresh: 0,
        postType: "post"
      },
      loading: true
    };
  },
  methods: {
    siteChange(re){
        if(re.SiteId !== this.table.dataform.siteId){
          this.table.dataform = {
              siteId: re.SiteId
          }
        }
    },
    ClearSearchMail() {
      this.$refs.searchform.resetFields();
    },
    SearchMail() {
      let datase = {
        like: {}
      };
      for (let key in this.searchform) {
        if (this.searchform[key] != "") {
          datase.like[key] = this.searchform[key];
        }
      }
      if (Object.keys(datase.like).length > 0) {
        this.table.dataform = datase;
      } else {
        this.table.dataform = {};
      }
    }
  },
  watch: {}
};
</script>

<style>

</style>




