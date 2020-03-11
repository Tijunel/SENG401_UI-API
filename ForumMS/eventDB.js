const { Pool } = require('pg')

const pool = null


function getPool() {
    if (!pool) {
        pool = new Pool({
            host: 'aonfeedback.cpzvldpktisu.us-east-2.rds.amazonaws.com',
            password: 'greentomato',
            database: 'events',
            user: 'postgres',
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        })
    }

    return pool
}

module.exports = getPool