import App from "./App.html";
import store from './store'
import { default as Promise } from 'bluebird'

const app = new App({
  target: document.body,
  store
});

window.App = app;
window.Store = store

export default app;