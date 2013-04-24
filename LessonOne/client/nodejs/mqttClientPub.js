/**
 * Created with JetBrains WebStorm.
 * User: youxiachai
 * Date: 13-4-25
 * Time: 上午2:01
 * To change this template use File | Settings | File Templates.
 */

var mqtt = require('mqtt');

//主题
var topic = "mqtt/lessonOne";
var port = 1883;
var host = 'localhost';
var client = mqtt.createClient(port, host);
client.on('connect', function() {
    //对相关主题进行消息发布
    client.publish(topic, '大家好!');
    client.end();
});