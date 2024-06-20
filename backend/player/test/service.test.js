const app = require("../app");
const { dbconnect, dbclose } = require("../helpers/mongooseConnection");
const AuthClient = require("../models/authRpc");
const { Player } = require("../models/playerModel");
const request = require("supertest");
jest.mock('../models/authRpc');
describe("testing service", () => {
    let allPlayers;
    let player;
    let rpcResultTrue;
    let rpcresultFailed = {
        result: {
            success: false
        }
    }

    let rpcresultAnotherToken = {
        result: {
            success: true,
            data: {
                email: "dediwrong@gmail.com"
            }
        }
    }

    let idNotFound = "6669b72f3ee0ae2c2542e8e5";
    let idNotValid = "6669b72f3ee0ae2c2542e8e5123"

    const requestRegisterValid = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "age": 20,
        "password": "Password1!"
    }

    const requestUpdateValid = {
        "name": "Dedi 112",
        "age": 20
    }

    const requestEmptyAge = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112"
    }

    const requestRegisterEmptyAge = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "password": "Password1!",
    }

    const requestInvalidAge = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "age": 16
    }

    const requestRegisterInvalidAge = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "age": 16,
        "password": "Password1!"
    }

    const requestEmptyName = {
        "email": "dedi112@gmail.com",
        "age": 20
    }

    const requestRegisterEmptyName = {
        "email": "dedi112@gmail.com",
        "age": 20,
        "password": "Password1!"
    }

    const requestInvalidNameToShort = {
        "email": "dedi112@gmail.com",
        "name": "de",
        "age": 20
    }

    const requestInvalidRegisterNameToShort = {
        "email": "dedi112@gmail.com",
        "name": "de",
        "age": 20,
        "password": "Password1!"
    }

    const requestInvalidNameToLong = {
        "email": "dedi112@gmail.com",
        "name": "asdasdadsasdasdasd",
        "age": 20,
    }

    const requestInvalidRegisterNameToLong = {
        "email": "dedi112@gmail.com",
        "name": "asdasdadsasdasdasd",
        "age": 20,
        "password": "Password1!"
    }

    const requestInvalidRegisterEmailWrongFormat = {
        "email": "dedi112.gmail.com",
        "name": "dedi",
        "age": 20,
        "password": "Password1!"
    }

    const requestEmptyEmail = {
        "name": "dedi",
        "age": 20,
        "password": "Password1!"
    }

    const requestEmptyPassword = {
        "email": "dedi112@gmail.com",
        "name": "dedi",
        "age": 20
    }

    const requestWeakPassword = {
        "email": "dedi112@gmail.com",
        "name": "dedi",
        "age": 20,
        "password": "password"
    }


    beforeAll(async () => {
        await dbconnect();
    })
    afterAll(async () => {
        await dbclose();
    })
    beforeEach(async () => {
        const newPlayer = new Player({
            name: "Dedi",
            email: "dedi@gmail.com",
            age: 20
        })
        player = await newPlayer.save();
        rpcResultTrue = {
            result: {
                success: true,
                data: {
                    email: player.email
                }
            }
        }
    })

    beforeEach(async () => {
        allPlayers = await Player.find();
    })

    afterEach(async () => {
        await Player.deleteMany();
    })
    test("should be success get all players ", async () => {
        const res = await request(app).get("/");
        expect(res.body).toHaveProperty("data");
        expect(res.statusCode).toBe(200);
        expect(res.body.data[0].name).toEqual(allPlayers[0].name);
    });
    test("should be  success get player by id ", async () => {
        const res = await request(app).get(`/${player._id}`);
        expect(res.body).toHaveProperty("data");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toEqual(player.name);
    });
    test("should be success delete player by valid id", async () => {
        const mockRPCGetDataFromToken = jest.fn(() => rpcResultTrue);
        const mockRPCDelete = jest.fn(() => rpcResultTrue);

        jest.spyOn(AuthClient.prototype, "getDataFromToken").mockImplementationOnce(() => mockRPCGetDataFromToken());
        jest.spyOn(AuthClient.prototype, "delete").mockImplementationOnce(() => mockRPCDelete());

        const res = await request(app).delete(`/${player._id}`);
        expect(mockRPCGetDataFromToken).toHaveBeenCalledTimes(1);
        expect(mockRPCDelete).toHaveBeenCalledTimes(1);

        expect(res.body).toHaveProperty("data");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toEqual(player.name);
    });

    test("should be success update player by valid id", async () => {
        const mockRPCGetDataFromToken = jest.fn(() => rpcResultTrue);

        jest.spyOn(AuthClient.prototype, "getDataFromToken").mockImplementationOnce(() => mockRPCGetDataFromToken());

        const res = await request(app).put(`/${player._id}`).send(requestUpdateValid);
        expect(mockRPCGetDataFromToken).toHaveBeenCalledTimes(1);

        expect(res.body).toHaveProperty("data");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toEqual(requestUpdateValid.name);
    });
    test("should be success register player by request valid", async () => {
        const mockRPCRegister = jest.fn(() => rpcResultTrue);

        jest.spyOn(AuthClient.prototype, "register").mockImplementationOnce(() => mockRPCRegister());

        const res = await request(app).post(`/`).send(requestRegisterValid);

        expect(mockRPCRegister).toHaveBeenCalledTimes(1);

        expect(res.body).toHaveProperty("data");
        expect(res.statusCode).toBe(201);
        expect(res.body.data.name).toEqual(requestRegisterValid.name);
    });

    test("should be failed get player by id not found ", async () => {
        const res = await request(app).get(`/${idNotFound}`);
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(404);
    });

    test("should be failed get player by id is not valid ", async () => {
        const res = await request(app).get(`/${idNotValid}`);
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
    });

    test("should be failed update by id because age is empty ", async () => {
        const mockRPCGetDataFromToken = jest.fn(() => rpcResultTrue);

        jest.spyOn(AuthClient.prototype, "getDataFromToken").mockImplementationOnce(() => mockRPCGetDataFromToken());

        const res = await request(app).put(`/${player._id}`).send(requestEmptyAge);

        expect(mockRPCGetDataFromToken).toHaveBeenCalledTimes(0);
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("required")
    });
    test("should be failed update by id because id not found ", async () => {
        const mockRPCGetDataFromToken = jest.fn(() => rpcResultTrue);

        jest.spyOn(AuthClient.prototype, "getDataFromToken").mockImplementationOnce(() => mockRPCGetDataFromToken());

        const res = await request(app).put(`/${idNotFound}`).send(requestUpdateValid);

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(404);
        expect(res.body.errors).toContain("not found")
    });

    test("should be failed update by id because age is less than 17 ", async () => {
        const mockRPCGetDataFromToken = jest.fn(() => rpcResultTrue);

        jest.spyOn(AuthClient.prototype, "getDataFromToken").mockImplementationOnce(() => mockRPCGetDataFromToken());

        const res = await request(app).put(`/${player._id}`).send(requestInvalidAge);

        expect(mockRPCGetDataFromToken).toHaveBeenCalledTimes(0);
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("too young")
    });

    test("should be failed update by id because name is empty ", async () => {
        const mockRPCGetDataFromToken = jest.fn(() => rpcResultTrue);

        jest.spyOn(AuthClient.prototype, "getDataFromToken").mockImplementationOnce(() => mockRPCGetDataFromToken());

        const res = await request(app).put(`/${player._id}`).send(requestEmptyName);

        expect(mockRPCGetDataFromToken).toHaveBeenCalledTimes(0);
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("required")
    });
    test("should be failed update by id because name is too short ", async () => {
        const mockRPCGetDataFromToken = jest.fn(() => rpcResultTrue);

        jest.spyOn(AuthClient.prototype, "getDataFromToken").mockImplementationOnce(() => mockRPCGetDataFromToken());

        const res = await request(app).put(`/${player._id}`).send(requestInvalidNameToShort);

        expect(mockRPCGetDataFromToken).toHaveBeenCalledTimes(0);
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("too short")
    });

    test("should be failed update by id because name is too long ", async () => {
        const mockRPCGetDataFromToken = jest.fn(() => rpcResultTrue);

        jest.spyOn(AuthClient.prototype, "getDataFromToken").mockImplementationOnce(() => mockRPCGetDataFromToken());

        const res = await request(app).put(`/${player._id}`).send(requestInvalidNameToLong);

        expect(mockRPCGetDataFromToken).toHaveBeenCalledTimes(0);
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("too long")
    });

    test("should be failed register because age is empty ", async () => {
        const res = await request(app).post(`/`).send(requestRegisterEmptyAge);

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("required")
    });
    test("should be failed register by id because age is less than 17 ", async () => {
        const res = await request(app).post(`/`).send(requestRegisterInvalidAge);

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("too young")
    });

    test("should be failed register by id because name is empty ", async () => {
        const res = await request(app).post(`/`).send(requestRegisterEmptyName);

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("required")
    });
    test("should be failed register by id because name is too short ", async () => {
        const res = await request(app).post(`/`).send(requestInvalidRegisterNameToShort);

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("too short")
    });

    test("should be failed register by id because name is too long ", async () => {
        const res = await request(app).post(`/`).send(requestInvalidRegisterNameToLong);

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("too long")
    });

    test("should be failed register by id because email is empty ", async () => {
        const res = await request(app).post(`/`).send(requestEmptyEmail);

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("required")
    });
    test("should be failed register by id because email is wrong format ", async () => {
        const res = await request(app).post(`/`).send(requestInvalidRegisterEmailWrongFormat);

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("invalid email format")
    });
    test("should be failed register by id because password is empty ", async () => {
        const res = await request(app).post(`/`).send(requestEmptyPassword);

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("required")
    });
    test("should be failed register by id because password is weak ", async () => {
        const res = await request(app).post(`/`).send(requestWeakPassword);

        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain("weak")
    });

    test.todo("should be failed get all players because mongoose connection close/unconnected ");
    test.todo("should be failed get player by id because mongoose connection close/unconnected ");
    test.todo("should be failed update by id because mongoose connection close/unconnected ");
    test.todo("should be failed create  because mongoose connection close/unconnected ");
    test.todo("should be failed delete because mongoose connection close/unconnected ");
    test.todo("should be failed update by id because rpc error ");
    test("should be failed create because rpc error ", async () => {
        const mockRPCRegister = jest.fn(() => rpcresultFailed);

        jest.spyOn(AuthClient.prototype, "register").mockImplementationOnce(() => mockRPCRegister());

        const res = await request(app).post(`/`).send(requestRegisterValid);

        expect(mockRPCRegister).toHaveBeenCalledTimes(1);
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(500);
    });
    test.todo("should be failed delete because rpc error ");

})