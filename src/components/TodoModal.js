import { Button, Checkbox, FormControl,FormControlLabel,  Input, InputLabel, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import { useStateValue } from '../StateProvider';

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
      padding: theme.spacing(2, 4, 1),
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '25px'
    },
    width100: {
        width: '100%'
    },
    pt10: {
        paddingTop: '10px'
    },
    mt10: {
        marginTop: '10px'
    },
    mb20: {
        marginBottom: '20px'
    }
  }));

const TodoModal = () => {

    const [{isEditMode, editTodoData, isModalOpen}, dispatch] = useStateValue()

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [title, setTitle] = useState('')
    const [day, setDay] = useState('')
    const [remainder, setRemainder] = useState(false)

    useEffect(() => {
        setTitle(isEditMode ? editTodoData.todo.title : '')
        setDay(isEditMode ? editTodoData.todo.day : '')
        setRemainder(isEditMode ? editTodoData.todo.remainder : false)
    }, [isEditMode, editTodoData])

    const handleClose = () => {
        dispatch({
          type: 'MODAL_CLOSE'
        })
        dispatch({
          type: 'SET_TO_NEW'
        })
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!title) {
            alert('Please enter title')
            return
        }

        if (isEditMode) {
            dispatch({
                type: 'UPDATE_TODO',
                id: editTodoData.id,
                todo: {title, day, remainder}
            })
        } else {
            dispatch({
                type: 'ADD_TODO',
                todo: {title, day, remainder}
            })
        }

        setTitle('')
        setDay('')
        setRemainder(false)

        handleClose()
    }

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{isEditMode ? 'Edit Todo' : 'Add Todo'}</h2>
        <span id="simple-modal-description">
            <form action="" className={classes.mb20} onSubmit={handleSubmit}>
                <FormControl className={classes.width100}>
                    <InputLabel htmlFor="todo_title">Title</InputLabel>
                    <Input id="todo_title" value={title} onChange={e => setTitle(e.target.value)}/>
                </FormControl>
                <FormControl className={`${classes.width100} ${classes.mt10}`}>
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

                <div className={classes.buttonGroup}>
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        {isEditMode ? 'Update Todo' : 'Add Todo'}
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </form>
        </span>

      </div>
    );

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
        >
            {body}
        </Modal>
    )
}

// TodoModal.propTypes = {
//     isEdit: PropTypes.bool.isRequired,
// }

export default TodoModal
