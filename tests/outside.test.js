const request = require("supertest");
const app = require("../app/app");
const outsideRepository = require("../repositories/outside.repository");
const { NotFoundError, BadRequestError } = require("../errors/errors");

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
}, 30000);
