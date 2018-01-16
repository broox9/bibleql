import { Store } from "svelte/store";
import axios from 'axios'

const store = new Store({
  bookList: [],
  currentBook: null,
  currentChapter: null,
  chapterData: [],
  wordChapterData: []
});

store.compute(
  'chapters',
  ['currentBook'],
  book => book ? book.book_chapters : null
)

store.compute(
  'currentBookName',
  ['currentBook'],
  book => book ? book.book_name : ''
)

store.onchange((state, changed) => {
  if (changed.currentChapter) {
    // fetchChapter(state.currentBook.book_id, state.currentChapter)
    fetchWordChapter(state.currentBook.book_id, state.currentChapter)
  }
})

export default store

const bookListQuery = JSON.stringify({
  query: `{ bookList { book_id, book_name, book_chapters } }`
});


/* = MOVE THESE AND REFACTOR */
// get the bookList
axios({
  method: 'post',
  url: '/api',
  headers: { 'Content-Type': 'application/json' },
  data: bookListQuery
})
  .then(({ data: { data: bookList } }) => store.set(bookList))
  .catch(e => { console.log(e) })


// get the chapter
function fetchChapter(book, chapter) {
  const queryObject = {
    query: `{ chapter(book: ${book}, chapter: ${chapter}) { verseid, verse, words }}`
  }

  axios({
    method: 'post',
    url: '/api',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(queryObject)
  })
    .then(({ data: { data: chapter } }) => {
      store.set({ chapterData: chapter.chapter })
    })
    .catch(e => { console.log(e) })
}

function fetchWordChapter(book, chapter) {
  const queryObject = {
    query: `{ wordChapter(book: ${book}, chapter: ${chapter}) { verse, word, divine, implied, red, head, clusterid, lang_order }}`
    // query: `{ wordPassage(startId: 43003001, endId: 43003019) { verse, word }}`
  }

  axios({
    method: 'post',
    url: '/api',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(queryObject)
  })
    .then(resp => {

      const wordChapterData = resp.data.data.wordChapter
      store.set({ wordChapterData })
      console.log('RESP', resp.data)
    })
    .catch(e => { console.log(e) })
} 