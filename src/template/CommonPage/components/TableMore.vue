<template>
  <Table
    ref="dragable"
    :columns="columns"
    :data="row.children"
    highlight-row
    border
  ></Table>
</template>

<script>
import Sortable from "sortablejs";
export default {
  props: ["row"],
  data() {
    return {
      columns: [
        {
          type: "expand",
          title: "...",
          align: "center",
          className: "hidden",
          width: 60,
          render: (h, params) => {
            let that = this;
            if (params.row.children.length) {
              return params.row.children.map((item, index) => {
                const template = {
                  props: ["item"],
                  template: `
                    <div :style="{
                        float:'left',
                        marginBottom:'8px',
                        padding:'0 30px'
                      }"
                    >
                      <span :style="{
                          display:'inline-block',
                          width:'400px'
                        }"
                      >
                        <span>{{item.name}}</span>
                        <span>[{{item.permission?item.permission.name:"#"}}]</span>
                        <span>[{{item.type||"#"}}]</span>
                      </span>
                      <a href="javascript:;" style="margin:0 10px" @click="goPage(item.id)">编辑</a> 
                      <a href="javascript:;" @click="goDelete(item)">删除</a> 
                    </div>  
                  `,
                  methods: {
                    goPage(id) {
                      that.goRuleCreate(id);
                    },
                    goDelete(col) {
                      if (col.id === item.id) {
                        params.row.children.splice(index, 1);
                      }
                      that.deleteRule(col, "children");
                    }
                  }
                };
                return h(template, {
                  props: { item }
                });
              });
            } else {
              const template = {
                template: `
                  <div style="text-indent:30px">暂无信息！</div>
                `
              };
              return h(template);
            }
          }
        },
        {
          title: "子级权限名称",
          key: "name",
          className: "hidden text-indent-20",
          minWidth: 400,
          render: (h, params) => {
            const template = {
              props: ["row"],
              template: `<div>
                        <span>{{row.name}}</span>
                        <span>[{{row.permission?row.permission.name:"#"}}]</span>
                        <span>[{{row.type||"#"}}]</span>
                      </div>`
            };
            return h(template, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "操作",
          key: "oprate",
          align: "center",
          width: 300,
          className: "hidden",
          render: (h, params) => {
            let that = this;
            const template = {
              props: ["params"],
              template: `
                <div>
                  <Button size="small" style="margin-Right:5px" @click="goPage(params.row.id)">编辑</Button>
                  <Button size="small" @click="goDelete(params)">删除</Button>
                </div>
              `,
              methods: {
                goPage(id) {
                  that.goRuleCreate(id);
                },
                goDelete(params) {
                  that.deleteRule(params, "parent");
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
          className: "hidden",
          render: h => {
            const template = {
              template: `<Icon type="arrow-move" size="24"></Icon>`
            };
            return h(template);
          }
        }
      ]
    };
  },
  mounted() {
    var el = this.$refs.dragable.$children[1].$el.children[1];
    let vm = this;
    Sortable.create(el, {
      onEnd: vm.endFunc
    });
  },
  methods: {
    goRuleCreate(id) {
      this.$router.push({
        name: "RuleCreate",
        query: { id, isVerify: true }
      });
    },
    deleteRule(params, type) {
      let id = type === "parent" ? params.row.id : params.id;
      this.$Modal.confirm({
        title: "删除",
        content:
          "注意：删除操作将会导致【该菜单】以及【该菜单的全部子菜单】均被删除",
        loading: true,
        onOk: () => {
          this.$root.loading();
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_DeleteMenus, { id })
            .then(
              res => {
                this.$Spin.hide();
                this.$Modal.remove();
                this.$Message.success("删除成功！");
                if (type === "parent") {
                  this.row.children.splice(params.index, 1);
                }
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
      let movedRow = this.row.children[e.oldIndex];
      let targetRow = this.row.children[e.newIndex];
      this.row.children.splice(e.oldIndex, 1);
      this.row.children.splice(e.newIndex, 0, movedRow);
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
<style lang="less" scoped>
/deep/.text-indent-20 {
  text-indent: 20px;
}
/deep/th.hidden {
  display: none;
}
</style>

