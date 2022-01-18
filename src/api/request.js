import axios from 'axios';
import { Toast } from 'vant';
import { BASEURL } from "@/api/ApiConfig";

/**
 * 获取localSorage对应字段
 * @param {String} properName
 */
const getValue = properName => localStorage.getItem(properName)

const service = axios.create({
    baseURL: BASEURL,
    timeout: 60 * 1000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});

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

service.interceptors.request.use(
    config => {
        let token = getValue("token");
        let openId = getValue("openId");
        // token = "hDYS6jCGZ4EyYfKYw2gjPIaDJ-RlTXmDE6HguO2PNTYIR2NArNfvI5GbGsRzB6D1CqBsT611Awo2J-bG5oyl5g"
        // let openId = "omfiywkXVT-1OL5hlq2Q5huc-5CA";
        let target = { openId,systemcode:"GD",accountType:"XJ",token, waterCorpId: 3, UNID: '', areaId: 0, apiType: 'JSAPI', appVersion: '1.0.2',clientType:"iOS",htmlVersion:"1.0.4", }
        let params = Object.assign(config.params, target)
        config.params = {
            requestPara: params
        }
        startLoading()
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// service
service.interceptors.response.use(
    response => {
        endLoading()
        return response.data;
    },
    error => {
        endLoading()
        if (!error.response) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default service;
