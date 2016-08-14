import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import createStore from './store'
import initialState from './initialState'
import record from './record'
import './css/index.css'

let state = {
	initialState: {...initialState},
	...initialState,
}

let store = createStore(state)

let { PLAYING } = store.actions

function render() {
	PLAYING()
	ReactDOM.render(
	  <App state={store.getState()} actions={store.actions} record={record} />,
	  document.getElementById('root')
	)
	requestAnimationFrame(render)
}
render()