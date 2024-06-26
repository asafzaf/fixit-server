const request = require("supertest");
const app = require("../app/app");
const spaceTypeRepository = require("../repositories/spaceType.repository");
const { ServerError } = require("../errors/errors");

jest.mock("../repositories/spaceType.repository");

// GET all space types
describe("GET /api/v1/space-type/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return all space types", async () => {
    const mockSpaceTypes = [
      {
        id: "65de252ea3d05e2037bf355c",
        name: "Toilet",
        type: "room",
        description: "A room containing a toilet and a sink",
      },
      {
        id: "65de252ea3d05e2011bf355c",
        name: "Kitchen",
        type: "room",
        description: "A room containing a stove, a sink and a fridge",
      },
    ];

    const mockRes = {
      data: {
        spaceTypes: mockSpaceTypes,
      },
      results: 2,
      status: "success",
    };

    spaceTypeRepository.find.mockResolvedValue(mockSpaceTypes);

    const res = await request(app).get("/api/v1/space-type");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });

  it("should return 500 when an error occurs", async () => {
    const mockRes = {
      status: "fail",
      message: "Internal Server Error - Couldn't getSpaceTypes.",
      name: "ServerError",
      stack: null,
    };

    spaceTypeRepository.find.mockRejectedValue(
      new ServerError("getSpaceTypes")
    );

    const res = await request(app).get("/api/v1/space-type");
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(mockRes);
  });
});
