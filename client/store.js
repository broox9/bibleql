import { Store } from "svelte/store";
import axios from 'axios'

const store = new Store({
  selectorTitle: "My Selector",
  bookList: [],
  currentBook: null,
});

store.compute(
  'chapters',
  ['currentBook'],
  book => book ? book.book_chapters : null
)

export default store

const bookListQuery = JSON.stringify({
  query: `{ bookList { book_id, book_name, book_chapters } }`
});

// get the bookList
axios({
  method: 'post',
  url: '/api',
  headers: { 'Content-Type': 'application/json' },
  data: bookListQuery
})
  .then(({ data: { data: bookList } }) => store.set(bookList))
  .catch(e => { console.log(e) })