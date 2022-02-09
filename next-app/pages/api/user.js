//关于API路由 next也是为它们的vercel的云函数服务做准备的
export default function handler(req, res) {
    console.log(req.query);
    /**
     支持使用req.cookies req.query req.body
     */
    res.status(200).json({
        name: 'John Doe',
        query: req.query
    })
    // res.redirect([307] path)
}
//自定义配置 该api object作用于所有api路由
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
            // bodyParser: false,
            bodyParser: {
                sizeLimit: '500kb'
            },
            externalResolver: true,
        },
    },
}