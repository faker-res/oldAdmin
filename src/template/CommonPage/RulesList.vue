<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1">
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <div class="serach">
              <div class="have_con">
                <div class="data_sj">
                  <div class="caozuo_btn">
                    <Button type="primary" @click="$router.push({name:'RuleCreate'})">新增权限</Button>
                  </div>
                  <div style="margin: 10px 0;">
                    <Table ref="dragable" :columns="columns" :data="data" highlight-row border></Table>
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
import Sortable from "sortablejs";
import TableMore from "./components/TableMore";
export default {
  components: {
    TableMore
  },
  data() {
    return {
      columns: [
        {
          type: "expand",
          title: "...",
          align: "center",
          width: 60,
          render: (h, params) => {
            if (params.row.children.length) {
              return h(TableMore, {
                props: {
                  row: params.row
                }
              });
            } else {
              const template = {
                template: `
                  <div style="text-indent:50px">暂无信息！</div>
                `
              };
              return h(template);
            }
          }
        },
        {
          title: "权限名称",
          key: "name",
          align: "center",
          minWidth: 400
        },
        {
          title: "操作",
          key: "oprate",
          align: "center",
          width: 300,
          render: (h, params) => {
            let that = this;
            const template = {
              props: ["params"],
              template: `
                <div>
                  <Button size="small" style="margin-Right:5px" @click="goPage(params)">编辑</Button>
                  <Button size="small" @click="goDelete(params)">删除</Button>
                </div>
              `,
              methods: {
                goPage(id) {
                  that.goRuleCreate(params);
                },
                goDelete(params) {
                  that.deleteRule(params);
                }
              }
            };
            return h(template, {
              props: {
                params: params
              }
            });
          }
        },
        {
          title: "排序",
          key: "drag",
          width: 100,
          align: "center",
          render: h => {
            const template = {
              template: `<Icon type="arrow-move" size="24"></Icon>`
            };
            return h(template);
          }
        }
      ],
      data: [],
      move: false
    };
  },
  created() {
    this.fetchMemus();
  },
  mounted() {
    var el = this.$refs.dragable.$children[1].$el.children[1];
    let vm = this;
    Sortable.create(el, {
      onEnd: vm.endFunc
    });
  },
  methods: {
    goRuleCreate(params) {
      this.$router.push({
        name: "RuleCreate",
        query: { id: params.row.id, isVerify: true }
      });
    },
    fetchMemus() {
      this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_GetRolePermissionsList)
        .then(res => {
          this.data = res.data.data;
        });
    },
    deleteRule(params) {
      this.$Modal.confirm({
        title: "删除",
        content:
          "注意：删除操作将会导致【该菜单】以及【该菜单的全部子菜单】均被删除",
        loading: true,
        onOk: () => {
          this.$root.loading();
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_DeleteMenus, {
              id: params.row.id
            })
            .then(
              res => {
                this.$Spin.hide();
                this.$Modal.remove();
                this.$Message.success("删除成功！");
                this.data.splice(params.index, 1);
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
    },
    endFunc(e) {
      let movedRow = this.data[e.oldIndex];
      let targetRow = this.data[e.newIndex];
      this.data.splice(e.oldIndex, 1);
      this.data.splice(e.newIndex, 0, movedRow);
      let params = {
        current_id: movedRow.id,
        neighbor_id: targetRow.id,
        type: e.oldIndex > e.newIndex ? "left" : "right"
      };
      if (e.oldIndex !== e.newIndex) this.sortMenus(params);
    },
    sortMenus(params) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_SortMenus, params)
        .then(res => {
          this.$root.modal("success", "", res.data.data);
          let time = new Date().getTime();
          this.$store.commit("menuSortChange", time);
        });
    }
  }
};
</script>

