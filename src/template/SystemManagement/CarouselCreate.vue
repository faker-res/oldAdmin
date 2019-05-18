<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <div>
          <Form :label-width="180">
            <FormItem label="站点" prop="siteName">
              <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
            </FormItem>
            <FormItem label="终端">
              <RadioGroup v-model="params.clientType">
                <Radio label="pc">PC</Radio>
                <Radio label="h5">H5</Radio>
                <Radio label="ios">IOS</Radio>
                <Radio label="android">安卓</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="轮播信息">
              <table class="table">
                <thead>
                  <tr>
                    <th class="w50">序号</th>
                    <th class="w160">标题</th>
                    <th class="w160">动作类型</th>
                    <th class="w260">目标地址</th>
                    <th class="w100">类型</th>
                    <th class="w160">图片</th>
                    <th class="w260">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in CarouselList" :key="index">
                    <td>{{index+1}}</td>
                    <td>
                      <i-input style="width:160px" v-model="item.title" :disabled="isModify!=index" />
                    </td>
                    <td>
                      <i-input style="width:160px" v-model="item.actionType" :disabled="isModify!=index" />
                    </td>
                    <td>
                      <i-input style="width:260px" v-model="item.target" :disabled="isModify!=index" />
                    </td>
                    <td>
                      <Select v-model="params.position" disabled style="width:100px">
                        <Option value="banner">轮播</Option>
                      </Select>
                    </td>
                    <td>
                      <ViewImg :imgSrc="item.img" v-show="isModify!=index"></ViewImg>
                      <Button type="primary" size="small" v-show="isModify==index" @click="showImgModal=true;" icon="image">{{imgBtnTxt}}</Button>
                    </td>
                    <td>
                      <Button size="small" icon="ios-arrow-up" :disabled="index==0" @click="handlerUp(index)">上移</Button>
                      <Button size="small" icon="ios-arrow-down" :disabled="index==CarouselList.length-1" @click="handlerDown(index)">下移</Button>
                      <Button size="small" @click="deleteCarouselItem(index)">删除</Button>
                      <Button size="small" v-show="isModify!=index" @click="isModify=index;imgBtnTxt='选择图片'">编辑</Button>
                      <Button size="small" v-show="isModify==index" @click="confirmAddCarouse">确定</Button>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="7">
                      <Button @click="addCarouselItem" long type="success">添加轮播图</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FormItem>
            <FormItem>
              <Button @click="submitCarouselForm" :loading='$root.btnLoading' type="primary">
                <span v-if="$route.query.isVerify">确定修改</span>
                <span v-else>确定创建</span>
              </Button>
              <Button @click="$root.go_back">返回</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
    <Modal :mask-closable="false" width="1330px" v-model="showImgModal" @on-ok="chooseImg">
      <div slot="header"></div>
      <FilesList @listenhandleImg="listenhandleImg" :isComponent="true" />
    </Modal>
  </div>
</template>

