const pool = require('./eventDB')
const playEvent = require('./player')

function receive(event) {

    let jsonEvent = JSON.stringify(event)

    pool.connect((err, client, release) => {
        if (err) {
            return -1
        }
        client.query('INSERT INTO event (event) VALUES ($1)', [jsonEvent], (err) => {
            release()
            if (err) {
                //console.log("Error storing event:")
                console.log(err)
                return -1
            }

            playEvent(event)

        })
    })
}


module.exports = receive;
