const pool = require('./eventDB')

function receive(data) {
    pool.connect((err, client, release) => {
        if (err) {
            return -1
        }
        client.query('INSERT INTO event (event) VALUES $1', [data], (err) => {
            release()
            if (err) {
                return -1
            }
        })
    })
}

module.exports = receive;
