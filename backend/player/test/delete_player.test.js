const request = require("supertest");
const app = require("../app");
const authClient = require("../helpers/authRpc");
const playerService = require("../services/PlayerService");

describe("test delete player", () => {
    const validIp = "6669b557f829d892f138a73c";
    const invalidIp = "6669b557f829d892f138a73a";

    const player = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "age": 20
    }

    const auth = {
        result: {
            success: true,
            data: {
                email: "dedi112@gmail.com"
            }
        }
    }

    const authAnotherToken = {
        result: {
            success: true,
            data: {
                email: "dedi111@gmail.com"
            }
        }
    }

    const authFailed = {
        result: {
            success: false,
            message: "Unauthorized"
        }
    }

    
    test("should be  success delete player ", async () => {
        const mockGetDataFromToken = jest.fn(() => auth);
        const mockGetDataById = jest.fn(() => player);
        const mockDeletePlayerInMysql = jest.fn(() => auth);
        const mockDeletePlayerInMongo = jest.fn(() => player);

        jest.spyOn(authClient, "request").mockImplementationOnce(() => mockGetDataFromToken())
        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(authClient, "request").mockImplementationOnce(() => mockDeletePlayerInMysql())
        jest.spyOn(playerService, "deletePlayerById").mockImplementation(() => mockDeletePlayerInMongo())

        const res = await request(app).delete(`/${validIp}`);

        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockGetDataById).toHaveBeenCalledTimes(1)
        expect(mockDeletePlayerInMysql).toHaveBeenCalledTimes(1)
        expect(mockDeletePlayerInMongo).toHaveBeenCalledTimes(1)

        expect(res.body).toHaveProperty("data");
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual(player);
    });

    test("should be failed while id not found ", async () => {
        const mockGetDataFromToken = jest.fn(() => auth);
        const mockGetDataById = jest.fn(() => null);
        const mockDeletePlayerInMongo = jest.fn(() => player);

        jest.spyOn(authClient, "request").mockImplementationOnce(() => mockGetDataFromToken())
        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "deletePlayerById").mockImplementation(() => mockDeletePlayerInMongo())

        const res = await request(app).delete(`/${invalidIp}`);

        expect(mockGetDataById).toHaveBeenCalledTimes(1)
        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockDeletePlayerInMongo).toHaveBeenCalledTimes(0)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ errors: `Player with id ${invalidIp} not found` });
    });
    test("should be failed while id wrong format ", async () => {
        const error = new Error("Wrong Id")
        const mockGetDataFromToken = jest.fn(() => auth);
        const mockGetDataById = jest.fn(() => {
            error.name = "CastError";
            throw error;
        });
        const mockDeletePlayerInMongo = jest.fn(() => player);

        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())
        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "deletePlayerById").mockImplementation(() => mockDeletePlayerInMongo())

        const res = await request(app).delete(`/${invalidIp}`);

        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockGetDataById).toHaveBeenCalledTimes(1)
        expect(mockDeletePlayerInMongo).toHaveBeenCalledTimes(0)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: error.message });
    });

    test("should be failed while response from auth rpc failed when delete player ", async () => {
        const mockGetDataFromToken = jest.fn(() => authFailed);
        const mockGetDataById = jest.fn(() => player);
        const mockDeletePlayerInMongo = jest.fn(() => player);

        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())
        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "deletePlayerById").mockImplementation(() => mockDeletePlayerInMongo())

        const res = await request(app).delete(`/${invalidIp}`);

        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockGetDataById).toHaveBeenCalledTimes(0)
        expect(mockDeletePlayerInMongo).toHaveBeenCalledTimes(0)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ errors: authFailed.result.message });
    });

    test("should be failed while response mongoo error when update player ", async () => {
        const error = new Error("Mongo Server Error");
        const mockGetDataFromToken = jest.fn(() => auth);
        const mockGetDataById = jest.fn(() => player);
        const mockDeletePlayerInMongo = jest.fn(() => {
            error.name = "MongoServerError";
            throw error;
        });

        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())
        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "deletePlayerById").mockImplementation(() => mockDeletePlayerInMongo())

        const res = await request(app).delete(`/${invalidIp}`);

        expect(mockGetDataFromToken).toHaveBeenCalledTimes(2)
        expect(mockGetDataById).toHaveBeenCalledTimes(1)
        expect(mockDeletePlayerInMongo).toHaveBeenCalledTimes(1)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ errors: error.message });
    });

    test("should be failed while response rpc/token is another email ", async () => {
        const mockGetDataFromToken = jest.fn(() => authAnotherToken);
        const mockGetDataById = jest.fn(() => player);
        const mockDeletePlayerInMongo = jest.fn(() => player);

        jest.spyOn(authClient, "request").mockImplementationOnce(() => mockGetDataFromToken())
        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "deletePlayerById").mockImplementation(() => mockDeletePlayerInMongo())

        const res = await request(app).delete(`/${invalidIp}`);

        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockGetDataById).toHaveBeenCalledTimes(1)
        expect(mockDeletePlayerInMongo).toHaveBeenCalledTimes(0)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ errors: 'Unauthorized' });
    });
});