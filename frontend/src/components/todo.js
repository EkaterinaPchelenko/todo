import React from 'react'
import {Link} from "react-router-dom";


const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.created_at}</td>
            <td>{todo.creator}</td>
            <td>{todo.project}</td>
            <button onClick={() => deleteToDo(todo.id)} type='button'>
                Delete
            </button>
        </tr>
    )
}

const ToDoList = ({todo, deleteToDo}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>Text</th>
                    <th>The date of creation</th>
                    <th>Id of creator</th>
                    <th>Id of project</th>
                </tr>
                {todo.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
            </table>
            <Link to='/todo/create'> Create </Link>
        </div>
    )
}


export default ToDoList