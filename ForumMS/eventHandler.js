const pool = require('./eventDB')
const playEvent = require('./player')

function receive(event) {

    let jsonEvent = JSON.stringify(event)

    pool.connect((err, client, release) => {
        if (err) {
            console.log("error connecting to pool");
            return;
        }
        client.query('INSERT INTO event (event) VALUES ($1)', [jsonEvent], (err) => {
            release()
            if (err) {
                //console.log("Error storing event:")
                console.log(err)
                return -1
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


module.exports = receive;
