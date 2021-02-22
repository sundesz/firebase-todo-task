import { db } from './firebase'
import firebase from 'firebase'

export const initialState = {
    isEditMode: false,
    isModalOpen: false,
    todos: [],
    editTodoData: [],
}

const loadTodos = () => {
    db.collection('todos').orderBy('updated', 'desc').onSnapshot(snapshot => {
        snapshot.docs.map(doc => ({id: doc.id, todo: doc.data()}))
    })
}



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
    db.collection('todos').doc(id).delete()
}

const reducer = (state, action) => {
    switch(action.type) {

        case 'LOAD_TODOS':
            return {
                ...state,
                todos: action.todos
            }

        case 'LOAD_TODO_FOR_EDIT':
            return {
                ...state,
                editTodoData: action.todo
            }

        case 'UPDATE_TODO':
            updateTodo(action.id, action.todo)
            return state

        case 'ADD_TODO':
            addTodo(action.todo)
            return state

        case 'DELETE_TODO':
            deleteTodo(action.id)
            return state

        case 'SET_TO_EDIT':
            return {
                ...state,
                isEditMode: true
            }

        case 'SET_TO_NEW':
            return {
                ...state,
                isEditMode: false
            }

        case 'MODAL_OPEN':
            return {
                ...state,
                isModalOpen: true,
            }

        case 'MODAL_CLOSE':
            return {
                ...state,
                isEditMode: false,
                isModalOpen: false,
            }

        default:
            return state
    }
}

export default reducer