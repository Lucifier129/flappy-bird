import { createStore } from 'refer'
import createLogger from 'refer-logger'
import * as actions from './actions'

let handler = [actions]

if (false && process.env.NODE_ENV === 'development') {
    handler.push(createLogger({
        scope: 'flappy-bird',
        debug: true,
    }))
}

export default function(initialState) {
    return createStore(handler, initialState)
}
