const redis = require('redis')
const { PORT, HOST } = require('./redisEnv')

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

function playEvent(event) {
    let action = event.command.split(" ")[0];
    if(action === "create") { createEvent(event); }
    else { deleteEvent(event.ID); }
}

function createEvent(event) {
    client.rpush(event.parentID, event.ID, (err, reply) => {
        if (err) { return -1; }
        client.set('EventContent-' + event.ID, event.content, (err, reply) => {
            if (err) { return -1; }
        });
        client.set('EventParent-' + event.ID, event.parentID, (err, reply) => {
            if (err) { return -1; }
        });
    });
}

function deleteEvent(eventID) {
    client.lrange(eventID, 0, -1, (err, results) => {
        if (err) { return -1; }
        if (results.length === 0) { //base case
            client.get('EventParent-' + eventID, (err, result) => {
                client.lrem(result.toString(), 1, eventID); //Remove event from parent's children
                client.del('EventContent-' + eventID);
                client.del('EventParent-' + eventID);
            });
        }
        for (const event of results) {
            deleteEvent(event); 
        }
    });
}

module.exports = playEvent
