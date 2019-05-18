<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>列表</span>
        </h1>
      </div>
      <div class="page-con1" style="margin-bottom:10px">
        <Button type="primary" @click="$router.push({name:'PaymentClassCreate'})">创建支付组</Button>
      </div>
      <div class="page-con1">
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
    // name: "PaymentClass",
    components: {
      PaymentListData
    },
    data() {
      return {
        SPaymentListData: [],
        params:{},
        table: {
          TableColumn: [
            {
              title: "支付类名",
              key: "className",
            },
            {
              title: "设备",
              key: "devices",
            },
            {
              title: "支付备注",
              key: "classRemarks",
              render: (h, params) => {
                return h('span',params.row.classRemarks ? params.row.classRemarks : '无');
              }
            },
            {
              title: "创建人",
              key: "createUser",
              render: (h, params) => {
                return h("b", {}, params.row.createUser ? params.row.createUser : '未知');
              }
            },
            {
              title: "日期",
              key: "createTime",
              minWidth: 200,
              render: (h, params) => {
                return h('span',this.$moment.unix(params.row.createTime - 0).format("LLL"));
              }
            },
            {
              title: "状态",
              key: "classStatus",
              render: (h, params) => {
                let props = {
                  type: params.row.classStatus == "yes" ? "success" : "error",
                  size: "small"
                };
                return h(
                  "Button", {
                    props: props,
                    on:{
                      click: () => {
                        this.params = params
                        this.sequence(params.row.classStatus, "")
                      }
                    }
                  },
                  params.row.classStatus == "yes" ? "开启" : "关闭"
                );
              }
            },
            {
              title: "排序",
              // minWidth: 210,
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
                        click:() => {
                          this.params = params
                          this.sequence("", "up")
                        }
                      }
                    }, [
                      h(
                        "Icon", {
                          props: {
                            type: "ios-arrow-up"
                          },
                          style: {
                            marginRight: "5px"
                          }
                        }
                      ),
                      h(
                        "span", {}, "升序"
                      )
                    ]
                  ),
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
                          this.params = params
                          this.sequence("", "down")
                        }
                      }
                    }, [
                      h(
                        "Icon", {
                          props: {
                            type: "ios-arrow-down"
                          },
                          style: {
                            marginRight: "5px"
                          }
                        }
                      ),
                      h(
                        "span", {}, "降序"
                      )
                    ]
                  )
                ])
              }
            },
            {
              title: "操作",
              key: "",
              width: 180,
              render: (h, params) => {
                return h("div", [
                  h(
                    "Button", {
                      props: {
                        // type: "success",
                        size: 'small'
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            name: "PaymentClassDetails",
                            query: {
                              paymentClassId: params.row.id,
                            }
                          });
                        }
                      }
                    },
                    "详情"
                  ),
                  h(
                    "Button", {
                      props: {
                        // type: "info"
                        size: 'small'
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            name: "PaymentClassCreate",
                            query: {
                              paymentClassId: params.row.id,
                              isVerify: true
                            }
                          });
                        }
                      }
                    },
                    "编辑"
                  ),
                  h(
                    "Button", {
                      props: {
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.$Modal.confirm({
                            content: "确认删除？",
                            loading: true,
                            onOk: () => {
                              this.$root.loading()
                              this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuShanChu, {
                                  paymentClassId: params.row.id
                                })
                                .then(
                                  res => {
                                    this.$Spin.hide();
                                    this.$Modal.remove();
                                    this.$root.modal("success", "", "支付账户删除成功！")
                                    this.table.TableData.data.splice(
                                      params.index,
                                      1
                                    );
                                    this.table.TableData.total--
                                  },
                                  res => {
                                    this.$Spin.hide();
                                    setTimeout(() => {
                                      this.$Modal.remove();
                                    }, 2000);
                                  }
                                );
                            }
                          });
                        }
                      }
                    },
                    "删除"
                  )
                ]);
              }
            },
            //   {
            //     type: "expand",
            //     title: "...",
            //     width: 80,
            //     render: (h, params) => {
            //       return h(TableMore, {
            //         props: {
            //           row: params.row
            //         }
            //       });
            //     }
            //   }
          ],
          TableData: {},
          loading: true,
          align: "center",
          Refresh:0,
          posturl: this.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuLieBiao,
          dataform: {}
        }
      };
    },
    beforeRouteEnter: (to, from, next) => {
      next(vm => {});
    },
    mounted() {
      this.$nextTick(() => {
        //   let data = {
        //     adminId: this.$root.adminuserinfo.adminId
        //   };
        //   this.$root.ZaiXianZhiFuLieBiao(data);
      });
    },
    methods: {
      //排序和修改状态
      sequence(status, sequence) {
        if (status) {
          status = status === "yes" ? "no" : "yes"
        }
        this.$root
          .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_PaymentClass_Status, {
            paymentClassId: this.params.row.id,
            updateUser: this.$root.adminuserinfo.adminUserName,
            sequence: sequence,
            classStatus: status,
          })
          .then(res => {
            this.$root.modal("success" , "" , res.data.data)
            this.table.Refresh++
          })
      },
    }
  };
</script>

<style>

</style>