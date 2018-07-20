import React from 'react'
import FilterLink from '../containers/FilterLink'
import constants from '../constants'

const Footer = () => (
    <p>
        Show:
        {" "}
        <FilterLink filter={constants.SHOW_ALL}>
            All
        </FilterLink>
        {", "}
        <FilterLink filter={constants.SHOW_ACTIVE}>
            Active
        </FilterLink>
        {", "}
        <FilterLink filter={constants.SHOW_COMPLETED}>
            Completed
        </FilterLink>
    </p>
)

export default Footer