<template>
  <div class="content-main CommissionSettingCreate-main">
    <div class="layout" id="ZheGe">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span></span>
        </h1>
      </div>
      <div class="page-con1">
        <Card dis-hover style="background-color: #ebf7ff;margin-bottom:10px;">
          <div class="clearfix" style="height:32px;line-height:32px;">
            <div class="fl_l" style="font-size: 16px;margin-right:10px;">站点</div>
            <SiteNameSelect class="fl_l" ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </div>
        </Card>
        <Button type="primary" @click="HeiMingDaiTianJiaXiuGai('add')">添加黑名单</Button>
      </div>
      <div class="page-con1">
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <div style="margin: 10px 0;">
              <IpLimitDataTable :table="table"></IpLimitDataTable>
            </div>
          </i-col>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal" v-model="TianJiaHeiMingDan" :closable="false" width="400" :loading="$root.btnLoading">
      <p slot="header" style="color:#f60;font-size:18px;">
        <span>添加/修改黑名单</span>
      </p>
      <div style="font-size:15px">
        <i-form ref="TianJiaHeiMingDan" :model="HeiMingDanXiuGai" :rules="HeiMingDanXiuGaiRules" :label-width="90">
          <!-- <FormItem label="站点" prop="site_id">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem> -->
          <FormItem label="用户名" prop="user_name">
            <Input v-model="HeiMingDanXiuGai.user_name" style="width:250px" />
          </FormItem>
          <FormItem label="IP" prop="ip">
            <i-input type="text" style="width:250px" v-model="HeiMingDanXiuGai.ip"></i-input>
          </FormItem>
          <FormItem label="类型" prop="expire_type">
            <Select v-model="HeiMingDanXiuGai.expire_type" style="width:250px">
              <!-- <Option value="hour">小时</Option> -->
              <Option value="day">天</Option>
              <Option value="forever">永久</Option>
            </Select>
          </FormItem>
          <FormItem label="过期时间" v-show="HeiMingDanXiuGai.expire_type !== 'forever'" prop="expire_time">
            <InputNumber :min="1" :step="1" v-model="HeiMingDanXiuGai.expire_time" style="width:250px"></InputNumber>
          </FormItem>
          <FormItem label="描述" prop="description">
            <Input v-model="HeiMingDanXiuGai.description" type="textarea" :rows="4" style="width:250px" />
          </FormItem>
        </i-form>
      </div>
      <div slot="footer">
        <Button size="large" type="primary" @click="QueDingXiuGai">确定</Button>
        <Button size="large" @click="HeiMingDaiTianJiaXiuGai('close')">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import IpLimitDataTable from "@/template/my-components/iview-table/table";
