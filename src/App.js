import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Todos from './components/Todos';
import About from './pages/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useEffect } from 'react';
import { db } from './firebase'
import { useStateValue } from './StateProvider';


function App() {

  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    db.collection('todos').orderBy('updated', 'desc').onSnapshot(snapshot => {
      dispatch({
        type: 'LOAD_TODOS',
        todos: snapshot.docs.map(doc => ({id: doc.id, todo: doc.data()}))
      })
    })
  }, [])


  return (
    <Router>
      <div className="todo-container">
        <Header />
          <Switch>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/">
              <Todos />
            </Route>

          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
