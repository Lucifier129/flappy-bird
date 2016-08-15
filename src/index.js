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
	let { key, currentState, nextState } = data

	if (key === 'START_PLAY') {
		record.start(store)
		record.save(nextState.initialState)
		return
	}

	if (key === 'PLAYING' || key === 'FLY_UP') {
		record.save(nextState)
		renderToDOM()
		if (nextState.game.status === 'over') {
			record.finish()
		}
		return
	}

	if (key === 'TIME_TRAVEL') {
		renderToDOM()
		return
	}

})

let { PLAYING } = store.actions
function playing() {
	if (!record.getRecord().isRecording) {
		PLAYING()
	}
	requestAnimationFrame(playing)
}

renderToDOM()
playing()

if ('ontouchstart' in document) {
	Fastclick.attach(document.body)
}