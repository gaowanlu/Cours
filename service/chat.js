/**
 * websocket简单在线聊天室 socket.io
 */
const http = require('http');
const fs = require('fs');

/**SSL证书 */
const OPTIONS_SSL = {
    pfx: fs.readFileSync('./linkway.site.pfx'),
    passphrase: fs.readFileSync('./keystorePass.txt'),
}

/*创建http server*/
const server = http.createServer();
const io = require('socket.io')(server);

/*消息缓存队列*/
const Message = {
    queue: [],
    store(data) {
        data.counter = Counter.add();
        this.queue.push(data);
        if (this.queue.length > 50) {
            this.queue.shift(); //大于50则删除头部元素
        }
    }
};

/**
 *计数器
 */
const Counter = {
    now: 0,
    add() {
        if (this.now > 110) {
            this.now = 0;
        }
        this.now++;
        return this.now;
    }
};

/**操作返回体 */
function createStatus(status) {
    return ({
        header: {
            status: status || 200
        }
    });
}

/*当所有用户建立连接时*/
io.on('connection', client => {
    console.log("用户创建连接");
    //为已经连接的用户注册事件
    client.on('event', data => {
        console.log("事件发生");
    });
    client.on('message', data => {
        try {
            let dataType = typeof data;
            if (dataType === 'string') {

            } else {
                client.send(createStatus(200));
                Message.store(data);
                //向所有用户广播消息
                io.emit("message", Message.queue); //会自动转json
                console.log("queue", Message.queue);
            }
        } catch (e) {
            console.log(e);
        }
    });
    client.on('disconnect', () => {
        console.log("用户断开连接");
    });
});
server.listen(5558);