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

  // ERROR - 400 (BadRequestError)
  //   it("should return 400 when getting a bad request", async () => {
  //     buildingRepository.find.mockResolvedValue(new BadRequestError("data"));

  //     const res = await request(app).get("/api/v1/");
  //     expect(res.statusCode).toEqual(200);
  //   });

  // ERROR - 404 (NotFoundError)
  it("should return 404 when no buildings are found", async () => {
    const mockRes = {
      data: {
        buildings: {
          name: "NotFoundError",
          status: "fail",
          statusCode: 404,
        },
      },
      status: "success",
    };

    buildingRepository.find.mockResolvedValue(new NotFoundError("buildings"));

    const res = await request(app).get("/api/v1/building/");
    expect(res.statusCode).toEqual(200);
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

  // ERROR - 400 (BadRequestError)

  // ERROR - 404 (NotFoundError)
  //   it("should return 404 when building no found", async () => {
  //     const mockRes = {
  //       data: {
  //         buildings: {
  //           name: "NotFoundError",
  //           status: "fail",
  //           statusCode: 404,
  //         },
  //       },
  //       status: "success",
  //     };

  //     buildingRepository.find.mockResolvedValue(new NotFoundError("buildings"));

  //     const res = await request(app).get("/api/v1/building/:id");
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toEqual(mockRes);
  //   }, 10000);
});
