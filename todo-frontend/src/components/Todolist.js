import React, { useState, useEffect } from "react"
import AddTodo from "./AddTodo"
import TodoItem from "./Todoitems"
import BACKEND_URL from "../config/config"
import axios from "axios"

const TodoList = () => {

    const [todos, setTodos] = useState([])
    useEffect(() => {
        fetchTodos();
    }, [])

    const handleAddSuccess = (newTodo) => {
        setTodos((prev) => [...prev, newTodo])
    }

    const handleDeleteSuccess = (deletedId) => {
        setTodos((prev) => prev.filter(t => t?._id !== deletedId))
    }

    const fetchTodos = async () => {

        try {
            console.log("fetching Todos")
            const response = await axios.get(BACKEND_URL)

            setTodos(response.data)
        }
        catch (err) {
            console.error("Error while fetching Todos", err)
        }
    }



    return (
        <div>
            <h1>Todo-List</h1>
            <AddTodo onAddSuccess={handleAddSuccess} />

            <ul>
                {
                    // Filter out any falsy entries (e.g. undefined) before rendering
                    todos.map((todo) => (
                        <TodoItem key={todo._id} todo={todo} onDeleteSuccess={handleDeleteSuccess} />
                    ))
                }
            </ul>


        </div>
    )

}

export default TodoList