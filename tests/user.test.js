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
}, 30000);
