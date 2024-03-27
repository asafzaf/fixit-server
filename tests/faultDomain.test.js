const request = require("supertest");
const app = require("../app/app");
const faultDomainRepository = require("../repositories/faultDomain.repository");
const { NotFoundError, BadRequestError } = require("../errors/errors");

jest.mock("../repositories/faultDomain.repository");

// GET all fault domains
describe("GET /api/v1/fault-domain/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return all fault domains", async () => {
    const mockFaultDomains = [
      {
        _id: "1",
        id: 202,
        name: "water",
        description: "water",
        types: [
          {
            id: 101,
            name: "leak",
            description: "leak",
          },
        ],
      },
      {
        _id: "2",
        id: 300,
        name: "toilet",
        description: "toilet",
        types: [
          {
            id: 301,
            name: "leak",
            description: "leak",
          },
        ],
      },
    ];

    const mockRes = {
      data: {
        faultDomains: mockFaultDomains,
      },
      results: 2,
      status: "success",
    };

    faultDomainRepository.find.mockResolvedValue(mockFaultDomains);

    const res = await request(app).get("/api/v1/fault-domain");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });
}, 30000);

// GET fault domain by id
describe("GET /api/v1/fault-domain/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should fault domains by id", async () => {
    const mockFaultDomains = [
      {
        _id: "1",
        id: 202,
        name: "water",
        description: "water",
        types: [
          {
            id: 101,
            name: "leak",
            description: "leak",
          },
        ],
      },
    ];

    const mockRes = {
      data: {
        faultDomain: mockFaultDomains,
      },
      status: "success",
    };

    faultDomainRepository.retrieve.mockResolvedValue(mockFaultDomains);

    const res = await request(app).get("/api/v1/fault-domain/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });
}, 30000);
