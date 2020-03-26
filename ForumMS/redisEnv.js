const redis = require('redis');
const asyncRedis = require("async-redis");

const PORT = 6379
const HOST = 'localhost';

const client = redis.createClient({
    port: PORT,
    host: HOST
});

client.on('connect', () => {
    console.log('Command-Side (Player) Redis client connected');
});

client.on('error', (err) => {
    console.log('Redis client could NOT connect: \n' + err);
});

const asyncClient = asyncRedis.createClient({
    port: PORT,
    host: HOST
});

asyncClient.on('connect', () => {
    console.log('Command-Side (Player) Redis client connected');
});

asyncClient.on('error', (err) => {
    console.log('Redis client could NOT connect: \n' + err);
});

module.exports = [client, asyncClient];