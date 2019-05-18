

<template>
  <div class="ll">
    <div class="login" @keydown.enter="handleSubmit">
      <div class="login-con">
        <Card :bordered="false">
          <p slot="title">
            <Icon type="log-in"></Icon>
            欢迎登录
          </p>
          <div class="form-con">
            <i-form ref="loginForm" :model="LoginForm" :rules="rules">
              <FormItem prop="adminUserName">
                <i-input v-model="LoginForm.adminUserName" placeholder="请输入用户名">
                  <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                  </span>
                </i-input>
              </FormItem>
              <FormItem prop="adminPassword">
                <i-input type="password" v-model="LoginForm.adminPassword" placeholder="请输入密码">
                  <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                  </span>
                </i-input>
              </FormItem>
              <FormItem prop="token">
                <i-input v-model="LoginForm.token" placeholder="请输入验证码">
                  <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                  </span>
                </i-input>
              </FormItem>
              <FormItem>
                <Button @click="handleSubmit" type="primary" long>登录</Button>
              </FormItem>
            </i-form>
            <p class="login-tip">输入正确用户名和密码</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      LoginForm: {
        adminUserName: "",
        adminPassword: ""
      },
      rules: { 
        adminUserName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        adminPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        token: [
          { required: true, pattern: /^\d{6}$/, message: "请输入6位数字验证码", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    handleSubmit() {
      var that = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$root.LoginTrue(this.LoginForm).then(() => {
            let roleNames = JSON.parse(localStorage.AdminInfo).roleNames
            if(roleNames.indexOf('tg-developer') !== -1){
              this.$router.push({
                name: "SystemLog"
              });
            }else{
              this.$router.push({
                name: "home_index"
              });
            }
            this.$Message.success("登录成功");
            this.$store.commit("changeLogoutStatus", false);
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.ll {
  position: relative;
}
.login {
  width: 100%;
  height: 100%;
  background-image: url('../assets/imgs/login_bg.jpg');
  background-size: cover;
  background-position: center;
  position: fixed;
  left: 0px;
  top: 0px;
  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
