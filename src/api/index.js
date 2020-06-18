
import axios from 'axios';
import { getAppURL } from '@/commons/utils';

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
    function(config) {
        config.timeout = 60000;
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

/**
 * 接口处理
 * @param resp
 * @param resolve
 */
function successHandler(resp, resolve) {
    if (resp.request.responseType === 'arraybuffer') {
        resolve(resp);
    } else {
        if (resp.data.code === 0 || resp.config.passErr) {
            resolve(resp.data);
        } else {
            errorHandler(resp);
        }
    }
}

/**
 * 错误接口处理
 * @param resp
 */
function errorHandler(resp) {
    console.log(resp);
}

/**
 * 为全局对象Vue绑定$request函数
 * @param item
 * @returns {*}
 */
export const fetch = item => {
    return new Promise(resolve => {
        axios(item)
            .then(resp => {
                successHandler(resp, resolve);
            })
            .catch(err => {
                errorHandler(err.response);
            });
    }).finally(() => {
    });
};

export const server = getAppURL('SERVE');

