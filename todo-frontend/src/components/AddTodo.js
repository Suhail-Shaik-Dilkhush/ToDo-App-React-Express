import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BACKEND_URL from "../config/config"



const AddTodo = ({ onAddSuccess, postFn = (url, body) => axios.post(url, body) }) => {

    const [newTodo, setNewTodo] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log("posting the new todo after submitting the data")

            // Use injected postFn so tests can stub network calls
            const response = await postFn(BACKEND_URL, {
                title: newTodo
            });

            // Only call the success handler if we actually received the created todo
            if (response && response.data) {
                onAddSuccess(response.data)
            } else {
                console.error('AddTodo: no data returned from POST', response)
            }

            setNewTodo('')

        } catch (err) {
            console.log("Error while posting the data", err)
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    placeholder="Add a new Todo"
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}



export default AddTodo

