const request = require("supertest");
const app = require("../app/app");
const buildingRepository = require("../repositories/building.repository");
// const { ServerError } = require("../errors/errors");

jest.mock("../repositories/building.repository");

// GET all
describe("GET /api/v1/building/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return all buildings", async () => {
    const mockBuildings = [
      {
        id: "1",
        donorName: "eliya",
        amount: "200",
        location: "modiin",
      },
      {
        id: "2",
        donorName: "mendi",
        amount: "300",
        location: "modiin",
      },
    ];

    const mockBuildingsRes = {
      data: {
        buildings: mockBuildings,
      },
      results: 2,
      status: "success",
    };

    buildingRepository.find.mockResolvedValue(mockBuildings);

    const res = await request(app).get("/api/v1/building/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockBuildingsRes);
  });
});
