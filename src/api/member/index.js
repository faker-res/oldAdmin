export default {
    // 会员首页
    HTTP_HuiYuanLieBiaoXinXi: '/v1/member/index', // 会员列表信息
    HTTP_ChuangJianHuiYuan: '/v1/member/create', // 新建会员
    HTTP_XiuGaiHuiYuanXinXi: '/v1/member/store', // 修改会员信息
    HTTP_HuiYuanXiangQing: '/v1/member/show', // 会员详情
    HTTP_HuiYuanQuKuanMiMaXiuGai: '/v1/member/resetPayPassword', // 重置会员取款密码
    HTTP_HuiYuanDengLuMiMaXiuGai: '/v1/member/resetPassword', // 重置会员登陆密码
    HTTP_BianJiHuiYuanBeiZhu: '/v1/member/remark', // 编辑会员备注信息
    HTTP_XiuGaiHuiYuanZhuangTai: '/v1/member/status', // 修改会员状态
    HTTP_ShanChuHuiYuan: '/v1/member/delete', // 删除会员
    HTTP_HuoQuHuiYuanDengJiRenShu: '/v1/member/getMemberLevelNums', // 指定会员等级下的具体人数
    HTTP_PiLiangXiuGaiHuiYuanDengJi: '/v1/member/batchSetLevel', // 批量修改会员等级
    HTTP_PiLiangXiuGaiFanShuiCengJi: '/v1/member/batchSetRefundBonusLevelId', // 批量修改会员返水层级
    // HTTP_PiLiangXiuGaiHuiYuanZhuangTai: '/v1/member/batchSetStatus', // 批量处理会员状态
    HTTP_PiLiangXiuGaiHuiYuanJiaJianKuan: '/v1/member/balance', // 批量修改会员加减款
    HTTP_Update_MemberLock: '/v1/member/lock', // 修改会员锁定
    HTTP_Get_MemberHistory: '/v1/member/history', // 获取会员登陆历史
    HTTP_PiLiangXiuGaiDaiLiJiaJianKuan: '/v1/agency/balance', // 批量修改会员加减款
    HTTP_HuoQuZhangHaoName: '/message/getname', // 模糊查询会员，用户Autocomplete组件
    HTTP_Update_ResetMemberSecret: '/v1/member/secret', // 重置会员密保答案
    HTTP_GetMemBerBankCardNum: '/v1/memberBank/cardNum', // 根据用户权限获取银行卡号
    HTTP_MemberPromotedAgency: '/v1/member/upgrade', // 将会员升级为代理
    HTTP_SingleMember: '/v1/reports/single-member-reports', // 单用户会员报表

    // 会员等级
    HTTP_HuiYuanDengJiLieBiao: '/v1/memberLevel/index', // 会员等级列表
    HTTP_HuiYuanDengJiXiangQing: '/v1/memberLevel/show', // 会员等级详情
    HTTP_XiuGaiHuiYuanXinXiZhuangTai: '/v1/memberLevel/status', // 修改会员等级状态
    // HTTP_ShanChuHuiYuanDengJiXinXi: '/v1/memberLevel/delete', // 删除会员等级信息 (接口关闭)
    HTTP_TianJiaHuiYuanDengJiXinXi: '/v1/memberLevel/create', // 添加一个会员等级信息
    HTTP_BianJiHuiYuanDengJiXinXi: '/v1/memberLevel/store', // 编辑会员等级信息
    HTTP_PaymentSet: '/payment_new/payment_list', // 支付设置
    HTTP_PaymentSet_Edit: '/payment_new/payment_setting', // 编辑支付设置

    // 会员银行
    HTTP_HuiYuanYinHangLieBiao: '/v1/memberBank/index', // 会员银行列表
    HTTP_TianJiaHuiYuanYinHangKa: '/v1/memberBank/create', // 添加会员银行信息
    HTTP_XiuGaiHuiYinHangZhuangTai: '/v1/memberBank/status', // 修改会员银行信息状态
    HTTP_ShanChuHuiYuanYinHangXinXi: '/v1/memberBank/delete', // 删除会员银行信息
    HTTP_ChaXunHuiYuanYinHangKa: '/v1/memberBank/memberBankList', // 查询当前会员银行卡
    HTTP_BianJiHuiYuanYinHangXinXi: '/v1/memberBank/store', // 编辑会员银行卡信息
    HTTP_XiangXiHuiYuanYinHangXinXi: '/v1/memberBank/show', // 显示一条详细会员银行信息

    // 会员返水
    HTTP_HuiYuanFanShuiLieBiao: '/v1/memberBonus/index', // 会员返水列表
    HTTP_HuiYuanFanShuiXiangQing: '/v1/memberBonus/show', // 会员返水详情
    HTTP_HuiYuanFanShuiZhuangTaiXiuGai: '/v1/memberBonus/status', // 会员返水修改信息状态
    HTTP_ChuangJianHuiYuanFanShui: '/v1/memberBonus/create', // 创建会员返水信息
    // HTTP_ShanChuHuiYuanFanShuiXinXi: '/v1/memberBonus/delete', // 删除会员返水信息
    HTTP_BianJiHuiYuanFanShuiXinXi: '/v1/memberBonus/store', // 编辑会员返水信息
    HTTP_Update_MemberRefundStatus: '/v1/member/setRefundStatus', // 快速开启关闭会员反水

    // 会员日志
    HTTP_HuiYuanRiZhiLieBiao: '/log/member', // 会员日志列表
    HTTP_HuiYuanDengLuRiZhi: '/v1/member/loginTimes', // 会员登录日志
    HTTP_HuiYuanZiJinRiZhi: '/log/member/balance', // 会员日志列表
    HTTP_HuoQuShuJuKuBiaoMing: '/database/tables' // 获取数据库表名
};
