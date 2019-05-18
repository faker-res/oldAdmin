<template>
  <div>
    <div>
      <i-col span="24">
        <i-table
          @on-sort-change="OnSortChange"
          ref="table"
          border
          v-on:listenRequest='tableRequest'
          @on-selection-change="OnSelected"
          @on-expand="expand "
          :class="{center:table.align=='center'}"
          :loading="table.loading"
          :context="$parent"
          :data="table.TableData.data"
          :columns="table.TableColumn"
        ></i-table>
      </i-col>
      <div
        style="margin: 10px;"
        v-if="table.TableData.last_page>1"
      >
        <div class="clearfix" style="float: right;">
          <Page
            :total="table.TableData.total"
            show-total
            :current="page"
            :page-size="table.TableData.per_page-0"
            @on-change="PageChange"
            show-elevator
            ref="Page"
            style="float:left;"
          ></Page>
          <Button size="small" @click="goPage" style="float: left;height:32px;margin:10px 0 0 10px;">go!</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableCommon",
  props: ["table"],
  components: {},
  activated() {},
  data() {
    return {
      page: 1,
      response: {},
      dateOption: {}
    };
  },
  watch: {
    "table.posturl": function(value) {
      this.tableRequest();
    },
    "table.Refresh": function(value) {
      this.tableRequest();
    },

    "table.dataform": {
      handler(value) {
        if (this.table.posturl.indexOf("?") > 0) {
          this.table.posturl = this.table.posturl.slice(
            0,
            this.table.posturl.indexOf("?")
          );
        }
        if (!this.table.post) {
          this.tableRequest();
        }
      },
      deep: true
    },
    "table.selectAllcencle": function(value) {
      this.$refs.table.selectAll(false);
    }
  },
  created() {
    if (!this.table.flag) {
      //如果flag为true时，表示不会在创建组建的时候请求数据，默认为false
      this.tableRequest();
    }
  },
  methods: {
    goPage(){
      let inputEl = this.$refs.Page.$el.querySelector("input");
      let pageNum = inputEl.value;
      if(pageNum > this.$refs.Page.allPages) return false;
      if (this.table.posturl.indexOf("?") > 0) {
        this.table.posturl = this.table.posturl.slice(
          0,
          this.table.posturl.indexOf("?")
        );
      }
      this.table.posturl = this.table.posturl + "?page=" + pageNum;
    },
    PageChange(t) {
      if (this.table.posturl.indexOf("?") > 0) {
        this.table.posturl = this.table.posturl.slice(
          0,
          this.table.posturl.indexOf("?")
        );
      }
      this.table.posturl = this.table.posturl + "?page=" + t;
    },
    OnSelected(r) {
      this.$emit("listenOnSelect", r);
    },
    OnSortChange(c) {
      this.$emit("listenOnSortTable", c);
    },
    expand(row, status) {
      this.$emit("listenOnExpand", { row: row, status: status });
    },
    tableRequest(event) {
      // var that = this;
      this.table.loading = true;
      if (this.table.postType !== "get" && this.table.posturl) {
        this.$root
          .HTTP_ALLLINKPOST(this.table.posturl, this.table.dataform)
          .then(res => {
            if (typeof res.data.data === "string") {
              this.table.TableData = JSON.parse(res.data.data);
            } else {
              if (res.data.data.hasOwnProperty("data")) {
                if (res.data.data.data.hasOwnProperty("list")) {
                  //有总计的列表，数据结构为data:{list:[],total:{}}
                  this.table.TableData = { ...res.data.data };
                  this.table.TableData.data = [...res.data.data.data.list];
                  this.$set(
                    this.table.TableData,
                    "totalCount",
                    res.data.data.data.total
                  );
                } else {
                  this.table.TableData = res.data.data;
                }
              } else {
                this.table.TableData.data = res.data.data;
                if (Object.keys(res.data.data)) {
                  this.table.TableData.data = Object.values(res.data.data);
                }
              }
              if (res.data.data.length == 0) {
                this.table.TableData = {};
              }
              this.page = res.data.data.current_page;
            }
            this.table.loading = false;
            if (this.table.TableData.data.length) {
              this.table.buttonDisabled = false;
            } else {
              this.table.buttonDisabled = true;
            }
            this.$emit("listenOnTableData");
          })
          .catch(res => {
            this.table.loading = false;
            this.$emit("listenOnTableData");
            this.table.TableData.data = [];
            if (res.body && res.body.code !== 200) {
              this.$emit("catchError", res.body.code);
            }
          });
      } else if (this.table.posturl) {
        this.$root
          .HTTP_ALLLINKGET(this.table.posturl, this.table.dataform)
          .then(res => {
            if (typeof res.data.data === "string") {
              this.table.TableData = JSON.parse(res.data.data);
            } else {
              if (res.data.data.hasOwnProperty("data")) {
                this.table.TableData = res.data.data;
              } else {
                this.table.TableData.data = res.data.data;
              }
            }
            this.table.loading = false;
          })
          .catch(res => {
            this.table.loading = false;
            this.table.TableData.data = [];
          });
      } else {
        this.table.loading = false;
      }
    }
  }
};
</script>

<style>
</style>
