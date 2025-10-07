import React from 'react'
import { render, fireEvent, cleanup, waitFor, screen } from '@testing-library/react'
import TodoList from '../../components/Todolist'
import BACKEND_URL from '../../config/config'
import axios from 'axios'

jest.mock('axios')

afterEach(() => {
    jest.resetAllMocks();
    cleanup();
})

describe("Todo List component", () => {
    test("test todos and render todo items", async () => {
        const mockTodo = [{
            _id: "1", title: "title one", completed: false
        }, {
            _id: "2", title: "title two", completed: false
        }]

        axios.get.mockResolvedValue({ data: mockTodo })

        render(<TodoList />)

        await waitFor(() => { expect(axios.get).toHaveBeenCalledWith(BACKEND_URL) })

        await waitFor(() => {
            expect(screen.getByText("title one")).toBeInTheDocument();
            expect(screen.getByText("title two")).toBeInTheDocument();
        })
    })

    test("Add a new todo", async () => {
        const newTodo = { title: "demo-title" }

        // render and find elements
        render(<TodoList />)
        const input = screen.getByPlaceholderText("Add a new Todo")
        const button = screen.getByRole("button", { name: "Add Todo" })

        // prepare axios.post mock to return a created todo object (what backend would return)
        const created = { _id: 'xyz', title: 'demo-title', completed: false }
        axios.post.mockResolvedValue({ data: created })

        // type and submit
        fireEvent.change(input, { target: { value: "demo-title" } })
        fireEvent.click(button)

        // axios.post should be called with the backend URL and the payload object
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(BACKEND_URL, { title: 'demo-title' })
        })

        // and the created todo should appear in the list
        await waitFor(() => {
            expect(screen.getByText("demo-title")).toBeInTheDocument();
        })


    })
})