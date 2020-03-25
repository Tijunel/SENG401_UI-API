const redis = require('redis')
const { PORT, HOST } = require('./redisEnv')

const client = redis.createClient({
    port: PORT,
    host: HOST
});

client.on('connect', () => {
    console.log('Redis client connected');
})

client.on('error', (err) => {
    console.log('Redis client could NOT connect: \n' + err);
});

function playEvent(event) {
    client.rpush(event.parentID, event.ID, (err, reply) => {
        if (err) {
            console.log("Could not play event: \n\n" + event);
            return;
        }
        client.set('content-' + event.ID, event.content, (err, reply) => {
            if (err) {
                console.log("Could not set content when playing event: \n\n" + event)
                return;
            }
        });
    });
}

modules.export = playEvent;