const { Client, Pool } = require('pg')
const path = require('path')

console.log('env', process.env.CREDENTIALS_PATH)
const creds_path = path.join(process.env.CREDENTIALS_PATH, 'db.json')
console.log('path', creds_path)
const { bibleql } = require(creds_path)
const dbcreds = process.env.NODE_ENV === "production" ? bibleql.aws : bibleql.local;
const { host, pwd, user, db } = dbcreds

// const opts = 'postgres://postgres:deploy@localhost:5432/bible_api'
const opts = {
  host,
  user,
  port: 5432,
  password: pwd,
  database: db,
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