<script>
import ViewImg from "@/template/my-components/ViewImg.vue";
import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";
import FilesList from "@/template/SystemManagement/FilesList.vue";
export default {
  components: { SiteNameSelect, FilesList, ViewImg },
  data() {
    return {
      isModify: -1,
      showImgModal: false,
      imgBtnTxt: "选择图片",
      imgSrc: "",
      fileData: [],
      params: {
        bodyFormatType: "JSON",
        position: "banner",
        clientType: "pc"
      },
      CarouselList: [],
      SiteNameSelectData: {
        default: true,
        type: "单选",
        placeholder: "请输入站点名称",
        style: {
          width: "160px"
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.SiteNameSelect.setDefaultSite(this.$route.query.siteId);
      if (this.$route.query.isVerify) this.fetchCarouselById();
    });
  },
  methods: {
    handlerUp(i) {
      let current = this.CarouselList[i];
      let previous = this.CarouselList[i - 1];
      this.CarouselList[i - 1] = current;
      this.CarouselList[i] = previous;
      let temp = [...this.CarouselList];
      this.CarouselList = [];
      this.CarouselList = [...temp];
    },
    handlerDown(i) {
      let current = this.CarouselList[i];
      let next = this.CarouselList[i + 1];
      this.CarouselList[i + 1] = current;
      this.CarouselList[i] = next;
      let temp = [...this.CarouselList];
      this.CarouselList = [];
      this.CarouselList = [...temp];
    },
    chooseImg() {
      this.imgBtnTxt = "已选择";
      this.CarouselList[this.isModify].img = this.imgSrc;
    },
    listenhandleImg(src) {
      this.imgSrc = src;
    },
    siteChange(re) {
      if (re) this.params.siteId = re.SiteId;
    },
    fetchCarouselById() {
      const { promotionId, siteId } = this.$route.query;
      let params = {
        siteId,
        promotionId
      };
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_CarouselList, params)
        .then(res => {
          this.$Spin.hide();
          const { clientType, body, position } = res.data.data.data[0];
          this.CarouselList = body;
          this.params.clientType = clientType;
          this.params.position = position;
        })
        .catch(res => {
          this.$Spin.hide();
        });
    },
    addCarouselItem() {
      this.imgBtnTxt = "选择图片";
      let obj = {
        actionType: "",
        img: "",
        target: "",
        title: ""
      };
      this.CarouselList.push(obj);
      this.isModify = this.CarouselList.length - 1;
    },
    confirmAddCarouse() {
      let targetObj = this.CarouselList[this.isModify];
      for (let key in targetObj) {
        if (targetObj[key] === "") {
          this.$Modal.error({ title: "提示", content: "请填写完整信息" });
          return false;
        }
      }
      this.isModify = -1;
    },
    deleteCarouselItem(index) {
      this.CarouselList.splice(index, 1);
    },
    submitCarouselForm() {
      /**
       * @params siteId:站点id
       * @params promotionId:空为创建，轮播自增ID
       * @params clientType:android,ios,h5,pc
       * @params body:轮播内的json结构体
       * @params bodyFormatType:JSON,HTML
       * @params position:single,banner,block
       * */
      if (!this.params.siteId) {
        this.$Modal.error({ title: "提示", content: "请选择站点" });
        return false;
      }
      if (!this.params.clientType) {
        this.$Modal.error({ title: "提示", content: "请选择终端" });
        return false;
      }
      this.params.body = JSON.stringify(this.CarouselList);
      if (!this.params.body) {
        this.$Modal.error({ title: "提示", content: "请填写轮播信息" });
        return false;
      }
      let errFlag = false;
      this.CarouselList.forEach(item => {
        for (let key in item) {
          if (item[key] === "") {
            errFlag = true;
            return false;
          }
        }
      });
      if (errFlag) {
        this.$Modal.error({ title: "提示", content: "请填写完整信息" });
        return false;
      }
      if (this.$route.query.isVerify) {
        this.params.promotionId = this.$route.query.promotionId;
      } else {
        //新增轮播不传promotionId
        delete this.params.promotionId;
      }
      this.$root.loading();
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_ModifyCarouselInfo,
          this.params
        )
        .then(res => {
          this.$Spin.hide();
          this.$Modal.success({ title: "提示", content: res.data.data });
        })
        .catch(res => {
          this.$Spin.hide();
        });
    }
  }
};
</script>
<style lang="less" scoped>
@w50: 50px;
@w100: 100px;
@w160: 160px;
@w260: 260px;
.table {
  text-align: center;
  th.w50 {
    width: @w50;
  }
  th.w100 {
    width: @w100;
  }
  th.w160 {
    width: @w160;
  }
  th.w260 {
    width: @w260;
  }
}

/deep/.ivu-tabs-content {
  height: 300px;
  overflow-y: scroll;
}
/deep/.ivu-scroll-container {
  overflow-y: hidden !important;
}
/deep/.ivu-modal-body {
  height: 500px;
}
</style>


