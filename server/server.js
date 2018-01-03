const express = require('express')
const { createServer } = require('http')
const graphqlHTTP = require('express-graphql')

const schema = require('./schema')
const rootValue = require('./resolvers')

const server = express()
server.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}))

server.listen(9000)