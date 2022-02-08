const path = require('path')
/*nextjs config info*/
module.exports = {
    /*sass需要扫描编译的目录 /styles/* */
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    /*远程请求图片资源域*/
    images: {
        domains: ['linkway.site'],
    },
    //  optimizeFonts: false, 是否允许next 优化font
}