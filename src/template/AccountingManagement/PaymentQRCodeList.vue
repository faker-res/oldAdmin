<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>列表</span>
        </h1>
      </div>
      <div class="page-con1" style="margin-bottom:10px;">
        <Button type="primary" @click="$router.push({name:'PaymentQRCodeCreate'})">新增二维码</Button>
      </div>
      <div class="page-con1">
        <i-col class="c_search_top" span="24">
          <Card dis-hover>
            <i-form :model="search" inline>
              <FormItem label="站点">
                <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
              </FormItem>
              <FormItem label="等级">
                <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMember" @listenLevelChange="levelChange"></LevelSelect>
              </FormItem>
              <FormItem label="支付类型">
                <PayClassSelect ref="PayClassSelect" @listenOnChange="mechangeZhiFuFenZu" :PayClassSelectData="PayClassSelectData" />
              </FormItem>
              <FormItem label="客户端">
                <Select v-model="search.devices" style="width:100px">
                  <Option value="all">所有</Option>
                  <Option value="h5">html5</Option>
                  <Option value="ios">iOS客户端</Option>
                  <Option value="android">安卓客户端</Option>
                  <Option value="pc">网页</Option>
                </Select>
              </FormItem>
              <FormItem label="每页记录">
                <Select v-model="search.limit" style="width:80px">
                  <Option value="10" label="10">10</Option>
                  <Option value="25" label="25">25</Option>
                  <Option value="50" label="50">50</Option>
                  <Option value="80" label="80">80</Option>
                </Select>
              </FormItem>
              <FormItem class="form-group">
                <Button @click="Search" type="primary">查询</Button>
                <Button @click="SearchRest" type="warning">重置</Button>
              </FormItem>
            </i-form>
          </Card>
        </i-col>
      </div>
      <i-col class="c_search_result" span="24">
        <div class="tabs">
          <div class="tabs-nav-container">
            <div class="tabs-nav-wrap">
              <div class="tabs-tab" :class="{active:search.status === 'yes'}" @click="toggleStatus('yes')">启用</div>
              <div class="tabs-tab" :class="{active:search.status === 'no'}" @click="toggleStatus('no')">停用</div>
            </div>
          </div>
        </div>
        <div class="page-con1" style="margin: 10px 0;">
          <MyTable :table="table"></MyTable>
        </div>
      </i-col>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  name: "PaymentQRCodeList",
  mixins: [mixins],
  data() {
    return {
      search: {
        classId: null,
        siteId: "",
        limit: "10",
        status: "yes",
        devices: "all",
        levelId: ""
      },
      table: {
        TableColumn: [
          {
            title: "支付类型",
            key: "className",
            minWidth: 120
          },
          {
            title: "支付名称",
            minWidth: 100,
            key: "payName"
          },
          {
            title: "二维码图片",
            minWidth: 100,
            key: "qr_code",
            render: (h, params) => {
              let path = this.filterStaticPath(params.row.siteId);
              return h("img", {
                attrs: {
                  src: path + params.row.qr_code,
                  width: "50",
                  height: "auto"
                }
              });
            }
          },
          {
            title: "最小支付金额",
            key: "min_amount"
            // minWidth: 80
          },
          {
            title: "最大支付金额",
            key: "max_amount"
            // minWidth: 80,
          },
          {
            title: "等级",
            key: "levelId",
            minWidth: 80,
            render: (h, params) => {
              let text = [];
              params.row.levelId.split(',').forEach(pa=>{
                this.$refs.LevelSelect.levelList.forEach(le=>{
                  if(pa*1 == le.levelLabel*1){
                    text.push(le.levelAlias||le.levelName);
                  }
                })
              })
              return h('span',text.join(','));
            }
          },
          {
            title: "客户端",
            minWidth: 100,
            key: "devices",
            render: (h, params) => {
              let devices = "";
              params.row.devices.split(",").forEach(item => {
                switch (item) {
                  case "pc":
                    devices = devices !== "" ? devices + "," + "网页" : "网页";
                    break;
                  case "h5":
                    devices =
                      devices !== "" ? devices + "," + "html5" : "html5";
                    break;
                  case "ios":
                    devices =
                      devices !== ""
                        ? devices + "," + "iOS客户端"
                        : "iOS客户端";
                    break;
                  case "android":
                    devices =
                      devices !== ""
                        ? devices + "," + "安卓客户端"
                        : "安卓客户端";
                    break;
                  default:
                    devices = devices !== "" ? devices + "," + "所有" : "所有";
                }
              });
              return h('span',devices);
            }
          },
          {
            title: "排序",
            // minWidth: 100,
            key: "sequence"
          },
          {
            title: "创建时间",
            key: "created_at",
            minWidth: 160,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at - 0).format("LLL"));
            }
          },
          {
            title: "创建人",
            key: "created_user",
            minWidth: 80,
            render: (h, params) => {
              return h('span',params.row.created_user ? params.row.created_user : "无");
            }
          },
          {
            title: "备注",
            key: "remarks",
            render: (h, params) => {
              return h('span',params.row.remarks ? params.row.remarks : "无");
            }
          },
          {
            title: "操作",
            key: "",
            minWidth: 150,
            render: (h, params) => {
              let props = {
                size: "small"
              };
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        let status = params.row.status === "yes" ? "no" : "yes";
                        this.$root
                          .HTTP_ALLLINKPOST(
                            this.$root.HTTP_L.HTTP_Status_QR_code,
                            {
                              id: params.row.id,
                              siteId: params.row.siteId,
                              status: status
                            }
                          )
                          .then(res => {
                            this.$root.modal("success", "", res.data.data);
                            this.table.TableData.data.splice(params.index, 1);
                            this.table.TableData.total--;
                          });
                      }
                    }
                  },
                  params.row.status === "yes" ? "停用" : "启用"
                ),
                h(
                  "Button",
                  {
                    props: props,
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "PaymentQRCodeCreate",
                          query: {
                            QRCodeId: params.row.id,
                            siteId: params.row.siteId,
                            isVerify: true
                          }
                        });
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: props,
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "提示",
                          content: "是否删除",
                          onOk: () => {
                            this.$root.loading();
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L.HTTP_Delete_QR_code,
                                {
                                  QRCodeId: params.row.id,
                                  siteId: params.row.siteId
                                }
                              )
                              .then(
                                res => {
                                  this.$Spin.hide();
                                  this.$root.modal(
                                    "success",
                                    "",
                                    res.data.data
                                  );
                                  this.table.TableData.data.splice(
                                    params.index,
                                    1
                                  );
                                  this.table.TableData.total--;
                                },
                                res => {
                                  this.$Spin.hide();
                                }
                              );
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
        posturl: this.$root.HTTP_L.HTTP_List_QR_code,
        Refresh: 0,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          limit: "10",
          status: "yes"
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.PayClassSelect.InitData();
    });
  },
  methods: {
    filterStaticPath(siteId) {
      let target = this.$root.staticsPathArr.filter(
        item => item.siteId === siteId
      )[0];
      return target.path;
    },
    mechangeZhiFuFenZu(re) {
      //支付分组选择
      this.search.classId = re.id;
    },
    siteChange(re) {
      if (re) {
        this.search.siteId = re.SiteId;
        this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberLevelModel");
      }
    },
    Search() {
      let params = {};
      Object.assign(params, params, this.search);
      for (let key in params) {
        if (params[key] == null || params[key] == "") {
          delete params[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(params));
    },
    SearchRest() {
      this.$refs.PayClassSelect.DATAA.SiteDataD.id = 0;
      this.search = {
        siteId: this.defaultSiteId,
        classId: null,
        limit: "10",
        status: this.search.status,
        devices: "all",
        levelId: ""
      };
      this.$refs.SiteNameSelect.InitData();
      this.$refs.LevelSelect.setDefaultLevel("");
      this.Search();
    },
    toggleStatus(status) {
      //启用停用
      this.search.status = status;
      this.Search();
    }
  }
};
</script>
<style lang="less" scoped>
.tabs {
  height: 32px;
  padding-left: 0;
  margin-bottom: 16px;
  margin: 0;
  border-bottom: 1px solid #dddee1;
  // float: left;
  list-style: none;
  box-sizing: border-box;
  position: relative;
  transition: transform 0.5s ease-in-out;

  .tabs-nav-container {
    margin-bottom: -1px;
    line-height: 1;
    font-size: 14px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    zoom: 1;

    .tabs-nav-wrap {
      position: relative;

      .tabs-tab {
        margin: 0;
        margin-right: 4px;
        height: 31px;
        padding: 5px 16px 4px;
        border: 1px solid #dddee1;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        transition: all 0.3s ease-in-out;
        background: #f8f8f9;
        display: inline-block;
        height: 100%;
        padding: 8px 16px;
        box-sizing: border-box;
        cursor: pointer;
        text-decoration: none;
        position: relative;
      }

      .active {
        height: 32px;
        padding-bottom: 5px;
        background: #fff;
        transform: translateZ(0);
        border-color: #dddee1;
        color: #2d8cf0;
      }
    }
  }
}
</style>