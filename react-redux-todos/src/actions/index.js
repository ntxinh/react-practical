import constants from '../constants'

let nextTodoId = 0
export const addTodo = (text) => ({
    type: constants.ADD_TODO,
    id: nextTodoId++,
    text
})

export const setVisibilityFilter = (filter) => ({
    type: constants.SET_VISIBILITY_FILTER,
    filter
})

export const toggleTodo = (id) => ({
    type: constants.TOGGLE_TODO,
    id
})