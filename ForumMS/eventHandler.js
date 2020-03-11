const getPool = require('./eventDB')

function receive(data) {
    getPool().connect()
        .then(client => {
            client.query("INSERT INTO event (event) VALUES $1", [data])
                .catch(error => {
                    return -1
                })
                client.release();
        })
        .catch(error => {
            return -1
        })
}

module.exports = receive;
