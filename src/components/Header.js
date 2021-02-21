import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import './Header.css'
import TodoModal from './TodoModal'


const Header = ({addTodo, open, handleOpen, handleClose, isEdit, todo, updateTodo}) => {

    const urlPath = useLocation()
    const [title, setTitle] = useState('')
    const [day, setDay] = useState('')
    const [remainder, setRemainder] = useState(false)

    return (
        <div className="navbar">
            <Link to="/">
                <h1>Todo</h1>
            </Link>

            {urlPath.pathname === "/"
            ?
            <>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add Todo
                </Button>

                <TodoModal addTodo={addTodo} handleOpen={handleOpen} open={open} handleClose={handleClose} isEdit={isEdit} todo={todo} updateTodo={updateTodo} />
            </>
            : ''
            }
        </div>
    )
}

export default Header
