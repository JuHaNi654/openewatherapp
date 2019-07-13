import { createStore } from 'redux'
import devToolsEnhancer from 'remote-redux-devtools'

//Initialize redux store state
const initialState = {
    hello: 'hello world', 
    query: null,
    history: []
}

//dispatch function calls
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SAVE_QUERY':
            return Object.assign({}, state, { query: action.query })
        case 'SAVE_HISTORY':
            return saveQuery(state, action.query)
        default:
            return state
    }
}

/**
|--------------------------------------------------
| @param list takes @param initialState object
| @param query object by given weather data
| Function will save last 5 given query search
| and deletes last one and adds new to first if query reaches 5 objects
| @returns initialState object with updated history array parameter
|--------------------------------------------------
*/
function saveQuery(list, query) {
    let history = list.history
    if (history.length === 5) {
        history.splice(-1, 1)
        history.unshift(query)
    } else {
        history.unshift(query)
    }
    return Object.assign({}, list, { history: history})
}

const store = createStore(reducer, devToolsEnhancer())
export default store;