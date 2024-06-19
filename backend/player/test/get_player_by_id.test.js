const request = require("supertest");
const app = require("../app");
const playerService = require("../services/PlayerService");
const CustomError = require("../models/custom_error");

describe("test get player by id", () => {
    const validIp = "6669b557f829d892f138a73c";
    const invalidIp = "6669b557f829d892f138a73a";
    const response = {
        "data": {
            "_id": "6669b557f829d892f138a73c",
            "name": "Anisa",
            "email": "dedi101@gmail.com",
            "age": 20
        }
    }
    const responseFailed = new CustomError(`player with id ${invalidIp} not found`);

    test("should be success get player by id ", async () => {
        const mockFindPlayerById = jest.fn(() => response);

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockFindPlayerById())

        const res = await request(app).get(`/${validIp}`);

        expect(mockFindPlayerById).toHaveBeenCalledTimes(1)
        expect(res.body).toHaveProperty("data");
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual(response);
    });

    test("should be failed get player by id when id not found ", async () => {
        const mockFindPlayerById = jest.fn(() => {
            return null;
        });

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockFindPlayerById())

        const res = await request(app).get(`/${invalidIp}`);

        expect(mockFindPlayerById).toHaveBeenCalledTimes(1)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(404);
        expect(res.body.errors).toEqual(responseFailed.message);
    });
    test("should be failed get player ", async () => {
        const mockFindPlayerById = jest.fn(() => {
            throw responseFailed
        });

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockFindPlayerById())

        const res = await request(app).get(`/${invalidIp}`);

        console.log(res, "ini res")

        expect(mockFindPlayerById).toHaveBeenCalledTimes(1)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(500);
        expect(res.body.errors).toEqual(responseFailed.message);
    });
});