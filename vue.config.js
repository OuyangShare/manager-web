module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://124.70.105.83:8090',
                changeOrigin: true,
                pathRewrite: { '^/api': '/' }
            }
        }
    },
};
