
<template>
    <div class="content-main SiteMail-main">
        <div class="layout">
            <div>
                <div class="page-header">
                    <h1 class="binding">{{$route.meta.title}}</h1>
                </div>
                <div class="page-con1">
                    <div class="blockquote">
                        <ol>
                            <li>厅主管端站名：
                                <span>{{SystemInfoxs.GroupNameAgent}}</span>
                            </li>
                            <li>代理管端站名：
                                <span>{{SystemInfoxs.GroupNameMaster}}</span>
                            </li>
                            <li>会员登入验证码类型：文字
                                <Tag v-if="SystemInfoxs.CaptchaTypeLogin!=1" color="green">算式</Tag>
                                <Tag v-if="SystemInfoxs.CaptchaTypeLogin==1" color="green">文字</Tag>
                                <span class="xiugaianniu">
                                    <a v-show="!SystemInfoxg.dl_x" @click="DL_x('CaptchaTypeLogin')">修改</a>
                                    <a v-show="SystemInfoxg.dl_x" @click="DL_queding('CaptchaTypeLogin')" >保存</a>
                                    <a v-show="SystemInfoxg.dl_x" @click="DL_calcle('CaptchaTypeLogin')" >取消</a>
                                </span>
                                <span>
                                    <Tooltip content="设定前台会员登入时的验证码类型" placement="top">
                                        <Icon type="information-circled"></Icon> 说明
                                    </Tooltip>
                                </span>
                                <div v-show="SystemInfoxg.dl_x">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>验证类型</th>
                                                <th>说明</th>
                                                <th>图示</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label>
                                                        <RadioGroup v-model="SystemInfoxs.CaptchaTypeLogin">
                                                            <Radio label="1">
                                                                <span></span>
                                                            </Radio>
                                                        </RadioGroup>

                                                    </label>
                                                </td>
                                                <td>文字</td>
                                                <td>使用者需填入正确的文字</td>
                                                <td>
                                                    <img src="https://cdn.igsttech.com/Multimedia/CaptchaExample/captcha_letter.png" alt="captcha letter">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <RadioGroup v-model="SystemInfoxs.CaptchaTypeLogin">
                                                        <Radio label="0">
                                                            <span></span>
                                                        </Radio>
                                                    </RadioGroup>
                                                </td>
                                                <td>算式</td>
                                                <td>使用者需填入正确的计算结果</td>
                                                <td>
                                                    <img src="https://cdn.igsttech.com/Multimedia/CaptchaExample/captcha_formula.png" alt="captcha formula">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                            <li>会员注册验证码类型：文字
                                <Tag v-if="SystemInfoxs.CaptchaTypeRegister!=1" color="green">算式</Tag>
                                <Tag v-if="SystemInfoxs.CaptchaTypeRegister==1" color="green">文字</Tag>
                                <span class="xiugaianniu">
                                   <a v-show="!SystemInfoxg.zc_x" @click="DL_x('CaptchaTypeRegister')">修改</a>
                                    <a @click="DL_queding('CaptchaTypeRegister')" v-show="SystemInfoxg.zc_x">保存</a>
                                    <a @click="DL_calcle('CaptchaTypeRegister')" v-show="SystemInfoxg.zc_x">取消</a>
                                </span>
                                <span>
                                    <Tooltip content="设定前台会员注册时的验证码类型" placement="top">
                                        <Icon type="information-circled"></Icon> 说明
                                    </Tooltip>
                                </span>
                                <div v-show="SystemInfoxg.zc_x">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>验证类型</th>
                                                <th>说明</th>
                                                <th>图示</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label>
                                                        <RadioGroup v-model="SystemInfoxs.CaptchaTypeRegister">
                                                            <Radio label="1">
                                                                <span></span>
                                                            </Radio>
                                                        </RadioGroup>

                                                    </label>
                                                </td>
                                                <td>文字</td>
                                                <td>使用者需填入正确的文字</td>
                                                <td>
                                                    <img src="https://cdn.igsttech.com/Multimedia/CaptchaExample/captcha_letter.png" alt="captcha letter">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <RadioGroup v-model="SystemInfoxs.CaptchaTypeRegister">
                                                        <Radio label="0">
                                                            <span></span>
                                                        </Radio>
                                                    </RadioGroup>
                                                </td>
                                                <td>算式</td>
                                                <td>使用者需填入正确的计算结果</td>
                                                <td>
                                                    <img src="https://cdn.igsttech.com/Multimedia/CaptchaExample/captcha_formula.png" alt="captcha formula">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                            <li>会员注册问答验证
                                <Tag v-if="SystemInfoxs.RobotQuestionRegister==0" color="red">关闭</Tag>
                                <Tag v-if="SystemInfoxs.RobotQuestionRegister==1" color="green">开启</Tag>
                                <span class="xiugaianniu">
                                    <a @click="wtxg('修改')" v-show="!SystemInfoxg.yz">修改</a>

                                    <a @click="wtxg('开启')" v-show="SystemInfoxg.yz">开启</a>
                                    <a @click="wtxg('关闭')" v-show="SystemInfoxg.yz">关闭</a>

                                    <a @click="wtxg('取消')" v-show="SystemInfoxg.yz">取消</a>
                                </span>
                                <span>
                                    <Tooltip content="设定前台会员注册时增加问答验证" placement="top">
                                        <Icon type="information-circled"></Icon> 说明
                                    </Tooltip>
                                </span>
                                <span style="color:red"> 修改将于5分钟内生效</span>
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="b_link">
                    <a href="javascript:" @click="$root.go_back">回上一页</a>
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            SystemInfoxs: {},
            SystemInfoxg: {
                dl_x: false,

                zc_c: {},
                zc_x: false,

                yz: false
            }
        };
    },
    created () {
        this.$http.get('./src/data/SystemInfoGetAll.json').then(function (res) {
            this.SystemInfoxs = res.data.detail;
        });
    },
    methods: {
        DL_x (i) {
            this.SystemInfoxg.zc_c = JSON.parse(JSON.stringify(this.SystemInfoxs));
            i == 'CaptchaTypeLogin' ? this.SystemInfoxg.dl_x = true : this.SystemInfoxg.zc_x = true;
        },

        DL_calcle (i) {
            if (i == 'CaptchaTypeLogin') {
                this.SystemInfoxs.CaptchaTypeLogin = this.SystemInfoxg.zc_c.CaptchaTypeLogin;
                this.SystemInfoxg.dl_x = false;
            } else {
                this.SystemInfoxs.CaptchaTypeRegister = this.SystemInfoxg.zc_c.CaptchaTypeRegister;
                this.SystemInfoxg.zc_x = false;
            }
        },
        DL_queding (i) {
            if (i == 'CaptchaTypeLogin') {
                this.SystemInfoxg.dl_x = false;
            } else {
                this.SystemInfoxg.zc_x = false;
            }
        },
        wtxg (i) {
            switch (i) {
                case '修改':
                    this.SystemInfoxg.yz = true;
                    this.SystemInfoxg.zc_c = JSON.parse(JSON.stringify(this.SystemInfoxs));
                    break;
                case '开启':
                    this.SystemInfoxs.RobotQuestionRegister = 1;
                    this.SystemInfoxg.yz = false;
                    break;
                case '关闭':
                    this.SystemInfoxs.RobotQuestionRegister = 0;
                    this.SystemInfoxg.yz = false;
                    break;
                case '取消':
                    this.SystemInfoxs.RobotQuestionRegister = this.SystemInfoxg.zc_c.RobotQuestionRegister;
                    this.SystemInfoxg.yz = false;
                    break;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.xiugaianniu {
  a {
    padding: 5px;
    display: inline-block;
  }
}
.table{
    margin-top:10px
}
</style>
