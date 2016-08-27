import { createStore } from 'relite'
import * as actions from './actions'

export default function(initialState) {
    return createStore(actions, initialState)
}
