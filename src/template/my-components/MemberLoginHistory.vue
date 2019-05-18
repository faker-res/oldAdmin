<template>
    <Modal class-name="vertical-center-modal" v-model="memberHistoryModal" width="880px" title="登陆历史">
        <Table border :columns="table.columns" :data="table.data"></Table>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      memberHistoryModal: false,
      table: {
        columns: [
          {
            title: "站点",
            key: "siteName",
            align: "center"
          },
          {
            title: "所属代理",
            key: "agencyName",
            align: "center"
          },
          {
            title: "账号",
            key: "userName",
            align: "center"
          },
          {
            title: "登陆设备",
            key: "device",
            align: "center"
          },
          {
            title: "登陆域名",
            width: 165,
            key: "domain",
            align: "center"
          },
          {
            title: "登陆ip/归属地",
            key: "ip",
            align: "center",
            width: 120,
            render: (h, params) => {
              return h("span",params.row.ip + "/" + params.row.ips.join("-"));
            }
          },
          {
            title: "日期",
            key: "created_at",
            align: "center",
            width: 140,
            render: (h, params) => {
              return h("span",this.$moment.unix(params.row.created_at).format("LLL"));
            }
          }
        ],
        data: []
      }
    };
  },
  methods: {
    async fetchData() {
      this.table.data = [];
      const { url, params } = this.data;
      this.$root.HTTP_ALLLINKPOST(url, params).then(res => {
        if (res.data.data.data) {
          this.table.data = res.data.data.data;
          this.memberHistoryModal = true;
        }
      });
    }
  }
};
</script>

