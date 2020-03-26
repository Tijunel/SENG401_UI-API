const pool = require('./eventDB')
const playEvent = require('./player')

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

//Get events from the Postgres database -- This does not work
function getAllEvents() {
    pool.connect((err, client, release) => {
        if (err) { return -1; }
        client.query('SELECT * from event', (err, results) => {
            release();
            if (err) { return -1; }
            console.log(results.rows)
            return results; //This does not actually return the results from the function, it returns for the callback
            //Play all events
        });
    });
}

console.log(getAllEvents())

module.exports = [putEvent, getAllEvents];
