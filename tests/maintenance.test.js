const request = require("supertest");
const app = require("../app/app");
const maintenanceRepository = require("../repositories/maintenance.repository");
const { NotFoundError, BadRequestError } = require("../errors/errors");

jest.mock("../repositories/maintenance.repository");

// GET maintenance
describe("GET /api/v1/maintenance/user/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return maintenance", async () => {
    const mockMaintenance = [
      {
        id: "65de252ea3d05e2037bf355c",
        userName: "water",
        buildings: [
          {
            buildingId: 1,
            buildingName: "Fernik",
          },
        ],
      },
    ];

    const mockRes = {
      data: {
        maintenance: mockMaintenance,
      },
      status: "success",
    };

    maintenanceRepository.find.mockResolvedValue(mockMaintenance);

    const res = await request(app).get(
      "/api/v1/maintenance/user/65de252ea3d05e2037bf355c"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });
}, 30000);
