# 桂电课程表 (Cours Web)   

关键词:Cours桂电课程表\ios支持,简单易用的桂电课表应用Web方案.  
相关技术:react\node\socketio soon...  
使用方式 `ios/ipad:webclip` 或 `Browser`    
预览 https://cours.vercel.app   

### 前端构建  
create-react-app 项目  
```shell
$ npm install  
$ npm start 
$ npm run build
```

### 运行代理服务|聊天室服务

```shell
$ npm install pm2 -g  
$ cd ./service  
$ pm2 start cours.js  
$ pm2 list  
$ pm2 monit  
 ```   

#### API  

##### 更新数据  

地址 `https://{}:5557/` Content-Type `appliction/json`  
我们默认提供免费的服务 https://linkway.site:5557    
测试账号 账号:"0" 密码:"0"  

 ```json
{
    "username":"学号",
    "password":"智慧校园密码"
}
 ```  

##### 聊天室  

基于SocketIO  
地址 `https://{}:5558`   
我们默认提供免费的服务 https://linkway.site:5558  


```javascript
//接收监听
socket.on("message", (data) => {
  recev(data);
});
//发送消息
socket.send({
    info:'输入的内容'
});
```

接收数据格式 array max-length=110  
```json
[
    {
        "info":"我来了",
        "id":"sKB7VmVHCMG-JNpiAAJJ",
        "index":3,
        "date":"2022-01-30T13:51:40.880Z"
    },
    {
        "info":"我来了",
        "id":"sKB7VmVHCMG-JNpiAAJJ",
        "index":3,
        "date":"2022-01-30T13:51:40.880Z"
    }
]
```
##### rtmp视频推流  
推流地址  
```shell
rtmp://127.0.0.1:1935/live/cliver
```
flv直播流  
```shell
https://{}:5557/live.flv  
```

##### 在线服务声明  

* 代理工具node项目 在 `service` 文件夹下
* 本项目不不承担任何责任、使用者后果自付。  
* 如有侵犯您的权益请及时联系我们。
* 我们不会在服务器保存您的任何信息与操作记录。  
* 代理请求服务器监听端口为5557 聊天室服务端口5558  

### WebClip  
下载地址 https://wwu.lanzout.com/iROctz04qch  
密码 `cours`   

<img src="readme/images/WebClipQR.png" width="20%"/>



### 兼容性   
本项目起因也是作者自己使用ios无处寻找、哎 那就自己写一个吧。关于ios方面，校方暂无应用支持。目前由个人开发者提供的Android版本、则ios、ipadOS使用则较为不方便。为了个人使用方便等 开发此应用。本作者没有mac、使用的`ipad Air 3`、`iPhone SE2`。如果出现界面兼容问题欢迎您提交issue或者改进它。在您的Apple设备上安装webClip下的描述文件。  \ `安卓`可能会构建webview项目  \  `网页版`后续推出  




### 贡献  

如果您对此项目感兴趣、非常欢迎您进行技术交流、以及共同改进。

### 联系我们  

地址:桂林电子科技大学 花江校区  
邮箱:heizuboriyo@gmail.com  


