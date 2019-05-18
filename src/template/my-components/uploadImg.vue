<template>
    <Modal title="上传图片" v-model="uploadData.upload" @on-ok="UploadFiles" @on-cancel="funDeleteFile">
        <div>
            <div class="image-editor">
                <input v-show="0" ref="UploadImg" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange1" id="fileinput1" class="fileinput" />
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
            <span>图片档案大小不超过2M，必需为*.png,*.jpg</span>
            <span v-if="uploadData.size">，尺寸360*360</span>
        </div>
    </Modal>
</template>
<script>
export default {
  props: ["uploadData"],
  data() {
    return {
      uploadFiles: {
        siteId: null,
        file: null
      },
      imgInfo: {
        imgurl: "",
        imgsize: "",
        imgpx: "",
        imgname: "",
        isShow: false
      },
      files: null
    };
  },
  methods: {
    getFileType(filePath) {
      var startIndex = filePath.lastIndexOf(".");
      if (startIndex != -1) {
        return filePath
          .substring(startIndex + 1, filePath.length)
          .toLowerCase();
      } else return "";
    },
    handleChange1(e) {
      var that = this;
      let file = e.target.files[0];
      this.files = e.target.files[0];
      let reader = new FileReader();
      let fileType = this.getFileType(e.target.files[0].name);
      if (
        fileType != "jpg" &&
        fileType != "jpeg" &&
        fileType != "bmp" &&
        fileType != "png" &&
        fileType != "gif"
      ) {
        this.$Message.warning(
          `图片${file.name}'上传失败，上传的文件格式不正确！`
        );
        return;
      } else if (file.size > 1024000 * 2) {
        this.$Message.warning(
          `'图片'${
            file.name
          }'上传失败，上传的文件格式为大小不超过2M的JPG、PNNG、文件！'`
        );
        return;
      } else {
        reader.onload = () => {
          this.imgInfo.imgurl = reader.result;
          this.imgInfo.imgsize = (file.size / 1024000).toFixed(2) + "M";
          this.imgInfo.imgname = file.name;
          this.imgInfo.isShow = true;
          this.uploadFiles.file = file;
          reader.onload = null;
        };
        reader.readAsDataURL(file);
      }
    },
    ShangChuanTuPian() {
      this.$refs.UploadImg.click();
    },
    funDeleteFile(fileDelete) {
      this.imgInfo.imgurl = "";
      this.imgInfo.imgsize = "";
      this.imgInfo.imgname = "";
      this.imgInfo.isShow = false;
      this.$refs.UploadImg.value = "";
      this.uploadFiles.file = "";
      this.files = null;
    },
    UploadFiles() {
      let formData = new FormData();
      this.uploadFiles.siteId = this.uploadData.siteId;
      for (let key in this.uploadFiles) {
        formData.append(key, this.uploadFiles[key]);
      }
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Upload_Files, formData)
        .then(res => {
          if (res.data.data.length) {
            this.$root.modal("success", "", "上传成功");
            this.funDeleteFile();
            this.uploadData.src = res.data.data[1].src;
            this.uploadData.path = res.data.data[1].path;
            this.$emit("refresh"); //上传成功后刷新图片列表
            // this.search.location = "qiniu"
            // if (this.search.location === 'local') {
            //     this.localIndex = 1
            // } else {
            //     this.qiniuIndex = 1
            // }
            // this.Search()
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
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
/deep/.ivu-modal-wrap {
  z-index: 1002;
}
/deep/.ivu-modal-mask {
  z-index: 1001;
}
</style>