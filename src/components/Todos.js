import { List } from '@material-ui/core'
import React, { useState } from 'react'
import Todo from './Todo'

const Todos = ({todos, onDelete, handleOpen, setIsEdit, setTodo}) => {

    return (
        <div className="todos">
            <List >
                { todos.length ? todos.map((todo, index) => (
                    <Todo key={todo.id} todo={todo} onDelete={onDelete} handleOpen={handleOpen} setIsEdit= {setIsEdit} setTodo={setTodo} />
                )): <h1 style={{textAlign: 'center'}}>No Todo</h1> }

            </List>
        </div>
    )
}

export default Todos
