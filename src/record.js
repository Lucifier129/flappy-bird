// recorder
function getInitialRecord() {
    return {
        history: [],
        isRecording: false,
    }
}

let record = getInitialRecord()
let render = () => {}

export function getRecord() {
    return record
}

export function start() {
    record = getInitialRecord()
}

export function setRender(renderFunction) {
    render = renderFunction
}

export function finish() {
    record.isRecording = true
}

export function save(state) {
    if (record.isRecording) {
        return
    }
    record.history.push(state)
}

export function replay() {
    let { history } = record
    let count = 0
    let read = () => {
        if (count >= history.length) {
            return
        }
        render(history[count])
        count += 1
        requestAnimationFrame(read)
    }
    read()
}

export function reverse() {
    let { history } = record
    let count = 0
    let read = () => {
        if (count >= history.length) {
            render(history[history.length - 1])
            return
        }
        render(history[history.length - 1 - count])
        count += 1
        requestAnimationFrame(read)
    }
    read()
}