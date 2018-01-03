const { createServer } = require('http');
const postgraphql = require('postgraphql').postgraphql;

const pgGraphqlOpts = {
  graphiql: true,
  graphqlRoute: '/gql',
  // graphiqlRoute: 'g'
}
const pgConfig = 'postgres://postgres:deploy@localhost:5432/bible_api'

createServer(postgraphql(pgConfig, 'public', pgGraphqlOpts)).listen(9000)