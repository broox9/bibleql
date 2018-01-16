const dbClient = require('../db')

const rootValue = {
  /* = Whole Verse Queries */
  chapter: ({ book = 1, chapter = 1 }) => {
    //default is Genesis ch 1
    return dbClient.query(
      `SELECT * FROM public.bible_en_verses WHERE book = ${book} AND chapter = ${chapter}`
    )
      .then(res => res.rows)
      .catch(e => console.log(e))
  },

  passage: ({ startId = 5004004, endId = 5004009 }) => {
    //default is the Shema (Deut 6:4-9)
    return dbClient.query(
      'SELECT * FROM public.bible_en_verses WHERE verseid BETWEEN $1 AND $2',
      [startId, endId]
    )
      .then(res => res.rows)
      .catch(e => console.log(e))
  },

  verse: ({ verseid = 42001001 }) => {
    //default is John 1:1
    return dbClient.query(
      'SELECT * FROM public.bible_en_verses WHERE verseid = $1', [verseid]
    )
      .then(res => res.rows[0])
      .catch(e => console.log(e))
  },

  /* = Single Word Queries */
  wordChapter: ({ book = 1, chapter = 1 }) => {
    //default is Genesis ch 1
    return dbClient.query(`
      SELECT * FROM public.bible_en
      WHERE book = $1 AND chapter = $2 AND NOT (lang_order = 0 AND clusterid > 1)
      ORDER BY id ASC`, [book, chapter]
    )
      .then(res => res.rows)
      .catch(e => console.log(e))
  },

  wordPassage: ({ startId = 5004004, endId = 5004009 }) => {
    //default is the Shema (Deut 6:4-9)
    return dbClient.query(`
      SELECT * FROM public.bible_en
      WHERE verseid BETWEEN $1 AND $2 AND lang_order > 0
      ORDER BY lang_order ASC`,
      [startId, endId]
    )
      .then(res => res.rows)
      .catch(e => console.log(e))
  },

  wordVerse: ({ verseid = 42001001 }) => {
    //default is John 1:1
    return dbClient.query(`
      SELECT * FROM public.bible_en
      WHERE verseid = $1 AND lang_order > 0
      ORDER BY lang_order ASC`, [verseid]
    )
      .then(res => res.rows)
      .catch(e => console.log(e))
  },

  bookList: () => {
    return dbClient.query(
      `SELECT * FROM public.book_data`
    )
      .then(res => res.rows)
      .catch(e => console.log(e))
  },

  bookInfo: ({ book_id = 0, book_name = '' }) => {
    return dbClient.query(
      `
      SELECT * FROM public.book_data
      WHERE book_name = '${book_name}' 
      OR book_id = ${book_id}
    `
    )
      .then(res => res.rows[0])
      .catch(e => console.log(e))
  }
}

module.exports = rootValue;