const request = require("supertest");
const app = require("../app");
const authClient = require("../helpers/authRpc");
const playerService = require("../services/PlayerService");

describe("test update player", () => {
    const validIp = "6669b557f829d892f138a73c";
    const invalidIp = "6669b557f829d892f138a73a";

    const requestValid = {
        "name": "Dedi 112",
        "age": 20
    }

    const requestEmptyAge = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112"
    }

    const requestInvalidAge = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "age": 16
    }

    const requestEmptyName = {
        "email": "dedi112@gmail.com",
        "age": 20
    }

    const requestInvalidNameToShort = {
        "email": "dedi112@gmail.com",
        "name": "de",
        "age": 20
    }

    const requestInvalidNameToLong = {
        "email": "dedi112@gmail.com",
        "name": "asdasdadsasdasdasd",
        "age": 20,
    }

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

    
    test("should be  success update player ", async () => {
        const mockGetDataFromToken = jest.fn(() => auth);
        const mockGetDataById = jest.fn(() => player);
        const mockUpdatePlayer = jest.fn(() => player);

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())

        const res = await request(app).put(`/${validIp}`).send(requestValid);

        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockGetDataById).toHaveBeenCalledTimes(1)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(1)

        expect(res.body).toHaveProperty("data");
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual(player);
    });

    test("should be failed while id not found ", async () => {
        const mockGetDataFromToken = jest.fn(() => auth);
        const mockGetDataById = jest.fn(() => null);
        const mockUpdatePlayer = jest.fn(() => player);

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())

        const res = await request(app).put(`/${invalidIp}`).send(requestValid);

        expect(mockGetDataById).toHaveBeenCalledTimes(1)
        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(0)

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
        const mockUpdatePlayer = jest.fn(() => player);

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())

        const res = await request(app).put(`/${invalidIp}`).send(requestValid);

        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockGetDataById).toHaveBeenCalledTimes(1)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(0)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: error.message });
    });

    test("should be failed while age less than 17 when update player ", async () => {
        const mockGetDataById = jest.fn(() => player);
        const mockUpdatePlayer = jest.fn(() => player);
        const mockGetDataFromToken = jest.fn(() => auth);

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())

        const res = await request(app).put(`/${validIp}`).send(requestInvalidAge);

        expect(mockGetDataById).toHaveBeenCalledTimes(0)
        expect(mockGetDataFromToken).toHaveBeenCalledTimes(0)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(0)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'too young' });
    });
    test("should be failed while age empty when update player ", async () => {
        const mockGetDataById = jest.fn(() => player);
        const mockUpdatePlayer = jest.fn(() => player);
        const mockGetDataFromToken = jest.fn(() => auth);

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())

        const res = await request(app).put(`/${validIp}`).send(requestEmptyAge);

        expect(mockGetDataById).toHaveBeenCalledTimes(0)
        expect(mockGetDataFromToken).toHaveBeenCalledTimes(0)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'age is required, too young' });
    });

    test("should be failed while name empty when update player ", async () => {
        const mockGetDataById = jest.fn(() => player);
        const mockUpdatePlayer = jest.fn(() => player);
        const mockGetDataFromToken = jest.fn(() => auth);

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())

        const res = await request(app).put(`/${validIp}`).send(requestEmptyName);

        expect(mockGetDataById).toHaveBeenCalledTimes(0)
        expect(mockGetDataFromToken).toHaveBeenCalledTimes(0)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(0)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'name is required, too short name' });
    });

    test("should be  failed while length of name less than 3 when update player ", async () => {
        const mockGetDataById = jest.fn(() => player);
        const mockUpdatePlayer = jest.fn(() => player);
        const mockGetDataFromToken = jest.fn(() => auth);

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())

        const res = await request(app).put(`/${validIp}`).send(requestInvalidNameToShort);

        expect(mockGetDataById).toHaveBeenCalledTimes(0)
        expect(mockGetDataFromToken).toHaveBeenCalledTimes(0)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'too short name' });
    });

    test("should be  failed while length of name greater than 16 when update player ", async () => {
        const mockGetDataById = jest.fn(() => player);
        const mockUpdatePlayer = jest.fn(() => player);
        const mockGetDataFromToken = jest.fn(() => auth);

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())

        const res = await request(app).put(`/${validIp}`).send(requestInvalidNameToLong);

        expect(mockGetDataById).toHaveBeenCalledTimes(0)
        expect(mockGetDataFromToken).toHaveBeenCalledTimes(0)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(0)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'too long name' });
    });

    test("should be failed while response from auth rpc failed when update player ", async () => {
        const mockGetDataById = jest.fn(() => player);
        const mockUpdatePlayer = jest.fn(() => player);
        const mockGetDataFromToken = jest.fn(() => authFailed);

        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())
        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())

        const res = await request(app).put(`/${validIp}`).send(requestValid);

        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockGetDataById).toHaveBeenCalledTimes(0)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(0)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ errors: authFailed.result.message });
    });

    test("should be failed while response mongoo error when update player ", async () => {
        const error = new Error("Mongo Server Error");
        const mockGetDataFromToken = jest.fn(() => auth);
        const mockGetDataById = jest.fn(() => player);
        const mockUpdatePlayer = jest.fn(() => {
            error.name = "MongoServerError";
            throw error;
        });

        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())
        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())

        const res = await request(app).put(`/${validIp}`).send(requestValid);

        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockGetDataById).toHaveBeenCalledTimes(1)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(1)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ errors: error.message });
    });

    test("should be failed while response rpc/token is another email ", async () => {
        const mockGetDataById = jest.fn(() => player);
        const mockUpdatePlayer = jest.fn(() => null);
        const mockGetDataFromToken = jest.fn(() => authAnotherToken);

        jest.spyOn(playerService, "getPlayerById").mockImplementation(() => mockGetDataById())
        jest.spyOn(playerService, "updatePlayerById").mockImplementation(() => mockUpdatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockGetDataFromToken())

        const res = await request(app).put(`/${validIp}`).send(requestValid);

        expect(mockGetDataById).toHaveBeenCalledTimes(1)
        expect(mockGetDataFromToken).toHaveBeenCalledTimes(1)
        expect(mockUpdatePlayer).toHaveBeenCalledTimes(0)

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ errors: 'Unauthorized' });
    });
});