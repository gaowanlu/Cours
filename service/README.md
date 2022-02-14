# Cours Service  

cours 后台服务，声明:本项目开发人员不承担任何责任、如有侵犯您的权益请及时联系我们。

## 部署  

* MySQL  

```sql
请见 ./dao/init.sql  
```

* 运行代理服务|聊天室服务

```shell
npm install pm2 -g  
cd ./service  
pm2 start cours.js  
pm2 list  
pm2 monit  
 ```

#### API  

##### 更新数据  

地址 `https://{}:5557/` Content-Type `appliction/json`  
我们默认提供免费的服务 <https://linkway.site:5557>
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
我们默认提供免费的服务 <https://linkway.site:5558>  

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
