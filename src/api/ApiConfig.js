/**
 * 获取baseUrl
 * import.meta.env.MODE 为vite获取环变量方式
 * @returns 
 */
 const BASE = () => {
    return import.meta.env.MODE === 'development' ? "/api" : "http://service.fjlyzls.com"
}
export const BASEURL = BASE();

export const GETMETERLIST = "/iwater/v1/watermeter/queryUserMeterList/v1.json"

//获取表单渲染数据
export const GETFORMINFO = "/iwatermgr/transactBusiness/nt/getFormInfo.json"

// 获取价格费用
export const GETPRICE = "/iwatermgr/transactBusiness/calculateWaterFee.json"

// 支付下单
export const MARKORDER = '/iwater/v1/watermeter/makeWaterFeeOrder/v2.json';

// 唤起支付
export const PAY = '/iwater/v1/pay/nt/getPayRequestInfo/v3.json'

// 检查支付状态
export const CHECKORDERSTATUS = "/iwater/v1/shop/checkOrderStatus/v2.json"

export const CREATE = "/iwatermgr/transactBusiness/nt/create.json"