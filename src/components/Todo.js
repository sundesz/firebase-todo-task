import React from 'react'
import { Checkbox, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStateValue } from '../StateProvider';

const Todo = ({todo}) => {

    const [{}, dispatch] = useStateValue()

    const todoEdit = e => {
        dispatch({
            type: 'MODAL_OPEN'
        })

        dispatch({
            type: 'LOAD_TODO_FOR_EDIT',
            todo: todo
        })

        dispatch({
            type: 'SET_TO_EDIT'
        })
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
                <IconButton edge="end" aria-label="delete" onClick={e => dispatch({type: 'DELETE_TODO', id: todo.id})}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Todo
