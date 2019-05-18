export default{
    // 代理首页
    HTTP_DaiLiLieBiao: '/v1/agency/index', // 代理列表
    HTTP_DaiLiZhuangTaiXiuGai: '/v1/agency/status', // 代理状态修改
    HTTP_ChuangJianDaiLi: '/v1/agency/create', // 新建代理
    // HTTP_ShanChuDaiLiXinXi: '/v1/agency/delete', // 删除代理信息（下线）
    HTTP_BianJiDaiLiXinXi: '/v1/agency/store', // 编辑代理信息
    HTTP_DaiLiXiangQing: '/v1/agency/show', // 代理资料详情

    HTTP_Get_AgencyTree: '/v1/agency/tree', // 获取代理树
    HTTP_Get_AgencyMemberLevelCount: '/v1/agency/getAgencyLevelNums', // 获取代理下的会员等级人数
    HTTP_ZhanDianFanShuiSheZhi: '/v1/agency/column', // 代理反水配置
    HTTP_DaiLiZiDuanMoHuChaXun: '/ageny/like', // 代理字段模糊查询
    HTTP_PiLiangXiuGaiDaiLiJiaJianKuan: '/v1/agency/balance', // 批量修改会员加减款

    // 代理等级
    HTTP_DaiLiCengJiLieBiao: '/v1/agencyLevel/index', // 代理等级列表
    HTTP_DaiLiDengJiZhuangTai: '/v1/agencyLevel/status', // 代理等级状态
    HTTP_ShanChuDaiLiCengJi: '/v1/agencyLevel/delete', // 删除代理等级
    HTTP_TianJiaDaiLiCengJi: '/v1/agencyLevel/create', // 添加代理等级
    HTTP_BianJiDaiLiCengJi: '/v1/agencyLevel/store', // 编辑代理等级
    HTTP_XianShiDaiLiCengJiXiangQing: '/v1/agencyLevel/show', // 显示一个代理等级的详情
    HTTP_HuoQuDaiLiSuoYouYinHangKa: '/v1/member/getMemberUserName', // 根据userName获取其下所有银行卡
    HTTP_YanZhengShangJiDaiLiHuiYuan: '/v1/agency/changeCheck', // 验证上级代理会员数

    HTTP_PiLiangXiuGaiDaiLiDengJi: '/api/v1/agency/batchSetLevel', // 批量修改代理等级
    // HTTP_PiLiangXiuGaiDaiLiZhuangTai: '/api/v1/agency/batchSetStatus', // 批量修改代理状态

    // 代理银行
    // HTTP_DaiLiYinHangKaLieBiao: '/v1/agencyBank/index', // 代理银行卡列表（下线）
    HTTP_DaiLiYinHangKaZhuangTai: '/v1/agencyBank/status', // 代理银行卡status ; yes or no
    HTTP_ShanChuDaiLiYinHangKa: '/v1/agencyBank/delete', // 删除代理银行卡
    HTTP_TianJiaDaiLiYinHangXinXi: '/v1/agencyBank/create', // 添加一个代理银行信息
    HTTP_BianJiDaiLiYinHangXinXi: '/v1/agencyBank/store', // 编辑代理银行信息
    HTTP_DaiLiYinHangKaXiangXiXinXi: '/v1/agencyBank/show', // 一张银行卡的详细信息

    // 代理审核
    HTTP_DaiLiShenHeLieBiao: '/v1/memberApply/index', // 代理审核列表
    HTTP_DaiLiShenHeShanChu: '/v1/memberApply/delete', // 删除审核信息
    HTTP_DaiLiShenHeXiangQing: '/v1/memberApply/show', // 代理审核详情
    HTTP_DaiLiShenHeTongGuo: '/v1/memberApply/apply', // 代理审核通过

    // 代理域名
    HTTP_DaiLiYuMingLieBiao: '/v1/agencyDomain/index', // 代理域名列表
    HTTP_DaiLiYuMingZhuangTai: '/agencyDomain/status', // 代理域名状态
    HTTP_ShanChuDaiLiYuMing: '/v1/agencyDomain/delete', // 删除代理域名
    HTTP_TianJiaDaiLiYuMing: '/v1/agencyDomain/create', // 添加代理域名
    HTTP_BianJiDaiLiYuMing: '/v1/agencyDomain/store', // 编辑代理域名
    HTTP_DaiLiYuMingXiangXiXinXi: '/v1/agencyDomain/show', // 显示某个代理域名的详细信息
    HTTP_Insert_BatchShareholderDomain: '/v1/agencyDomain/batch', // 批量添加大股东域名
    HTTP_Update_DomainStatus: '/v1/agencyDomain/status', // 更新代理域名状态
    HTTP_Update_DomainAdminStatus: '/v1/agencyDomain/updateAdminStatus', // 更新代理域名冻结状态

    // 代理日志
    HTTP_DaiLiRiZhi: '/log/agency', // 代理日志
    HTTP_DaiLiZiJinRiZhi: '/log/agency/balance', // 代理资金日志

    // 代理分红
    HTTP_Count_agencyBonus: '/lottery/agencyShare', // 计算代理分红

    // 代理佣金
    HTTP_DaiLiYongJinTiQuJiLu: '/agency/withdrawals', // 代理佣金提取记录
    HTTP_DaiLiYongJinShenHe: '/agency/withdrawals/audit' // 代理佣金审核
};
