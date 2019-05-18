<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <i-col class="c_search_result" span="24">
          <div class="serach">
            <div class="have_con">
              <div class="data_sj">
                <div class="caozuo_btn">
                  <Button type="primary" @click="$router.push({name:'RoleCreate'})">新增角色</Button>
                </div>
                <div style="margin:10px 0;">
                  <MyTable v-on:listenOnSortTable="$root.TableDataSort($event,table.dataform)" :table="table"></MyTable>
                </div>
              </div>
            </div>
          </div>
        </i-col>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins";
export default {
  // name: "RolePermissionsList",
  mixins: [mixins],
  data() {
    return {
      table: {
        TableColumn: [
          {
            title: "ID",
            key: "id",
            width: 180
          },
          {
            title: "角色名称",
            key: "title",
            minWidth: 120
          },
          {
            title: "角色描述",
            key: "description",
            minWidth: 400
          },
          {
            title: "更新时间",
            key: "updated_at",
            minWidth: 150,
            render: (h, params) => {
              return h('span',this.$moment.unix(+params.row.updated_at).format("LLL"));
            }
          },
          {
            title: "操作",
            key: "",
            minWidth: 200,
            render: (h, params) => {
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
                        this.goRoleCrteate(params);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除",
                          content: "确认删除？",
                          loading: true,
                          onOk: () => {
                            this.$root.loading();
                            this.deleteRole(params);
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
        align: "center",
        postType: "get",
        posturl: this.$root.HTTP_L.HTTP_GetRoleList
      }
    };
  },
  methods: {
    goRoleCrteate(params) {
      this.$router.push({
        name: "RoleCreate",
        query: { id: params.row.id, isVerify: true }
      });
    },
    deleteRole(params) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_DeleteRole, {
          id: params.row.id
        })
        .then(
          res => {
            this.$Spin.hide();
            this.$Modal.remove();
            this.$Message.info("角色删除成功！");
            this.table.TableData.data.splice(params.index, 1);
            this.table.TableData.total--;
          },
          res => {
            this.$Spin.hide();
            setTimeout(() => {
              this.$Modal.remove();
            }, 2000);
          }
        );
    }
  }
};
</script>

<style>
</style>
