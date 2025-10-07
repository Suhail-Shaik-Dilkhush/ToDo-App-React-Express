import React from 'react'
import { screen, cleanup, render, fireEvent, waitFor } from "@testing-library/react"
import axios from 'axios'
import BACKEND_URL from '../../config/config'
import TodoItem from '../../components/Todoitems';

jest.mock('axios')

afterEach(() => {
    cleanup();
    jest.resetAllMocks()
})


describe("while Todo items are being fetched", () => {

    const mockTodo = { _id: "1", title: "New Todo", completed: false }
    test("check if the todo title is rendered or not", () => {
        render(<TodoItem onDeleteSuccess={() => { }} todo={mockTodo} />)
        expect(screen.getByText("New Todo")).toBeInTheDocument()
    })

    test("check if the delete button is present or not", () => {
        render(<TodoItem todo={mockTodo} onDeleteSuccess={() => { }} />)
        expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument()
    })

    test("when delete is clicked it calls axios.delete and notifies parent", async () => {
        const mockDelete = jest.fn()

        // mock axios.delete to resolve with a 200 status
        axios.delete.mockResolvedValue({ status: 200, data: { message: 'deleted' } })

        render(<TodoItem todo={mockTodo} onDeleteSuccess={mockDelete} />)

        const button = screen.getByRole("button", { name: "Delete" })

        fireEvent.click(button)

        // wait for axios.delete to have been called with the expected URL
        await waitFor(() => expect(axios.delete).toHaveBeenCalledWith(`${BACKEND_URL}/${mockTodo._id}`))

        // wait for the parent callback to be invoked with the deleted id
        await waitFor(() => expect(mockDelete).toHaveBeenCalledWith(mockTodo._id))
    })
})