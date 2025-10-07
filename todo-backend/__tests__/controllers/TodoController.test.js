const todoController = require('../../controllers/TodoController.js')

jest.mock('../../models/db-schema.js')

const mockSave = jest.fn()
const mockFind = jest.fn()


const Todo = require('../../models/db-schema')

Todo.find = mockFind
Todo.mockImplementation(() => ({
    save: mockSave
}))

describe("when todo controller is invoked", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            body: {},
            params: {}
        };
        res = {
            json: jest.fn(() => res),
            status: jest.fn(() => res)
        }
    })

    describe("For each getTodo function", () => {
        it("should give all Todos", async () => {
            const mockTodos = [{ _id: 0, title: "Title1", completed: false, _v: 0 }, { _id: 1, title: "Title2", completed: false, _v: 0 }]
            mockFind.mockResolvedValue(mockTodos)
            await todoController.getTodo(req, res)

            expect(mockFind).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockTodos)
        })

        it("if something goes wrong, handle it as well", async () => {
            const errorMessage = "Something goes wrong while connecting to DB"
            mockFind.mockRejectedValue(errorMessage)
            await todoController.getTodo(req, res)

            expect(mockFind).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage })

        })
    })

    describe("For each PostTodo function", () => {
        it("Should add a new todo to the db", async () => {

            const newTodo = { _id: 1, title: "new_title" }
            req.body.title = "new_title"

            mockSave.mockResolvedValue(newTodo)

            await todoController.postTodo(req, res)

            expect(mockSave).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith(newTodo)
        })

        it("should throw error, if adding of todo not worked", async () => {
            const errorMessage = "Error received while adding todo"

            mockSave.mockRejectedValue(errorMessage)

            await todoController.postTodo(req, res)

            expect(mockSave).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith(errorMessage)

        })
    })
})