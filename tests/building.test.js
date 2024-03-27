const request = require("supertest");
const app = require("../app/app");
const buildingRepository = require("../repositories/building.repository");
const { NotFoundError, BadRequestError } = require("../errors/errors");

jest.mock("../repositories/building.repository");

// GET all buildings
describe("GET /api/v1/building/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return all buildings", async () => {
    const mockBuildings = [
      {
        id: "1",
        buildingName: "Fernik",
        floorsNumber: 1,
        floors: [
          {
            floorNumber: 1,
            spaces: [
              {
                spaceNumber: "5",
                spaceName: "office 5",
                spaceType: "office",
              },
            ],
          },
        ],
      },
      {
        id: "2",
        buildingName: "Mitchell",
        floorsNumber: 1,
        floors: [
          {
            floorNumber: 1,
            spaces: [
              {
                spaceNumber: "5",
                spaceName: "office 6",
                spaceType: "office",
              },
            ],
          },
        ],
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

  it("should return 404 when building no found", async () => {
    const mockRes = {
      status: "fail",
      message: "buildings not found.",
      name: "NotFoundError",
      stack: null,
    };

    buildingRepository.find.mockResolvedValue([]);

    const res = await request(app).get("/api/v1/building");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(mockRes);
  });
});

// GET building
describe("GET /api/v1/building/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return a building", async () => {
    const mockBuilding = [
      {
        id: "1",
        buildingName: "Fernik",
        floorsNumber: 1,
        floors: [
          {
            floorNumber: 1,
            spaces: [
              {
                spaceNumber: "5",
                spaceName: "office 5",
                spaceType: "office",
              },
            ],
          },
        ],
      },
    ];

    const mockBuildingsRes = {
      data: {
        buildings: mockBuilding,
      },
      results: 1,
      status: "success",
    };

    buildingRepository.find.mockResolvedValue(mockBuilding);

    const res = await request(app).get("/api/v1/building/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockBuildingsRes);
  });

  it("should return 404 when building no found", async () => {
    const mockBuildingId = "65e595e7e63f9c2cfa4ca1b5";

    const mockRes = {
      status: "fail",
      message: "building not found.",
      name: "NotFoundError",
      stack: null,
    };

    buildingRepository.retrieve.mockRejectedValue(
      new NotFoundError("building")
    );

    const res = await request(app).get(`/api/v1/building/${mockBuildingId}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(mockRes);
  });

  it("should return 400 when building id is invalid", async () => {
    const mockBuildingId = "65e595e7e63f9c2cfa4ca1b";

    const mockRes = {
      status: "fail",
      message: "please provide a valid id.",
      name: "BadRequestError",
      stack: null,
    };

    buildingRepository.retrieve.mockRejectedValue(new BadRequestError("id"));

    const res = await request(app).get(`/api/v1/building/${mockBuildingId}`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(mockRes);
  });
});
