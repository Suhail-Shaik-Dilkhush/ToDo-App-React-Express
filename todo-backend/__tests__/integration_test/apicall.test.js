const request = require("supertest")
const { MongoMemoryServer } = require("mongodb-memory-server")
const mongoose = require("mongoose")

const app = require("../../server")
const Todo = require("../../models/db-schema")

describe("api testing of the data", () => {
    let mongoServer
    beforeAll(async () => {
        jest.setTimeout(30000)
        try {
            mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            await mongoose.disconnect();
            await mongoose.connect(mongoUri);
        } catch (error) {
            console.error('MongoDB Memory Server setup failed:', error);
            throw error;
        }


    }, 30000);


    afterAll(async () => {
        try {
            await mongoose.disconnect();
            if (mongoServer) {
                await mongoServer.stop();
            }
        } catch (error) {
            console.error('Cleanup failed:', error);
            throw error;
        }
    }, 30000);

    describe("Get /api/date called", () => {
        it("should return the api list", async () => {
            await Todo.create({ title: "book1" })
            await Todo.create({ title: "book2" })

            const response = await request(app).get("/api/data");

            expect(response.status).toBe(200)
            expect(response.body.length).toBe(2)
            expect(response.body[0].title).toBe("book1")
            expect(response.body[1].title).toBe("book2")
        })
    })

    describe("when POST /api/data is sent", () => {
        it("should send the data to the DB", async () => {
            const response = await request(app).post("/api/data").send({ title: "Test-Todo" });

            expect(response.status).toBe(201);
            expect(response.body.title).toBe("Test-Todo");
            expect(response.body.completed).toBe(false);

            const todo = await Todo.findById(response.body._id)
            console.log(todo)
            expect(todo).toBeTruthy()
            expect(todo.title).toBe("Test-Todo")

        })
    })

})