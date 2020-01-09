module.exports = {
    publicPath: './',
    devServer: {
        host: '0.0.0.0',
        port: 8080,   
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/mock'
                }
            }
        }
    }
}