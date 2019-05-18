<template>
  <div class="content-main GameHallManagement-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}  <span>{{routerParams}}</span></h1>
            </div>
            <div class="page-con1">
                <div class="blockquote">
                    <ol>
                        <li>
                            <div style="margin-bottom:10px;">目前状态为  
                                <Tag v-if="!HasDiscount" color="red">关闭</Tag>
                                <Tag v-if="HasDiscount" color="green">开启</Tag>
                                <a v-if="HasDiscount" @click = "zhuangtaixiugai()">关闭</a>  
                                <a v-if="!HasDiscount" @click = "zhuangtaixiugai()">开启</a>  
                            </div> 
                        </li>
                        <li>
                            转帐额度确认未结案共有 <a href="javascript:">0</a>  笔，共计 ￥<a href="javascript:">0</a>  元。
                        </li>
                    </ol>
                </div>
                <div class="b_link">
                    <a href="javascript:" @click="$root.go_back">回上一页</a>
                    <router-link :to="{name:'GameHallManagement'}">回到列表</router-link>
                    <router-link :to="{name:'GameHallManagementHistory'}">检视历史记录</router-link>
                    <a href="javascript:"> 
                        <Tooltip content="登出并取回与更新钱包" placement="top">
                            <Icon type="help-circled"></Icon>
                        </Tooltip>
                        踢除所有会员
                    </a>
                    <a href="javascript:"> 
                        <Tooltip content="更新钱包" placement="top">
                            <Icon type="help-circled"></Icon>
                        </Tooltip>
                        更新所有钱包
                    </a>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            routerParams: this.$route.params.id,
            HasDiscount: true
        };
    },
    created () {},
    methods: {
        zhuangtaixiugai () {
            this.HasDiscount = !this.HasDiscount;
        }
    }
};
</script>

<style>

</style>
