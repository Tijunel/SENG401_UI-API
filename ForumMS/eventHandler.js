const pool = require('./eventDB')

function receive(data) {
    pool.connect((err, client, release) => {
        if (err) {
            console.log("error connecting to pool")
        }
        client.query('INSERT INTO event (event) VALUES ($1)', [JSON.stringify(data)], (err) => {
            release()
            if (err) {
                console.log(err)
            }
        })
    })
}

function getAllEvents(){
    pool.connect((err, client, release) => {
        if (err) {
            console.log("error connecting to pool")
        }
        client.query('SELECT * from event',  (err, results) => {
            release()
            if (err) {
                console.log(err)
            }
            return results;
        })
    })

}

module.exports = receive;
module.exports = getAllEvents;
