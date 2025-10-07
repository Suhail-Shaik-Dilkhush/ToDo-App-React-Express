import React from 'react'

import { render, fireEvent, screen, cleanup, waitFor } from "@testing-library/react"
import axios from 'axios'

//jest.mock('axios')

import AddTodo from "../../components/AddTodo"




afterEach(() => {
    cleanup();
    jest.resetAllMocks()
})

describe("Testing Add to do component in front end", () => {
    test("Render the components on the screen", () => {
        render(<AddTodo onAddSuccess={() => { }} />)
        expect(screen.getByPlaceholderText("Add a new Todo")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add Todo" })).toBeInTheDocument();
    })

    test("when form is submitted, the onAddSuccess function to be invoked", async () => {
        const mockAdd = jest.fn()

        // provide a fake postFn that resolves with the created todo object
        const fakePost = jest.fn().mockResolvedValue({ data: { _id: 'abc', title: 'New Todo', completed: false } })

        render(<AddTodo onAddSuccess={mockAdd} postFn={fakePost} />)

        const input = screen.getByPlaceholderText("Add a new Todo")
        const button = screen.getByRole("button", { name: "Add Todo" })

        fireEvent.change(input, { target: { value: "New Todo" } })

        fireEvent.click(button)

        // wait for the injected postFn to resolve and onAddSuccess to be called with object containing the title
        await waitFor(() => expect(mockAdd).toHaveBeenCalledWith(expect.objectContaining({ title: 'New Todo' })))
    })
})