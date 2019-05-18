<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>列表</span>
        </h1>
      </div>
      <div class="page-con1">
        <i-col class="c_search_top" span="24">
          <Card dis-hover>
            <Form ref="CreatWebSiteForm" :model="CreatWebSiteForm" inline>
              <FormItem label="站点名称">
                <Input placeholder="请输入站点名称" v-model="CreatWebSiteForm.siteName" style="width:130px" />
              </FormItem>
              <FormItem label="站点代码">
                <Input placeholder="请输入站点代码" v-model="CreatWebSiteForm.siteCode" style="width:130px" />
              </FormItem>
              <FormItem label="每页显示">
                <Select v-model="CreatWebSiteForm.limit" @on-change="pageChange" style="width:80px" placeholder="每页条数">
                  <Option value="5">5</Option>
                  <Option value="10">10</Option>
                  <Option value="20">20</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="SearchSubmit">查询</Button>
                <Button type="warning" @click="SearchRest">重置</Button>
              </FormItem>
            </Form> 
          </Card>
        </i-col>
      </div>
      <div class="page-con1">
        <div style="margin-bottom:10px;">
          <Button type="primary" @click="$router.push({name:'WebSiteCreate'})">新建站点</Button>
        </div>
        <PaymentListData :table="table"></PaymentListData>
      </div>
    </div>
  </div>
</template>
<script>
import PaymentListData from "@/template/my-components/iview-table/table";
const TableMore = {
  template: `
    <div class='more_data' style="text-align:left">
    <Row>
        <Col span="4"><b>id</b>:{{row.id}}</Col>
        <Col span="4"><b>站点ID</b>:{{row.siteId}}</Col>
        <Col span="4"><b>站名</b>:{{row.siteName}}</Col>
        <Col span="4"><b>姓名</b>:{{row.name}}</Col>
        <Col span="4"><b>代理账户</b>:{{row.queryName}}</Col>
        <Col span="4"><b>版本号</b>:{{row.version}}</Col>
    </Row>
    <Row>
        <Col span="4"><b>支付链接</b>:{{row.gateway_url}}</Col>
        <Col span="4"><b>支付商户号</b>:{{row.businessNo}}</Col>
        <Col span="4"><b>商户ID</b>:{{row.businessId}}</Col>
        <Col span="4"><b>商户KEY</b>:{{row.businessKEY}}</Col>
        <Col span="4"><b>charset</b>:{{row.charset}}</Col>
        <Col span="4"><b>链接</b>:{{row.backNotifyUrl}}</Col>
    </Row>
    <Row>
        <Col span="4"><b>代理层级id</b>:{{row.pageNotifyUrl}}</Col>
        <Col span="4"><b>支付类型</b>:{{row.payType}}</Col>
        <Col span="4"><b>支付名称</b>:{{row.payName}}</Col>
        <Col span="4"><b>支付上限</b>:{{row.maxAmount}}</Col>
        <Col span="4"><b>支付下限</b>:{{row.minAmount}}</Col>
        <Col span="4"><b>银行卡号</b>:{{row.bankCode}}</Col>        
    </Row>
    <Row>
        <Col span="4"><b>类ID</b>:{{row.classId}}</Col>
        <Col span="4"><b>类名</b>:{{row.className}}</Col>
        <Col span="4"><b>登陆域名</b>:{{row.platform}}</Col>
        <Col span="4"><b>状态</b>:{{row.status=='yes'?'开启':'关闭'}}</Col>
        <Col span="4"><b>创建人</b>:{{row.createUser}}</Col>
        <Col span="4"><b>创建时间</b>:{{row.createTime}}</Col>        
    </row>
       <Row>
        <Col span="4"><b>索引</b>:{{row._index}}</Col>
        <Col span="4"><b>_rowKey</b>:{{row._rowKey}}</Col> 
    </Row>
    </div>
    `,
  props: {
    row: Object
  }
};
export default {
  components: { PaymentListData },
  data() {
    return {
      SPaymentListData: [],
      CreatWebSiteForm: {
        siteCode: "",
        siteName: "",
        limit: "10"
      },
      table: {
        TableColumn: [
          {
            title: "站点名称",
            key: "siteName",
          },
          {
            title: "站点代码",
            key: "siteCode",
          },
          {
            title: "创建人",
            key: "createUserName",
          },
          {
            title: "创建日期",
            key: "created_at",
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at - 0).format("LLL"));
            }
          },
          {
            title: "更新人",
            key: "updateUserName",
            width: 116,
            render: (h,params) => {
              return h('span',params.row.updateUserName||'无');
            }
          },
          {
            title: "操作",
            key: "",
            width: 180,
            render: (h, params) => {
              let that = this;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: { marginRight: "5px" },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "WebSiteDetails",
                          query: {
                            id: params.row.id
                          }
                        });
                      }
                    }
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: { marginRight: "5px" },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "WebSiteCreate",
                          query: {
                            id: params.row.id,
                            isVerify: true
                          }
                        });
                      }
                    }
                  },
                  "编辑"
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_WebsiteList,
        dataform: {
          isRules: "select",
          limit: "10"
        }
      }
    };
  },
  methods: {
    pageChange() {
      this.SearchSubmit();
    },
    SearchRest() {
      this.CreatWebSiteForm = {
        siteCode: "",
        siteName: "",
        limit: "10"
      };
      this.table.dataform = this.CreatWebSiteForm;
    },
    SearchSubmit() {
      var postData = {};
      for (let key in this.CreatWebSiteForm) {
        postData[key] = this.CreatWebSiteForm[key];
      }

      for (let key in postData) {
        if (typeof postData[key] === "string" && postData[key] === "") {
          delete postData[key];
        }
      }
      if (Object.keys(postData).length != 0) {
        this.table.dataform = JSON.parse(JSON.stringify(postData));
      }
    } 
  }
};
</script>
