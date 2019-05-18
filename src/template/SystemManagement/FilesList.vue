<template>
    <div class="content-main">
        <Icon type="ios-close-empty" v-if="fileData ? fileData.display : false" @click.native="$emit('show',false)"></Icon>
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}</h1>
            </div>
            <div class="page-con1">
                <i-col class="c_search_top" span="24">
                    <Card dis-hover>
                        <!-- <div slot="title"><div slot="title">查询条件</div></div> -->
                        <i-form ref="RecordSearch" :model="search" inline>
                            <FormItem label="站点">
                                <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                            </FormItem>
                            <Button type="primary" @click="uploadData.upload=true" icon="image">上传图片</Button>
                        </i-form>
                    </Card>
                </i-col>
                <i-col class="c_search_result" span="24">
                    <div class="serach">
                        <div class="have_con">
                            <Tabs type="card" :animated="false" value="qiniu" @on-click="location" v-model="search.location">
                                <TabPane name="qiniu" label="七牛云">
                                    <Scroll :on-reach-bottom="handleReachBottom" :height="fileData ? '400' : '500'" :distance-to-edge="10">
                                        <img v-for="(item,i) in qiniuDataList" :key="i" :src="item.src" @click="handleView(item.src,item.path,i)" :class="resultNum === i ? 'active' : ''" />
                                    </Scroll>
                                </TabPane>
                                <TabPane name="local" label="本地">
                                    <Scroll :on-reach-bottom="handleReachBottom" :height="fileData ? '400' : '500'" :distance-to-edge="10">
                                        <img v-for="(item,i) in localDataList" :key="i" :src="item.src" @click="handleView(item.src,item.path,i)" :class="resultNum === i ? 'active' : ''" />
                                    </Scroll>
                                </TabPane>
                                <Spin size="large" fix v-if="spinShow"></Spin>
                            </Tabs>
                        </div>
                    </div>
                </i-col>
                <!-- 作为组件弹框时的确定按钮 -->
                <i-col span="24" v-if="fileData ? fileData.display : false" style="padding:20px;text-align:right;">
                    <Button style="display:inline-block;margin-right: 20px;" @click="$emit('show',false);fileData.src='';fileData.path='';num=null">取消</Button>
                    <Button type="primary" style="display:inline-block;" @click="$emit('show',false)">确定</Button>
                </i-col>
            </div>
        </div>
        <Modal title="查看图片" v-model="visible" class="imgDetail">
            <img :src='src' v-if="visible" style="width: 100%">
        </Modal>
        <UploadImg :uploadData="uploadData" @refresh="refresh" />
        <!-- <Modal title="上传图片" v-model="upload" @on-ok="UploadFiles" @on-cancel="funDeleteFile">
            <div>
                <div class="image-editor">
                    <input v-show="0" ref="UploadImg" type="file" accept="image/png, image/jpeg, image/gif, image/jpg"
                        @change="handleChange1" id="fileinput1" class="fileinput" />
                    <a v-show="!imgInfo.isShow" href="javascript:void(0);" @click="ShangChuanTuPian">选择图片</a>
                    <Button v-show="imgInfo.isShow" type="primary" @click="ShangChuanTuPian" icon="image">重新上传</Button>
                    <span v-show="imgInfo.isShow">文件名称为：{{imgInfo.imgname}}</span>
                    <span v-show="imgInfo.isShow">文件大小为：{{imgInfo.imgsize}}</span>
                    <a href="javascript:" v-show="imgInfo.isShow" @click="funDeleteFile">删除</a>
                </div>
                <div class="ShangChuanT">
                    <div v-show="!imgInfo.isShow" @click="ShangChuanTuPian" style="line-height:150px;cursor:pointer">请上传图片</div>
                    <img :src="imgInfo.imgurl" alt="" v-if="imgInfo.isShow" width="200px" height="200px">
                </div>
                图片档案大小不超过2M，必需为*.png,*.jpg
            </div>
        </Modal> -->
    </div>
