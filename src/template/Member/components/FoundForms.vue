<template>
   <Form ref="Form" :model="formKey" :rules="verifyRule" label-position="left" :label-width="90">
        <FormItem label="站点" prop="siteId" required>
          <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
        </FormItem>
        <FormItem label="操作" prop="role" required>
          <RadioGroup v-model="formKey.role">
            <Radio label="+">加</Radio>
            <Radio label="-">减</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="类型" prop="type" required>
          <Select ref="FoundsTypeSelect" clearable :style="{width:'260px'}" @on-change="FoudTypeChange">
            <Option v-show="formKey.role==='+'" v-for="(item,i) in FoundsType.add" :key='item.key' :value='item.index'>
              <span>{{item.label}}</span>
              <span :style="{float: 'right', color: '#ccc'}">{{item.key}}</span>
            </Option>
            <Option v-show="formKey.role==='-'" v-for="(item,i) in FoundsType.reduce" :key='i+1' :value='item.index'>
              <span>{{item.label}}</span>
              <span :style="{float: 'right', color: '#ccc'}">{{item.key}}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="打码倍数" prop="multiple" v-show="formKey.role === '+'" required>
          <input-number :min="0" :max="10" :step="1" v-model="formKey.multiple" style="width:260px;"></input-number>
        </FormItem>
        <FormItem label="金额" prop="userMoney">
          <Input v-model="formKey.userMoney" @on-change="testUserNum" :rows="5" type="textarea"
            style="width:260px;" placeholder="*格式为*:账号,金额 例如:a123,100 注意逗号为英文格式,一行一个,最多操作10000个用户"></Input>
        </FormItem>
        <FormItem label="备注" prop="remarks">
          <Input v-model="formKey.remarks" style="width:260px"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit('batch')">确定</Button>
          <Button @click="reset">重置</Button>
        </FormItem>
      </Form>
</template>
<script>
import AutoComplete from "@/template/my-components/AutoComplete.vue";
import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";
export default {
  components: {
    AutoComplete,
    SiteNameSelect
  },
  data(){
    return{
      formKey: {
        role: "+"
      },
      SiteNameSelectData: {
        type: "单选",
        default: false,
        placeholder: "站点",
        style: {
          width: "260px"
        }
      },
      AutoCompleteData: {
        siteId: null,
        type: "指定会员",
        xuanzhong: false,
        style: {
          width: "260px"
        },
        tip: "输入会员名称,带搜索功能"
      },
      FoundsType: {
        add :[
          {
            type: "deposit",
            subType: "manual",
            label: "人工汇款",
            key: "存款",
            index: 0
          },
          {
            type: "bonus",
            subType: "giftBonusAdmin",
            label: "彩金派送",
            key: "彩金",
            index: 1
          },
          {
            type: "bonus",
            subType: "RebateBonus",
            label: "返水派送",
            key: "返水",
            index: 2
          },
          {
            type: "bonus",
            subType: "bonus",
            label: "汇款优惠",
            key: "优惠",
            index: 3
          },
          {
            type: "deposit",
            subType: "transfer",
            label: "额度转换失败",
            key: "额度转换",
            index: 4
          },
          {
            type: "other",
            subType: "other",
            label: "其他",
            key: "其他",
            index: 5
          }
        ],
      reduce:[
        {
          type: "withdrawals",
          subType: "manual",
          label: "人工提出",
          key: "取款",
          index: 0
        },
        {
          type: "other",
          subType: "other",
          label: "其他",
          key: "其他",
          index: 1
        }
      ]
    },
    verifyRule: {
        money: [{
          required: true,
          message: "金额必须填写",
          trigger: "blur"
        }],
        remarks: [{
          required: true,
          message: "备注必须填写",
          trigger: "blur"
        }],
        userMoney: [{
          required: true,
          message: "金额必须填写",
          trigger: "blur"
        }],
        multiple: [{
          required: true,
          message: "打码倍数必须填写",
          type: 'number',
          trigger: "blur"
        }],
        userName: [{
          required: true,
          message: "用户名必须填写",
          trigger: "blur"
        }],
        type: [{
          required: true,
          message: "类型必须选择",
          trigger: "blur"
        }],
      }
    }
  },
  methods: {
    siteChange(re){
      this.AutoCompleteData.siteId = re.SiteId;
      this.formKey.siteId = re.SiteId;
    },
    autoChange(re){
      if (re.userName) {
        this.formKey.userName = userName;
      }
    },
    FoudTypeChange(index){
      let key;
      if(this.formKey.role === "+"){
        key = "add";
      }else {
        key = "reduce";
      }
      let target = this.FoundsType[key][index];
      this.formKey.type = target.type;
      this.formKey.subType = target.subType;
    },
    testUserNum(e) {
      var arr = e.target.value.split(",");
      if (arr.length > 10000) {
        this.$Modal.info({
          title: "提示",
          content: "用户量太大，最多可操作一万个用户，请分批操作！"
        });
      }
    },
    submit(){
      this.$emit('submit');
    },
    reset(){
      this.$emit('submit');
    }
  }
}
</script>

