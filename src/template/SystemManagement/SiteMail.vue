
<template>
    <div class="content-main SiteMail-main">
        <div class="layout">
            <div>
                <div class="page-header">
                    <h1 class="binding">{{$route.meta.title}}</h1>
                </div>
                <div class="page-con1">
                    <Card dis-hover style="background-color: #ebf7ff;">
                        <div class="clearfix" style="height:32px;line-height:32px;">
                            <div class="fl_l" style="font-size: 16px;margin-right:10px;">站点</div>
                            <SiteNameSelect class="fl_l" ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                        </div>
                    </Card>
                    <div class="neirong">
                        <div class="tabs" >
                            <a :class="{'active':showComponent==='InboxList'}" @click="toggleComponent('InboxList')" href="javascript:"><Icon type="ios-undo"></Icon>收件箱</a>
                            <a :class="{'active':showComponent==='SentboxList'}" @click="toggleComponent('SentboxList')" href="javascript:"><Icon type="ios-undo"></Icon>发件箱</a>
                            <a :class="{'active':showComponent==='SentMailSend'}" @click="toggleComponent('SentMailSend')" href="javascript:"><Icon type="ios-redo-outline"></Icon>发信</a>
                            <!-- <Button @click="$router.push({name:'SiteMailSend'})" type="warning"> <Icon type="ios-paperplane-outline"></Icon> 发信</Button> -->
                        </div>
                        <div class="tab_con">
                            <component :is="showComponent" ref="component"></component>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SentMailSend from './components/SiteMailSend.vue';
import InboxList from './components/InboxList.vue';
import SentboxList from './components/SentboxList.vue';
import SiteNameSelect from '@/template/my-components/SiteNameSelect.vue';
export default {
    name: 'SiteMail',
    components: {
        SentMailSend,
        InboxList,
        SentboxList,
        SiteNameSelect
    },
    data () {
        return {
            showComponent: "InboxList",
            aa: false,
            SiteNameSelectData: {
                type: '单选',
                placeholder: '请选择站点名称',
                style: {
                    width: '160px'
                }
            }
        };
    },
    created () {},
    computed: {},
    methods: {
        toggleComponent(val){
            this.showComponent = val;
            this.$refs.SiteNameSelect.InitData();
        },
        siteChange(re){
            if (re) {
                this.$refs.component.siteChange(re);
            }
        }
    },
    watch: {}
};
</script>
<style scoped lang='less'>
.time {
  text-align: right;
}
.content-main {
  padding: 0;
}
.SiteMail-main {
  .page-header {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    .binding {
    }
  }
  .page-con1 {
    margin-top: 10px;
    padding-bottom: 20px;
  }
  .tabs {
    a {
      padding: 10px;
      display: inline-block;
      background: #fff;
      margin-bottom: -1px;
      border: 1px solid #fff;
      border-bottom: 1px solid #eee;margin-left: 10px;
    }
    a.active {
      border: 1px solid #eee;
      border-bottom: 1px solid #fff;
      color: #3a5593;
    }
    margin-top: 15px;
    border-bottom: 1px solid #eee;
  }
  .tab_con {
    .tu_biao {
      width: 50%;
      float: left;
    }
    
    // border-left: 5px solid #eee;
    padding-left: 10px;
    margin: 15px 0;
    width: 100%;
  }
}
</style>
