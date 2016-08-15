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
    record.isRecording = true
}

export function save(state) {
    if (record.end) {
        return
    }
    record.history.push(state)
}

export function replay() {
    let { history, store } = record
    let { replaceState } = store
    let key = 'TIME_TRAVEL'
    let count = 0
    let read = () => {
        if (count >= history.length) {
            return
        }
        let nextState = history[count]
        let data = {
            key,
            nextState,
        }
        replaceState(nextState, null, data)
        count += 1
        requestAnimationFrame(read)
    }

    read()
}

export function reverse() {
    let { history, store } = record
    let { replaceState } = store
    let key = 'TIME_TRAVEL'
    let count = 0
    let read = () => {
        if (count >= history.length) {
            let nextState = history[history.length - 1]
            let data = {
                key,
                nextState,
            }
            replaceState(nextState, null, data)
            return
        }
        let nextState = history[history.length - 1 - count]
        let data = {
            key,
            nextState,
        }
        replaceState(nextState, null, data)
        count += 1
        requestAnimationFrame(read)
    }

    read()
}