import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";
export default {
  components: { IpLimitDataTable, SiteNameSelect },
  name: "iPLimit",
  data() {
    return {
      TianJiaHeiMingDan: false,
      btnLoading: false,
      HeiMingDanXiuGai: {
        siteId: null,
        siteName: "",
        user_name: "",
        ip: "",
        description: "",
        expire_type: "day",
        expire_time: 1
      },
      SiteNameSelectData: {
        default: false,
        type: "单选",
        placeholder: "请选择站点",
        disabled: false,
        style: {
          width: "160px"
        }
      },
      AllCountry: false,
      search_d: "",
      search_c: "",
      GuoJiaShuJu: {},
      noneBlockedCountryDic: [],
      blockedCountryDicmodel: [],
      blockedCountryDic: [],
      whiteListSettings: [],
      whiteListSettingb: [],
      iplist: [],
      JieChu: true,
      kaixiu: false,
      HeiMingDanXiuGaiRules: {
        ip: [
          {
            required: true,
            trigger: "blur",
            message: "请输入正确的Ip",
            pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|\*$/
          }
        ],
        expire_type: [
          {
            required: true,
            trigger: "change",
            message: "请输入类型！"
          }
        ],
        expire_time: [
          {
            required: true,
            trigger: "blur",
            pattern: /^(0|[1-9][0-9]*)$/,
            message: "请输入一个整数！"
          }
        ]
      },
      table: {
        //数据部分开始

        TableColumn: [
          {
            title: "序号",
            key: "name",
            width: 80,
            align: "center",
            render: (h, params) => {
              var row = params.index + 1;
              return h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                row
              );
            }
          },
          {
            title: "站点",
            align: "center",
            key: "siteName",
            render: (h, params) => {
              return h('span',params.row.siteName || "无");
            }
          },
          {
            title: "账号",
            align: "center",
            key: "user_name",
            render: (h, params) => {
              return h('span',params.row.user_name || "无");
            }
          },
          {
            title: "ip",
            key: "age",
            align: "center",
            render: (h, params) => {
              var row = params.row.ip;
              var style = {
                "font-size": "14px"
              };
              return h(
                "b",
                {
                  props: {},
                  style: { color: "#000" }
                },
                row
              );
            }
          },
          {
            title: "描述",
            key: "description",
            align: "center",
            width: 250,
            render: (h, params) => {
              var row = params.row.description;
              if (row != null) {
                var style = {
                  "font-size": "13px",
                  cursor: "pointer"
                };
                return h("div", {}, [
                  h(
                    "Tooltip",
                    {
                      props: {
                        placement: "left"
                      },
                      style: {},
                      on: {
                        click: () => {}
                      }
                    },
                    [
                      h(
                        "span",
                        {
                          style: { color: "#2d8cf0", cursor: "pointer" }
                        },
                        row.length < 25 ? row : row.slice(0, 25) + "..."
                      ),
                      h(
                        "div",
                        {
                          slot: "content",
                          style: {
                            zIndex: 999,
                            whiteSpace: "normal"
                          }
                        },
                        row
                      )
                    ]
                  )
                ]);
              }
            }
          },
          {
            title: "过期时间",
            key: "expire",
            width: 180,
            align: "center",
            render: (h, params) => {
              let text = params.row.expire != 0
                ? this.$moment.unix(params.row.expire).format("LLL")
                : "无"
              return h('span',text);
            }
          },
          {
            title: "添加人",
            key: "name",
            align: "center",
            render: (h, params) => {
              var row = params.row.who;
              return h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                row
              );
            }
          },
          {
            title: "添加时间",
            key: "created_at",
            width: 180,
            align: "center",
            render: (h, params) => {
              let text = params.row.created_at != 0
                ? this.$moment.unix(params.row.created_at).format("LLL")
                : "无"
              return h('span',text);
            }
          },
          {
            title: "操作",
            key: "",
            width: 250,
            align: "center",
            render: (h, params) => {
              var that = this;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          content: "确认删除？",
                          loading: true,
                          onOk: () => {
                            this.$root.loading();
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L.HTTP_HeiMingDanShanChu,
                                { id: params.row.id, siteId: params.row.siteId}
                              )
                              .then(
                                res => {
                                  this.$Spin.hide();
                                  this.$Modal.remove();
                                  this.$Message.info("ip黑名单删除成功！");
                                  this.table.Refresh++;
                                  // this.table.TableData.data.splice(
                                  //   params.index,
                                  //   1
                                  // );
                                  // this.table.TableData.total--;
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
          }
        ],
        TableData: {},
        loading: true,
        align: "",
        posturl: this.$root.HTTP_L.HTTP_HeiMingDanLieBiao,
        Refresh: 0,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
        }
      }
    };
  },
  computed: {
    searchCountry: function() {
      var search = this.search_d.toLowerCase();
      if (search) {
        return this.noneBlockedCountryDic.filter(function(Value) {
          return Object.keys(Value).some(function(key) {
            return (
              String(Value[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.noneBlockedCountryDic;
    }
  },
  methods: {
    // getData(siteId){
    //   this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HeiMingDanLieBiao,{siteId:siteId})
    // },
    mechange(re) {
      // this.HeiMingDanXiuGai.site_id = re.SiteId ? re.SiteId : "";
      this.HeiMingDanXiuGai.siteId = re.SiteId;
      this.HeiMingDanXiuGai.siteName = re.SiteName;
      // this.getData(re.SiteId)
      this.table.dataform.siteId = re.SiteId;
    },
    HeiMingDaiTianJiaXiuGai(e) {
      if (e == "add") {
        // this.$refs.SiteNameSelect.InitData();
        this.SiteNameSelectData.disabled = false;
        this.$refs["TianJiaHeiMingDan"].resetFields();
        this.TianJiaHeiMingDan = true;
      } else {
        this.TianJiaHeiMingDan = false;
        this.HeiMingDanXiuGai.ip = "";
        this.HeiMingDanXiuGai.description = "";
        // this.HeiMingDanXiuGai.site_id = "";
        this.HeiMingDanXiuGai.uesr_name = "";
        this.HeiMingDanXiuGai.expire_type = "day";
        this.HeiMingDanXiuGai.expire_time = 1;
        // this.$refs.SiteNameSelect.InitData();
        delete this.HeiMingDanXiuGai.id;
      }
    },
    QueDingXiuGai() {
      this.$refs.TianJiaHeiMingDan.validate(valid => {
        if (this.HeiMingDanXiuGai.expire_type === "forever") {
          this.HeiMingDanXiuGai.expire_time = 0;
        }
        if (valid) {
          if (this.HeiMingDanXiuGai.hasOwnProperty("id")) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_HeiMingDanGengXin,
                this.HeiMingDanXiuGai
              )
              .then(res => {
                this.$Message.success("黑名单修改成功！");
                delete this.HeiMingDanXiuGai.id;
                this.TianJiaHeiMingDan = false;
                this.table.Refresh++;
              });
          } else {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_HeiMingDanTianJia,
                this.HeiMingDanXiuGai
              )
              .then(res => {
                this.$Message.success("黑名单添加成功！");
                this.TianJiaHeiMingDan = false;
                this.table.Refresh++;
              });
          }
        }
      });
    }
  }
};
</script>
            
<style lang="less">
.iview-admin-draggable-list {
  height: 100%;
}
.iview-admin-draggable-list li,
.iview-admin-draggable-list .li {
  padding: 9px;
  border: 1px solid #e7ebee;
  border-radius: 3px;
  margin-bottom: 5px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  width: 98%;
}
.iview-admin-draggable-list .li:hover {
  color: #87b4ee;
  border-color: #87b4ee;
  transition: all 0.2s;
}
.iview-admin-draggable-delete {
  height: 100%;
  position: absolute;
  right: -8px;
  top: 0px;
  display: none;
}
.iview-admin-draggable-list li,
.iview-admin-draggable-list .li:hover .iview-admin-draggable-delete {
  display: block;
}
// .iview-admin-draggable-list li,.iview-admin-draggable-list .li.active{
//     background:#87b4ee;  border-color: #87b4ee;
//     color:#fff;
// }
.placeholder-style {
  display: block !important;
  color: transparent;
  border-style: dashed !important;
}
.delte-item-animation {
  opacity: 0;
  transition: all 0.2s;
}
.iview-admin-draggable-list {
  overflow: auto;
}
.ip_list {
  li {
    line-height: 30px;
    font-weight: 800;
    list-style: disc;
    padding-left: 10px;
    margin-left: 20px;
  }
}
</style>
            