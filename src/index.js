import React from 'react'
import ReactDOM from 'react-dom'
import Fastclick from 'fastclick'
import App from './App'
import createStore from './store'
import initialState from './initialState'
import * as record from './record'
import './css/index.css'

let state = {
	initialState: {...initialState},
	...initialState,
}

let store = createStore(state)

function renderToDOM() {
	return ReactDOM.render(
	  <App state={store.getState()} actions={store.actions} record={record} />,
	  document.getElementById('root')
	)
}

store.subscribe(data => {
	let { key, nextState } = data

	if (key === 'START_PLAY') {
		record.start(store)
		record.save(nextState.initialState)
		playing()
		return
	}

	if (key === 'PLAYING' || key === 'FLY_UP') {
		record.save(nextState)
		renderToDOM()
		if (nextState.game.status === 'over') {
			record.finish()
			stopPlaying()
		}
		return
	}

	if (key === 'TIME_TRAVEL') {
		renderToDOM()
		return
	}

})

let { PLAYING } = store.actions
let requestID = 0
function playing() {
	requestID = requestAnimationFrame(playing)
	PLAYING()
}
function stopPlaying() {
	cancelAnimationFrame(requestID)
}

renderToDOM()

if ('ontouchstart' in document) {
	Fastclick.attach(document.body)
}