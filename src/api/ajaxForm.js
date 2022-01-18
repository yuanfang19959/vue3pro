import axios from 'axios'
import { BASEURL } from "@/api/ApiConfig";
import { Toast } from 'vant';

Toast.allowMultiple();
function startLoading() {
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
    });
}
function endLoading() {
    Toast.clear()
}

/**
 * 获取localSorage对应字段
 * @param {String} properName
 */
 const getValue = properName => localStorage.getItem(properName)

export const ajaxForm = (config) => {
  let param = null
  if (config.base !== undefined) {
    if (config.params === undefined || config.params === null) {
      param = {
        requestPara: JSON.stringify(config.params)
      }
    } else {
      let token = getValue("token");
      let openId = getValue("openId");
      // token = "hDYS6jCGZ4EyYfKYw2gjPIaDJ-RlTXmDE6HguO2PNTYIR2NArNfvI5GbGsRzB6D1CqBsT611Awo2J-bG5oyl5g"
      // let openId = "omfiywkXVT-1OL5hlq2Q5huc-5CA";
      let target = { openId,systemcode:"GD",accountType:"XJ",token, waterCorpId: 3, UNID: '', areaId: 0, apiType: 'JSAPI', appVersion: '1.0.2',clientType:"iOS",htmlVersion:"1.0.4", }
      Object.assign(config.params, target)
      if (config.type === 'get') {
        param = {
          requestPara: JSON.stringify(config.params)
        }
      } else {
        param = `requestPara=${JSON.stringify(config.params)}`
        param = param.replace(/\+/g, "%2B");
        param = param.replace(/\&/g, "%26");
      }
    }
  } else {
    param = config.param
  }

  let configObj = {
    method: config.type || 'get',
    baseURL: BASEURL,
    url: config.url,
    responseType: config.resType || 'json',
    timeout: 500000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: config.withCredentials || false,
    progress: function (progressEvent) {
      // 做任何你想做的关于进度的事
    }
  }
  if (config.type === 'get') {
    configObj['params'] = param || {}
  } else {
    configObj['data'] = param || {}
  }
  startLoading()
  axios(configObj)
    .then(res => {
      endLoading()
      if (res.status === 200) {
          config.successFn(res.data, res)
      }
    })
    .catch(e => {
      endLoading()
      config.failFn(e)
    })
}