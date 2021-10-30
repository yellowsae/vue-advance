module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js', // 把main.js 改了， 就是改了入口文件的 
        },
    },
    lintOnSave: false, // 关闭语法错误提示 

    // 开启代理方式 一  
    // devServer: {
    //     proxy: 'http://localhost:8080'
    // },

    // 开启代理方式二
    devServer: {
        proxy: {
            '/api': { // 匹配 所以 以 `/api` 开头的请求路径 
                target: 'http://localhost:8080', // 代理目标的基础路径
                ws: true, // 支持开启 WebSocks
                changeOrigin: true, // 请求的 host 请求ip 是否为反向代理的 
                pathRewrite: { '^/api': '' }, // 路径重写； 匹配以api开头的路径，重写为 '' 空  
            },
        }
    }
}