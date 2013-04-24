/**
 * Created with JetBrains WebStorm.
 * User: youxiachai
 * Date: 13-4-25
 * Time: 上午2:27
 * To change this template use File | Settings | File Templates.
 */
var mqtt = require('mqtt');

var port = 1883;
var host = 'localhost';
var clientSub = mqtt.createClient(port, host);
//主题订阅
var topic = "mqtt/lessonOne";
//与服务进行连接
clientSub.on('connect', function() {
    //订阅服务器主题
    clientSub.subscribe(topic);
    //接受该主题下的发布信息
    clientSub.on('message', function(topic, message) {
        console.log(topic + ' ' + message);
        //断开连接
        clientSub.end();
    });

});