const { buildSchema } = require('graphql')

const types = require('./types')

const schema = buildSchema(`

  ${types}
  
  type Query {
    chapter(book: Int!, chapter: Int!): [Verse],
    passage(startId: Int, endId: Int): [Verse],
    verse(verseid: Int!): Verse,
    wordChapter(book: Int!, chapter: Int!): [Word],
    wordPassage(startId: Int, endId: Int): [Word],
    wordVerse(verseid: Int!): [Word],
    bookList: [Book],
    bookInfo(book_name: String, book_id: Int): Book
  }
`)

module.exports = schema