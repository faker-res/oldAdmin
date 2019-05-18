
    
    <template>
    <Modal class-name="vertical-center-modal" v-model="financeTrendData.souSuoJieGuo" :loading="$root.btnLoading">
        <div class="page-con1">
        <div class="c_left">
          <!-- <i-col class="c_search_top" span="24">
            <Card dis-hover>
              <i-form :model="search" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="用户名">
                  <i-input style="width:150px" v-model="search.username"></i-input>
                </FormItem>
                <FormItem label="日期时间">
                  <DatePicker type="datetimerange" v-model="Time" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width: 330px"></DatePicker>
                </FormItem>
                <FormItem label="每页笔数">
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
          </i-col> -->
        </div>
        <div class="c_right">
          <!-- <i-col class="c_search_result" span="24">
            <div style="margin: 10px 0;overflow: hidden">
              <DepositListTable :table="table"></DepositListTable>
            </div>
          </i-col> -->
        </div>
      </div>
    </Modal>
</template>
<script>
export default {
  name: "",
  props: ["data", "time"],
  data() {
    return {
        financeTrendData: this.data
    };
  },
  created() {
  },
  cumputed: {},
  watch: {
    "financeTrendData.sousuojieguo": function(val) {
      if (val) {
      } else {
      }
    },
  },
  methods: {
  },
  mounted() {}
};
</script>
<style lang='less' scoped>
table {
  margin: 0 auto;
  border-collapse: collapse;
  tr {
    width: 100%;
    td {
      border: 1px solid #e9eaec;
      padding: 10px 20px;
      vertical-align: top;
      .ivu-checkbox-group {
        .ivu-checkbox-group-item {
          display: block;
        }
      }
    } // &:first-child{
    //     td{
    //         text-align: center;
    //     }
    // }
  }
}
</style>