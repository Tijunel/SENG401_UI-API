const client = require('./redisEnv')[0];

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
        for (const event of results) {
            deleteEvent(event); 
        }
        client.get('EventParent-' + eventID, (err, result) => {
            if(!result) { return -1; }
            client.lrem(result.toString(), 1, eventID); 
            client.del('EventContent-' + eventID);
            client.del('EventParent-' + eventID);
        });
    });
}

module.exports = playEvent
