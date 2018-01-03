const { Client, Pool } = require('pg')

// const opts = 'postgres://postgres:deploy@localhost:5432/bible_api'
const opts = {
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'deploy',
  database: 'bible_api',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
}

const pgClient = new Pool(opts)

pgClient.connect()
  .then(client => {
    console.log('**pg client connected**')
  })
  .catch(e => {
    console.log(e);
    throw new Error(e);
  })

module.exports = pgClient