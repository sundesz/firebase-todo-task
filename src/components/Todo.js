import React from 'react'
import { Checkbox, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Todo = ({todo, onDelete, handleOpen, setIsEdit, setTodo}) => {

    const todoEdit = e => {
        setIsEdit(true)
        handleOpen()
        setTodo(todo)
    }

    return (
        <ListItem>
            <Checkbox
                checked={todo.todo.remainder}
                // onChange={handleChange}
                color="primary"
                // inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <ListItemText primary={todo.todo.title} secondary={todo.todo.day} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={todoEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={e => onDelete(todo.id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Todo
