/**
 * 在线聊天室服务
 * @param {*} server_talk HTTP or HTTPS node server
 * @returns 闭包函数
 */
function talkServer(server_talk) {
    return () => {
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

        /*创建服务端socket.io*/
        const io = require('socket.io')(server_talk, {
            allowEIO3: true,
            cors: {
                origin: "*", // refer
                methods: ["GET", "POST"]
            }
        });

        /*消息缓存队列*/
        const Message = {
            queue: [],
            store(data) {
                data.index = Counter.add();
                data.date = new Date().toISOString();
                this.queue.push(data);
                if (this.queue.length > 50) {
                    this.queue.shift(); //大于50则删除头部元素
                }
            }
        };

        /*当所有用户建立连接时*/
        io.on('connection', client => {
            //console.log("用户创建连接", client.id);
            client.send(Message.queue);
            //为已经连接的用户注册事件
            client.on('event', data => {
                //console.log("事件发生");
            });
            client.on('message', data => {
                try {
                    let dataType = typeof data;
                    if (dataType === 'string') {

                    } else {
                        data.id = client.id;
                        Message.store(data);
                        //向所有用户广播消息
                        io.emit("message", Message.queue); //会自动转json
                    }
                } catch (e) {
                    console.log(e);
                }
            });
            client.on('disconnect', () => {
                //console.log("用户断开连接");
            });
        });
    }
}

module.exports = talkServer;