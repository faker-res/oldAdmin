export default {
    // 公共接口
    HTTP_Login: '/admin/login', // 登录接口
    HTTP_Token: '/auth/token', // token接口
    
    HTTP_Rules: '/menu',//获取导航节点
    HTTP_V1WebSocket: '/v1/public/websocket', /// v1/websocket
    HTTP_GongGaoLieBiao: '/notice/index', // 公告列表
    HTTP_HeiMingDanLieBiao: '/iplimit/index', // 黑名单列表
    HTTP_CaiPiaoLieBiao: '/lottery/getList', // 彩种列表
    HTTP_ZhanDianLieBiao: '/v1/public/site', // 站点列表，公共接口
    HTTP_WebsiteList: '/system/index', // 站点列表（带分页）
    
    HTTP_SiteIdHuoQuGongGongDengJi: '/v1/public/level', // 根据站点id获取代理/返水/会员等级
    HTTP_SiteIdHuoQuDaiLiDengJiLieBiao: 'v1/agencyLevel/sitelevel', // 根据站点id获取代理等级
}