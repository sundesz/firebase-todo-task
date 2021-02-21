import { Button, Checkbox, FormControl,FormControlLabel,  Input, InputLabel, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'
import PropTypes from 'prop-types'

function getModalStyle() {
    const top = 40;
    const left = 42;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    width100: {
        width: '100%'
    },
    pt10: {
        paddingTop: '10px'
    },
    mb20: {
        marginBottom: '20px'
    }
  }));

const TodoModal = ({addTodo, open, handleClose, isEdit, todo, updateTodo}) => {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [title, setTitle] = useState(isEdit ? todo.todo.title : '')
    const [day, setDay] = useState(isEdit ? todo.todo.day : '')
    const [remainder, setRemainder] = useState(isEdit ? todo.todo.remainder : false)

    const handleSubmit = e => {
        e.preventDefault();

        if (!title) {
            alert('Please enter title')
            return
        }

        if (isEdit) {
            updateTodo(todo.id, {title, day, remainder})
        } else {
            addTodo({title, day, remainder})
        }


        setTitle('')
        setDay('')
        setRemainder(false)

        handleClose()
    }

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Add Task</h2>
        <span id="simple-modal-description">
            <form action="" className={classes.mb20} onSubmit={handleSubmit}>
                <FormControl className={classes.width100}>
                    <InputLabel htmlFor="todo_title">Title</InputLabel>
                    <Input id="todo_title" value={title} onChange={e => setTitle(e.target.value)}/>
                </FormControl>
                <FormControl className={classes.width100}>
                    <InputLabel htmlFor="todo_day">Day</InputLabel>
                    <Input id="todo_day" value={day} onChange={e => setDay(e.target.value)}/>
                </FormControl>
                <FormControlLabel  className={classes.pt10}
                    control={
                        <Checkbox
                            checked={remainder}
                            onChange={e => setRemainder(e.currentTarget.checked)}
                            name="remainder"
                        />
                    }
                    label="Remainder"
                />
            </form>
        </span>
        <div className={classes.buttonGroup}>
            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                {isEdit ? 'Update Todo' : 'Add Todo'}
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose}>
                Close
            </Button>
        </div>
      </div>
    );

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            {body}
        </Modal>
    )
}

TodoModal.propTypes = {
    isEdit: PropTypes.bool.isRequired,
}

export default TodoModal
