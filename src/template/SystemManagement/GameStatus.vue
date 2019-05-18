<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <!-- <div class="c_right">
                        <div style="margin: 10px 0;" v-for='(item,i) in dataList' :key="i"  @click="getIndex(i)">
                            <span style="font-size:20px;">{{dictionary[item[0].platform]}}</span>
                            <i-table border :loading="table.loading" :data="item" :columns="table.TableColumn" :class="{center:table.align=='center'}"></i-table>
                        </div>
                    </i-col>
                </div> -->

        <div
          class="list"
          v-for="(item,i) in dataList"
          :key="i"
        >
          <ul>
            <li>名称</li>
            <li
              v-for="(v,k) in item"
              :key="k"
            >{{v.name}}</li>
          </ul>
          <ul>
            <li>状态</li>
            <li
              v-for="(v,k) in item"
              :key="k"
            >
              <i-switch
                v-model="v.change"
                @on-change="change(v)"
              ></i-switch>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameStatus",
  data() {
    return {
      index: 0,
      dictionary: {
        chess: "棋牌",
        live_casino: "真人视讯",
        lottery: "彩票",
        slot: "电子游戏",
        sport: "体育赛事",
        vr_lottery: "VR彩票"
      },
      dataList: [],
      table: {
        TableColumn: [
          {
            title: "ID",
            key: "id"
          },
          {
            title: "编码",
            key: "code"
          },
          {
            title: "名称",
            key: "name"
          },
          {
            title: "状态",
            key: "status",
            render: (h, params) => {
              let status = params.row.status;
              return h(
                "Button",
                {
                  props: {
                    type: status === "yes" ? "success" : "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$root
                        .HTTP_ALLLINKPOST(
                          this.$root.HTTP_L.HTTP_Update_GameStatus,
                          {
                            gameId: params.row.id,
                            code: params.row.code,
                            platform: params.row.platform,
                            status: status === "yes" ? "no" : "yes",
                            updated_user: this.$root.adminuserinfo.adminUserName
                          }
                        )
                        .then(res => {
                          this.$root.modal("success", "", res.data.data);
                          this.dataList[this.index][params.index].status =
                            status === "yes" ? "no" : "yes";
                        });
                    }
                  }
                },
                status === "yes" ? "开启" : "关闭"
              );
            }
          }
        ],
        loading: true,
        align: "center"
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_List_GameStatus, {
          isRules: "select"
        })
        .then(res => {
          this.dataList = Object.values(res.data.data);
          // this.table.loading = false
          this.dataList.forEach(item => {
            item.forEach(i => {
              if (i.status === "yes") {
                i.change = true;
              } else {
                i.change = false;
              }
            });
          });
        });
    },
    getIndex(v) {
      this.index = v;
    },
    change(v) {
      let status = v.status;
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Update_GameStatus, {
          gameId: v.id,
          code: v.code,
          platform: v.platform,
          status: status === "yes" ? "no" : "yes",
          updated_user: this.$root.adminuserinfo.adminUserName
        })
        .then(res => {
          this.$root.modal("success", "", res.data.data);
          this.init();
          // v.status = status === "yes" ? "no" : "yes"
          // v.change = status === "yes" ? false : true
        });
    }
  }
};
</script>
<style lang="less" scoped>
.page-con1 {
  width: 90%;
  margin: auto;
  display: flex;
  border: 1px solid #ccc;
  .list {
    flex: auto;
    border-right: 1px solid #ccc;
    &:last-child {
      border-right: 0;
    }
    ul {
      list-style: none;
      float: left;
      width: 50%;
      li {
        text-align: center;
        height: 35px;
        line-height: 35px;
      }
    }
  }
}
</style>