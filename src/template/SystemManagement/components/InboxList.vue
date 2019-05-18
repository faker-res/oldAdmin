<template>
  <div>
    <div class="M_con">
      <div class="c_search_top">
        <!-- <i-form ref="searchform" :model="searchform" inline>
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
        </i-form> -->
      </div>
      <InboxDataTable v-on:listenOnSelect="xz" :table='table'></InboxDataTable>
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
            发件时间：{{$moment.unix(YouJianXiangQing.send_time-0).format("llll")}} 发件人:{{YouJianXiangQing.send_username}}
            收件人：{{YouJianXiangQing.to_username}}
          </small>
        </p>
      </div>
      <div slot="footer">
        <!-- <Button type="error" style="float:left" size="large">删除</Button> -->
        <!-- <Button type="primary" size="large">再寄一次</Button> -->
        <Button size="large" @click="YouJianDo = false">关闭</Button>
        <Button size="large" @click="replyBox = true">回复</Button>
      </div>
    </Modal>
    <Modal class-name="vertical-center-modal" v-model="replyBox" width="800" @on-ok="replySend" @on-cancel="replyCancel">
      <div class="blockquote scroll-bar-y" style="height:250px;">
        <ol>
          <li><b>Re :</b> {{YouJianXiangQing.send_username}}</li>
          <li><b>来信内容 :</b> {{YouJianXiangQing.content}}</li>
          <li><b>回复 :</b>
            <i-input v-model="replyContent" type="textarea" :rows="6"></i-input>
          </li>
        </ol>
      </div>
    </Modal>
  </div>
</template>

<script>
  import InboxDataTable from "@/template/my-components/iview-table/table";
  export default {
    name: "SiteMail",
    components: {
      InboxDataTable
    },
    data() {
      return {
        YouJianDo: false,
        replyBox: false,
        replyContent: "",
        xuanzele: true,
        searchform: {
          title: "",
          to_username: "",
          send_username: ""
        },
        YouJianXiangQing: {},
        loading: true,
        table: {
          //数据部分开始
          TableColumn: [
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
              render: (h, params) => {
                return h('span',params.row.send_username);
              }
            },
            {
              title: "收件人",
              key: "to_username",
              render: (h, params) => {
                return h('span',params.row.to_username);
              }
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
                  "Tag", {
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
              render: (h, params) => {
                return h("div", [
                  h(
                    "Button", {
                      props: {
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.replyBox = true;
                          this.replyContent = ""
                          this.YouJianXiangQing = JSON.parse(
                            JSON.stringify(params.row)
                          );
                        }
                      }
                    },
                    "回复"
                  ),
                  h(
                    "Button", {
                      props: {
                        size: "small"
                      },
                      on: {
                        click: () => {
                          this.YouJianDo = true;
                          this.YouJianXiangQing = JSON.parse(
                            JSON.stringify(params.row)
                          );
                        }
                      }
                    },
                    "详情"
                  )
                ]);
              }
            }
          ],
          TableData: [],
          loading: true,
          align: "center",
          posturl: this.$root.HTTP_L.HTTP_ShouJianXiang,
          dataform: {
            siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
          },
          Refresh: 0,
          postType: "post"
        }
      };
    },
    methods: {
      siteChange(re){
        this.searchform.siteId = re.SiteId;
        if(re.SiteId !== this.table.dataform.siteId){
          this.table.dataform = {
              siteId: re.SiteId
          }
        }
      },
      xz(x) {
        x.length ? (this.xuanzele = false) : (this.xuanzele = true);
        this.$refs.table_ref;
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
      },
      replySend() {
        let siteId = this.searchform.siteId? this.searchform.siteId: JSON.parse(localStorage.AllSiteNameList)[0].id;
        this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_SiteMail_Reply, {
            siteId: siteId,
            replyId: this.YouJianXiangQing.id,
            content: this.replyContent
          })
          .then(res => {
            if (res.data.code === 200) {
              this.replyContent = ""
              this.$Modal.success({
                title: "提示",
                content: res.data.data
              });
            }
          })
          .catch(res => {
            this.replyBox = true
          });
      },
      replyCancel() {
        this.replyContent = ""
      }
    }
  };
</script>