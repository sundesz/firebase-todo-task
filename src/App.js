import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Todos from './components/Todos';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react';
import { db } from './firebase'
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import About from './pages/About';



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


function App() {


  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const [todo, setTodo] = useState([])
  const [todos, setTodos] = useState([])


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsEdit(false)
    setOpen(false);
  };

  useEffect(() => {
    db.collection('todos').orderBy('updated', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => ({id: doc.id, todos: doc.data()})))
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data()})))
    })
  }, [])


  const addTodo = (todo) => {
    db.collection('todos').add({
      title: todo.title,
      day: todo.day,
      remainder: todo.remainder,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      updated: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  const updateTodo = (id, todo) => {
    db.collection('todos').doc(id).set({
      title: todo.title,
      day: todo.day,
      remainder: todo.remainder,
      updated: firebase.firestore.FieldValue.serverTimestamp(),
    }, {merge: true})
  }

  const deleteTodo = (id) => {
    // console.log(id)
    db.collection('todos').doc(id).delete()
  }




  return (
    <Router>
      <div className="todo-container">
        <Switch>

          <Route path="/about">
            <Header />
            <About />
            <Footer />
          </Route>

          <Route path="/">
            <Header addTodo={addTodo} open={open} handleOpen={handleOpen} handleClose={handleClose} isEdit={isEdit} todo={todo} updateTodo={updateTodo} />
            <Todos todos={todos} onDelete={deleteTodo} handleOpen={handleOpen} setIsEdit={setIsEdit} setTodo={setTodo} />
            <Footer />
          </Route>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
