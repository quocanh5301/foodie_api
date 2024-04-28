const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'foodie',
    user: 'quocanh',
    password: 'ti532001',
    max: 5,
    connectionTimeoutMillis: 120000,
});

exports.query = async (textQuery, params) => {
    try {
        const client = await pool.connect();
        const {rows} = await client.query(textQuery, params);
        client.release(true);
        return rows;
    } catch (error) {
        console.log(error);
    }
};