</template>
<script>
import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";
import UploadImg from "@/template/my-components/uploadImg.vue";
export default {
  name: "FilesList",
  components: {
    SiteNameSelect,
    UploadImg
  },
  props: ["fileData", "isComponent"], //图片库作为组件时
  data() {
    return {
      num: null,
      SiteNameSelectData: {
        default: true,
        type: "单选",
        placeholder: "请输入站点名称",
        style: {
          width: "160px"
        }
      },
      search: {
        siteId: null,
        location: "qiniu",
        isRules: "select"
      },
      localDataList: [],
      qiniuDataList: [],
      spinShow: true, //加载loading
      visible: false, //点击图片放大
      src: "",
      localIndex: 1,
      qiniuIndex: 1,
      // imgInfo: {
      //     imgurl: "",
      //     imgsize: "",
      //     imgpx: "",
      //     imgname: "",
      //     isShow: false
      // },
      // files: null,
      // uploadFiles: {
      //     siteId: null,
      //     file: null
      // },
      // upload: false,
      uploadData: {
        //上传图片data
        upload: false,
        siteId: null
      }
    };
  },
  computed: {
    resultNum() {
      return this.num;
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isComponent)
        this.$refs.SiteNameSelect.setDefaultSite(this.$route.query.siteId);
    });
  },
  methods: {
    mechange(re) {
      this.search.siteId = re.SiteId;
      this.uploadData.siteId = re.SiteId;
      if (this.search.siteId) {
        this.Search();
      }
    },
    Search() {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_List_Files, this.search)
        .then(res => {
          if (this.search.location === "local") {
            this.localDataList = res.data.data.data;
          } else {
            this.qiniuDataList = res.data.data.data;
          }
          this.spinShow = false;
        });
    },
    location(re) {
      this.search.location = re;
      if (
        (re === "local" && !this.localDataList.length) ||
        (re === "qiniu" && !this.qiniuDataList.length)
      ) {
        this.Search();
      }
    },
    handleView(src, path, index) {
      //选中图片
      this.num = index;
      this.src = src;
      if (this.fileData) {
        this.fileData.path = path;
        this.fileData.src = src;
      }
      this.$emit("listenhandleImg", src);
      this.visible = true;
    },
    handleReachBottom() {
      let index = null;
      return new Promise(resolve => {
        if (this.search.location === "local") {
          this.localIndex++;
          index = this.localIndex;
        } else {
          this.qiniuIndex++;
          index = this.qiniuIndex;
        }
        this.$root
          .HTTP_ALLLINKPOST(
            this.$root.HTTP_L.HTTP_List_Files + "?page=" + index,
            this.search
          )
          .then(res => {
            res.data.data.data.forEach(element => {
              if (this.search.location === "local") {
                this.localDataList.push(element);
              } else {
                this.qiniuDataList.push(element);
              }
            });
            this.spinShow = false;
          });
        resolve();
      });
    },
    refresh() {
      this.search.location = "qiniu";
      if (this.search.location === "local") {
        this.localIndex = 1;
      } else {
        this.qiniuIndex = 1;
      }
      this.Search();
    }
    // getFileType(filePath) {
    //     var startIndex = filePath.lastIndexOf(".");
    //     if (startIndex != -1) {
    //         return filePath
    //             .substring(startIndex + 1, filePath.length)
    //             .toLowerCase();
    //     } else return "";
    // },
    // handleChange1(e) {
    //     var that = this;
    //     let file = e.target.files[0];
    //     this.files = e.target.files[0];
    //     let reader = new FileReader();
    //     let fileType = this.getFileType(e.target.files[0].name);
    //     if (
    //         fileType != "jpg" &&
    //         fileType != "jpeg" &&
    //         fileType != "bmp" &&
    //         fileType != "png" &&
    //         fileType != "gif"
    //     ) {
    //         this.$Message.warning(`图片${file.name}'上传失败，上传的文件格式不正确！`);
    //         return;
    //     } else if (file.size > 1024000 * 2) {
    //         this.$Message.warning(`'图片'${file.name}'上传失败，上传的文件格式为大小不超过2M的JPG、PNNG、文件！'`);
    //         return;
    //     } else {
    //         reader.onload = () => {
    //             this.imgInfo.imgurl = reader.result;
    //             this.imgInfo.imgsize = (file.size / 1024000).toFixed(2) + "M";
    //             this.imgInfo.imgname = file.name;
    //             this.imgInfo.isShow = true;
    //             this.uploadFiles.file = file;
    //             reader.onload = null;
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // },
    // ShangChuanTuPian() {
    //     this.$refs.UploadImg.click();
    // },
    // funDeleteFile(fileDelete) {
    //     this.imgInfo.imgurl = "";
    //     this.imgInfo.imgsize = "";
    //     this.imgInfo.imgname = "";
    //     this.imgInfo.isShow = false;
    //     this.$refs.UploadImg.value = '';
    //     this.uploadFiles.file = '';
    // },
    // UploadFiles() {
    //     let formData = new FormData();
    //     this.uploadFiles.siteId = this.search.siteId
    //     for (let key in this.uploadFiles) {
    //         formData.append(key, this.uploadFiles[key]);
    //     }
    //     this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Upload_Files, formData).then(res => {
    //         if (res.data.data.length) {
    //             this.$root.modal("success", "", "上传成功")
    //             this.search.location = "qiniu"
    //             if (this.search.location === 'local') {
    //                 this.localIndex = 1
    //             } else {
    //                 this.qiniuIndex = 1
    //             }
    //             this.Search()
    //         }
    //     })
    // }
  }
};
</script>

<style scoped lang="less">
.content-main {
  .ivu-icon-ios-close-empty {
    font-size: 31px;
    color: #999;
    transition: color 0.2s ease;
    position: relative;
    top: 1px;
    left: 98.5%;
    cursor: pointer;
  }
}

.have_con {
  img {
    width: 4.5%;
    height: 100px;
    margin-right: 0.5%;
    cursor: pointer;
    margin-bottom: 10px;

    &:nth-child(20n) {
      margin-right: 0;
    }
  }

  .active {
    // border: #aaa 1px dashed;
    // box-shadow:
    // 0 -5px 8px -7px rgba(81, 81, 81, 0.8),
    // 0 -5px 8px -7px rgba(81, 81, 81, 0.8),
    // 5px 0 8px -1px rgba(81, 81, 81, 0.4),
    // 5px 0 8px -1px rgba(81, 81, 81, 0.8);
    background: #000;
    border: 1px solid #fff;
    border-width: 5px 5px 5px 5px;
    box-shadow: 1px 1px 5px #333;
    -webkit-box-shadow: 1px 1px 5px #333;
    -moz-box-shadow: 1px 1px 5px #333;
  }
}

.ShangChuanT {
  height: 150px;
  width: 300px;
  background: #eee;
  border-radius: 3px;
  padding: 10px;
  margin-top: 20px;
  text-align: center;

  img {
    height: 100%;
    width: auto;
    max-width: 100%;
  }
}
.imgDetail {
  /deep/.ivu-modal-wrap {
    z-index: 1002;
  }
  /deep/.ivu-modal-mask {
    z-index: 1001;
  }
}
</style>