
<template>
  <div>
    <Row>
      <!-- <i-table :context="$parent" :columns="shoppingColumns" :data="shoppingData" style="width: 100%;"></i-table> -->
      <bbcx :table="table"></bbcx>
    </Row>
  </div>
</template>

<script>
import bbcx from "@/template/my-components/iview-table/table";
export default {
  name: "argument-page",
  components: { bbcx },
  data() {
    return {
      table: {
        TableColumn: [
          {
            key: "RiQi",
            title: "日期",
            align: "center"
          },
          {
            title: "线上会员",
            key: "XianShangHuiYuan",
            align: "center"
          },
          {
            title: "投注单量(元)",
            key: "TouZhuDanLiang",
            align: "center"
          },
          {
            title: "有效投注(元)",
            key: "YouXiaoTouZhu"
          },
          {
            title: "损益(元)",
            key: "SunYi"
          },
          {
            title: "查看详情",
            key: "show_more",
            align: "center",
            render: (h, params) => {
              return h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      // let query = { shopping_id: params.row.shopping_id };
                      this.$router.push({
                        name: "member"
                        // query: query
                      });
                    }
                  }
                },
                "了解详情"
              );
            }
          }
        ],
        TableData: [
          {
            RiQi: "2017年11月12日",
            XianShangHuiYuan: 20,
            TouZhuDanLiang: 10,
            YouXiaoTouZhu: 100,
            SunYi: 100
          },
          {
            RiQi: "2017年11月12日",
            XianShangHuiYuan: 20,
            TouZhuDanLiang: 10,
            YouXiaoTouZhu: 100,
            SunYi: 100
          },
          {
            RiQi: "2017年11月12日",
            XianShangHuiYuan: 20,
            TouZhuDanLiang: 10,
            YouXiaoTouZhu: 100,
            SunYi: 100
          },
          {
            RiQi: "2017年11月12日",
            XianShangHuiYuan: 20,
            TouZhuDanLiang: 10,
            YouXiaoTouZhu: 100,
            SunYi: 100
          },
          {
            RiQi: "2017年11月12日",
            XianShangHuiYuan: 20,
            TouZhuDanLiang: 10,
            YouXiaoTouZhu: 100,
            SunYi: 100
          },
          {
            RiQi: "2017年11月12日",
            XianShangHuiYuan: 20,
            TouZhuDanLiang: 10,
            YouXiaoTouZhu: 100,
            SunYi: 100
          }
        ],
        loading: true,
        align: "center",
        // posturl: "/api/deposit/index",
        dataform: {}
      }
    };
  }
};
</script>
