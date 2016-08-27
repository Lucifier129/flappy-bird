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

function renderToDOM(state) {
	return ReactDOM.render(
	  <App state={state || store.getState()} actions={store.actions} record={record} />,
	  document.getElementById('root')
	)
}

record.setRender(renderToDOM)

store.subscribe(data => {
	let { actionType, currentState } = data

	if (actionType === 'START_PLAY') {
		record.start()
		record.save(currentState.initialState)
		playing()
		return
	}

	if (actionType === 'PLAYING' || actionType === 'FLY_UP') {
		record.save(currentState)
		renderToDOM()
		if (currentState.game.status === 'over') {
			record.finish()
			stopPlaying()
		}
		return
	}
})

let { PLAYING } = store.actions
let requestID = null
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