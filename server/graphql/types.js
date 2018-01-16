module.exports = `
  
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
    red: Int,
    lang_order: Int,
    paragraph: Int,
    orig_id: Int,
    notes: String,
    word: String
  }
`