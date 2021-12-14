module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://124.70.105.83:8090',
                // target: 'http://172.17.15.86:8090',
                // 服务器
                target: 'http://10.250.60.212:8090',
                // 本地：
                // target: 'http://172.17.14.254:8090',
                changeOrigin: true,
                pathRewrite: { '^/api': '/' }
            }
        }
    },
};
