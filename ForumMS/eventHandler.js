const pool = require('./eventDB')

function receive(data) {
    pool.connect()
        .then(client => {
            client.query("INSERT INTO event (event) VALUES $1", [data])
                .catch(error => {
                    return -1
                })
        })
        .catch(error => {
            return -1
        })
}

module.exports = receive;
