import React from "react"
import axios from 'axios'
import BACKEND_URL from "../config/config"

const TodoItem = ({ todo, onDeleteSuccess, deleteFn = (url) => axios.delete(url) }) => {

    const handleDelete = async () => {
        try {
            const response = await deleteFn(`${BACKEND_URL}/${todo._id}`)

            // use strict equality check
            if (response && response.status === 200) {
                onDeleteSuccess && onDeleteSuccess(todo._id)
            }
        }
        catch (err) {
            console.error("Error while deleting Todo", err)
        }
    }

    return (
        <li className="todo-item">
            <div className="todo-left">
                <span className="todo-title">{todo?.title ?? '(no title)'}</span>
                <span className={`todo-status ${todo?.completed ? 'completed' : 'pending'}`}>
                    {todo?.completed ? "Completed" : "Pending"}
                </span>
            </div>
            <div className="todo-actions">
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
}

export default TodoItem