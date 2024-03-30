const request = require("supertest");
const app = require("../app/app");
const userRepository = require("../repositories/user.repository");
const { NotFoundError, BadRequestError } = require("../errors/errors");

jest.mock("../repositories/user.repository");

// GET all users
describe("GET /api/v1/user/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return all users", async () => {

    const mockUsers = [
      {
        id: "65de252ea3d05e2037bf355c",
        name: "Asaf",
        email: "asaf@asaf.com",
        password: "1234",
        isMaintenace: true,
      },
      {
        id: "65de252ea3d05e2011bf355c",
        name: "Eliya",
        email: "eliya@eliya.com",
        password: "1234",
        isMaintenace: false,
      },
    ];

    const mockRes = {
      data: {
        spaceTypes: mockUsers,
      },
      results: 2,
      status: "success",
    };

    userRepository.find.mockResolvedValue(mockUsers);

    const res = await request(app).get("/api/v1/user");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });
});

describe("GET /api/v1/user/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return a user", async () => {
    const mockUser = {
      id: "65de252ea3d05e2037bf355c",
      name: "Asaf",
      email: "asaf@asaf.com",
      isMaintenace: true,
    };

    const mockRes = {
      data: {
        user: mockUser,
      },
      status: "success",
    };

    userRepository.retrieve.mockResolvedValue(mockUser);

    const res = await request(app).get("/api/v1/user/65de252ea3d05e2037bf355c");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });

  it("should return 404 when user not found", async () => {
    userRepository.retrieve.mockResolvedValue(null);

    const res = await request(app).get("/api/v1/user/65de252ea3d05e2037bf355c");
    expect(res.statusCode).toEqual(404);

  });

  it("should return 400 when user id is invalid", async () => {
    const res = await request(app).get("/api/v1/user/123");
    expect(res.statusCode).toEqual(400);
  });
});
