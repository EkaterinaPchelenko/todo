import React from 'react'


const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.created_at}</td>
            <td>{todo.creator}</td>
            <td>{todo.project}</td>
        </tr>
    )
}

const ToDoList = ({todo}) => {
    return (

        <table>
            <th>Text</th>
            <th>The date of creation</th>
            <th>Id of creator</th>
            <th>Id of project</th>
            {todo.map((todo) => <ToDoItem todo={todo}/>)}
        </table>
    )
}


export default ToDoList