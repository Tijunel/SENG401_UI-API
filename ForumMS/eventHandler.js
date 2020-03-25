const getPool = require('./eventDB')
const playEvent = require('./player')

//Upload an event to the Postgres database
function putEvent(event) {
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

//Get events from the Postgres database
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

module.exports = [putEvent, getAllEvents];
