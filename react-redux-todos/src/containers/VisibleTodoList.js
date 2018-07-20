import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import constants from '../constants'

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case constants.SHOW_ALL:
            return todos
        case constants.SHOW_COMPLETED:
            return todos.filter(t => t.completed)
        case constants.SHOW_ACTIVE:
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknow filter: ' + filter)
    }
}

const mapStateToProps = (state) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = {
    onTodoClick: toggleTodo
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList