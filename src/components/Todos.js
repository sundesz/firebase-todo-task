import { List } from '@material-ui/core'
import { useStateValue } from '../StateProvider'
import Todo from './Todo'

const Todos = () => {

    const [{todos}, dispatch] = useStateValue()

    return (
        <div className="todos">
            <List >
                { todos.length ? todos.map((todo, index) => (
                    <Todo key={todo.id} todo={todo} />
                )): <h1 style={{textAlign: 'center'}}>No Todo</h1> }

            </List>
        </div>
    )
}

export default Todos
