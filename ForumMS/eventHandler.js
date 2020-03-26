const pool = require('./eventDB')
const playEvent = require('./player')

function putEvent(event) {
    let jsonEvent = JSON.stringify(event)
    pool.connect((err, client, release) => {
        if (err) {
            console.log("error connecting to RDS.");
            return -1;
        }
        client.query('INSERT INTO event (event) VALUES ($1)', [jsonEvent], (err) => {
            release()
            if (err) {
                console.log(err)
                return -1;
            }
            playEvent(event);
        });
    });
}

//Get events from the Postgres database
function getAllEvents(){
    pool.connect((err, client, release) => {
        if (err) {
            console.log("Error connecting to RDS.");
            return -1;
        }
        client.query('SELECT * from event',  (err, results) => {
            release();
            if (err) {
                console.log(err);
                return -1;
            }
            return results;
        });
    });
}

module.exports = [putEvent, getAllEvents];
