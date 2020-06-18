
/**
 * @description: 获取URL的前缀
 * @param {string}
 * @return: string
 */
export const getAppURL = prefixName => {
    return process.env['VUE_APP_' + prefixName.toUpperCase()];
};