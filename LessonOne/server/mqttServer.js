/**
 * Created with JetBrains WebStorm.
 * User: youxiachai
 * Date: 13-4-25
 * Time: 上午1:58
 * To change this template use File | Settings | File Templates.
 */
var mqtt = require('mqtt')
    , util = require('util');

mqtt.createServer(function(client) {
    var self = this;
    //客户端集合
    if (!self.clients) self.clients = {};

    //监听连接请求
    client.on('connect', function(packet) {
        client.connack({returnCode: 0});
        client.id = packet.clientId;
        client.subscriptions = [];
        console.log("CONNECT: client id: " + client.id + "packet" + JSON.stringify(packet));
        self.clients[client.id] = client;

    });

    client.on('publish', function(packet) {
        //发布者本身不接受发布信息
        delete self.clients[client.id];
        //对所有连接进行一次广播
        for (var k in self.clients) {
            console.log("publish ->"+k);
            self.clients[k].publish({topic: packet.topic, payload: packet.payload});
        }
    });

    client.on('subscribe', function(packet) {
        var granted = [];
        for (var i = 0; i < packet.subscriptions.length; i++) {
            //消息Qos 级别
            granted.push(packet.subscriptions[i].qos);

        }

        console.log('subscribe->' + JSON.stringify({granted: granted}) + JSON.stringify(packet));
        client.suback({granted:granted,messageId:packet.messageId});

    });

    client.on('pingreq', function(packet) {
        util.log('pingreq!'+JSON.stringify(packet));
        client.pingresp();
    });

    client.on('unsubscribe', function(packet){
        console.log('unsubscribe!' + JSON.stringify(packet));
         client.unsubscribe();
    });

    client.on('disconnect', function(packet) {
        delete self.clients[client.id];
        util.log('disconnect!');
        client.stream.end();
    });

    client.on('close', function(err) {
        delete self.clients[client.id];
    });

    client.on('error', function(err) {
        delete self.clients[client.id];
        client.stream.end();
        console.log(err);
    });
}).listen(1883);