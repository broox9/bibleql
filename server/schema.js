const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Book {
    book_id: Int,
    book_name: String,
    book_chapters: Int
  }
  
  type Verse {
    id: Int,
    verseid: Int,
    book: Int,
    chapter: Int,
    verse: Int,
    words: String
  }

  type Word {
    id: Int,
    verseid: Int,
    book: Int,
    chapter: Int,
    verse: Int,
    head: Int,
    clusterid: Int,
    divine: Int,
    implied: Int,
    lang_order: Int,
    paragraph: Int,
    orig_id: Int,
    notes: String,
    word: String
  }
  
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