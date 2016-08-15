// recorder
function getInitialRecord() {
    return {
        start: 0,
        end: 0,
        history: [],
        isRecording: false,
        store: null,
    }
}

let record = getInitialRecord()

export function getRecord() {
	return record
}

export function start(store) {
	record = getInitialRecord()
	record.store = store
	record.start = Date.now()
}

export function finish() {
	record.end = Date.now()
}

export function save(state) {
	if (record.end) {
		return
	}
	record.history.push(state)
}

export function replay() {
	let { start, end, history, store } = record
	let { replaceState, getState } = store
	let currentState = getState()
	let key = 'TIME_TRAVEL'
	let count = 0
	let read = () => {
		if (count >= history.length) {
			record.isRecording = false
			replaceState(currentState, null, {
				key,
				currentState,
				nextState: currentState,
			})
			return
		}
		let nextState = history[count]
		let data = {
			key,
			currentState,
			nextState,
		}
		replaceState(nextState, null, data)
		count += 1
		requestAnimationFrame(read)
	}

	record.isRecording = true

	read()
}

export function reverse() {
	let { start, end, history, store } = record
	let { replaceState, getState } = store
	let currentState = getState()
	let key = 'TIME_TRAVEL'
	let count = 0
	let read = () => {
		if (count >= history.length) {
			replaceState(currentState, null, {
				key,
				currentState,
				nextState: currentState,
			})
			record.isRecording = false
			return
		}
		let nextState = history[history.length - 1 - count]
		let data = {
			key,
			currentState,
			nextState,
		}
		replaceState(nextState, null, data)
		count += 1
		requestAnimationFrame(read)
	}

	record.isRecording = true

	read()
}