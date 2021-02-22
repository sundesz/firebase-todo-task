import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import './Header.css'
import TodoModal from './TodoModal'


const Header = () => {

    const [{}, dispatch] = useStateValue();

    const urlPath = useLocation()

    const openModal = () => {
        dispatch({
          type: 'MODAL_OPEN'
        })
    };

    return (
        <div className="navbar">
            <Link to="/">
                <h1>Todo</h1>
            </Link>

            {urlPath.pathname === "/"
            ?
            <>
                <Button variant="contained" color="primary" onClick={openModal}>
                    Add Todo
                </Button>

                <TodoModal />
            </>
            : ''
            }
        </div>
    )
}

export default Header
