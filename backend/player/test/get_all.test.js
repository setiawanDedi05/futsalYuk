const request = require("supertest");
const app = require("../app");
const playerService = require("../services/PlayerService");

describe("test get all players", () => {
    const response = {
        "data": [
            {
                "_id": "6669b557f829d892f138a73c",
                "name": "Anisa",
                "email": "dedi101@gmail.com",
                "age": 20,
                "__v": 0
            }
        ]
    }
    const responseFailed = new Error("Internal Server Error");
    responseFailed.name = "MongooseError"

    test("should be  success get all players ", async () => {
        const mockCreatePlayer = jest.fn(() => response);

        jest.spyOn(playerService, "getAllPlayers").mockImplementation(() => mockCreatePlayer())

        const res = await request(app).get("/");

        expect(mockCreatePlayer).toHaveBeenCalledTimes(1)
        expect(res.body).toHaveProperty("data");
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual(response);
    });

    test("should be failed get all players ", async () => {
        const mockCreatePlayer = jest.fn(() => {
            throw responseFailed
        });

        jest.spyOn(playerService, "getAllPlayers").mockImplementation(() => mockCreatePlayer())

        const res = await request(app).get("/");

        expect(mockCreatePlayer).toHaveBeenCalledTimes(1)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(500);
        expect(res.body.errors).toEqual(responseFailed.message);
    });
});