const getPool = require('./eventDB')
const playEvent = require('./player')

function receive(event) {
    pool.connect((err, client, release) => {
        if (err) {
            return -1
        }
        client.query('INSERT INTO event (event) VALUES $1', [event], (err) => {
            release()
            if (err) {
                return -1
            }

            playEvent(event)

        })
    })
}

module.exports = receive;
