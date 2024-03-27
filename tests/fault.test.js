const request = require("supertest");
const app = require("../app/app");
const faultRepository = require("../repositories/fault.repository");
const { NotFoundError, BadRequestError } = require("../errors/errors");

jest.mock("../repositories/fault.repository");

// GET all faults by id
describe("GET /api/v1/fault", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return all faults", async () => {
    const mockFaults = [
      {
        id: "1",
        domainId: "1",
        domainNameEng: "Electric",
        faultTypeId: "101",
        faultTypeNameEng: "Exposed socket",
      },
    ];

    const mockRes = {
      data: {
        faults: mockFaults,
      },
      results: 2,
      status: "success",
    };

    faultRepository.find.mockResolvedValue();

    const res = await request(app).get("/api/v1/fault");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });
});

// GET fault
