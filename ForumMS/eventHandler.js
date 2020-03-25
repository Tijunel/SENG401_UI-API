const getPool = require('./eventDB')
const playEvent = require('./player')

function receive(event) {
    pool.connect((err, client, release) => {
        if (err) {
            console.log("error connecting to pool");
            return;
        }
        client.query('INSERT INTO event (event) VALUES $1', [event], (err) => {
            release();
            if (err) {
                console.log(err);
                return;
            }
            playEvent(event);
        });
    });
}

function getAllEvents(){
    pool.connect((err, client, release) => {
        if (err) {
            console.log("error connecting to pool");
            return;
        }
        client.query('SELECT * from event',  (err, results) => {
            release();
            if (err) {
                console.log(err);
                return;
            }
            return results;
        });
    });
}

module.exports = receive;
module.exports = getAllEvents;
