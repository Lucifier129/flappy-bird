
function getInitialRecord() {
    return {
        start: 0,
        end: 0,
        history: [],
    }
}

let record = getInitialRecord()

export function reset() {
	record = getInitialRecord()
}

export function save(state) {
	record.history.push(state)
}

export function start() {
	record.start = Date.now()
}

export function finish() {
	record.end = Date.now()
}

export function pipe(fn) {
	let { start, end, history } = record
	let count = 0
	let read = () => {
		if (count >= history.length) {
			return fn(null)
		}
		fn(history[count], count)
		requestAnimationFrame(read)
	}
	read()
}

let hook = {
	DID_UPDATE: data => {
		
	}
}