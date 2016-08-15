import { createStore } from 'refer'
import * as actions from './actions'

let handler = [actions]

export default function(initialState) {
    return createStore(handler, initialState)
}
