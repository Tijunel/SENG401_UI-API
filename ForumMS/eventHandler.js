const pool = require('./eventDB');
const playEvent = require('./player');
const redisClient = require('./redisEnv')[0];

function putEvent(event) {
    let jsonEvent = JSON.stringify(event)
    pool.connect((err, client, release) => {
        if (err) { return -1; }
        client.query('INSERT INTO event (event) VALUES ($1)', [jsonEvent], (err) => {
            release();
            if (err) { return -1; }
            playEvent(event);
        });
    });
}

function createRedisDataInstance() {
    pool.connect((err, client, release) => {
        if (err) { return -1; }
        client.query('SELECT * from event', (err, results) => {
            release();
            if (err) { return -1; }
            redisClient.flushdb( function (err, succeeded) {});
            for(event of results.rows) {
                playEvent(event.event)
            }
            console.log('Redis Database populated with events!')
        });
    });
}

module.exports = [putEvent, createRedisDataInstance];
