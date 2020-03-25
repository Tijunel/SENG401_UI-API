const redis = require('redis')
const { PORT, HOST } = require('./redisEnv')

const client = redis.createClient({
    port: PORT,
    host: HOST
})

client.on('connect', () => {
    console.log('Command-Side (Player) Redis client connected')
})

client.on('error', (err) => {
    console.log('Redis client could NOT connect: \n' + err)
})

function playEvent(event) {
    let action = event.command.split(" ")[0]
    if(action === "create") { createEvent(event) }
    //add other actions like delete here

}

function createEvent(event) {
    client.rpush(event.parentID, event.ID, (err, reply) => {
        if (err) {
            console.log("Could not play event: \n\n" + event)
            return
        }

        client.set('content-' + event.ID, event.content, (err, reply) => {
            if (err) {
                console.log("Could not set content when playing event: \n\n" + event)
            }
        })

    })
}


module.exports = playEvent

// id: [children]
// content-id: "content"
