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

export const GETPRICE = "/iwatermgr/transactBusiness/calculateWaterFee.json"