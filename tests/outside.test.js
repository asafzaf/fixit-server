const request = require("supertest");
const app = require("../app/app");
const outsideRepository = require("../repositories/outside.repository");
const { ServerError } = require("../errors/errors");

jest.mock("../repositories/outside.repository");

// GET all outsides
describe("GET /api/v1/outside/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return all outsides", async () => {
    const mockOutsides = [
      {
        id: "65de252ea3d05e2037bf355c",
        outsideName: "Fernik Area",
        outsideDescription: "The place around Fernik Area including Karnaf",
        spaces: [
          {
            spaceName: "Fernik",
            spaceType: "cafeteria",
          },
        ],
      },
    ];

    const mockRes = {
      data: {
        outsides: mockOutsides,
      },
      results: 1,
      status: "success",
    };

    outsideRepository.find.mockResolvedValue(mockOutsides);

    const res = await request(app).get("/api/v1/outside/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });

  it("should return 500 when an error occurs", async () => {
    const mockRes = {
      status: "fail",
      message: "Internal Server Error - Couldn't getOutsides.",
      name: "ServerError",
      stack: null,
    };

    outsideRepository.find.mockRejectedValue(
      new ServerError("getOutsides")
    );

    const res = await request(app).get("/api/v1/outside");
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(mockRes);
  });
});
