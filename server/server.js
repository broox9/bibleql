const express = require('express')
// const ejs = require('ejs')
const path = require('path')
const { createServer } = require('http')
const graphqlHTTP = require('express-graphql')

const publicPath = path.resolve(__dirname, '../public')

const schema = require('./graphql/schema')
const rootValue = require('./graphql/resolvers')

const server = express()

server.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}))

server.use('/api', graphqlHTTP({
  schema,
  rootValue,
}))

server.use('/', express.static(publicPath))

server.listen(9000)