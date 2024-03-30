const request = require("supertest");
const app = require("../app/app");
const faultRepository = require("../repositories/fault.repository");
const { NotFoundError, BadRequestError } = require("../errors/errors");
const { use } = require("../routers/user.router");

jest.mock("../repositories/fault.repository");

// GET all faults
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
      {
        id: "2",
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

    faultRepository.find.mockResolvedValue(mockFaults);

    const res = await request(app).get("/api/v1/fault");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });

  it("should return not found error (404)", async () => {
    const mockFaults = [];

    const mockRes = {
      stack: null,
      status: "fail",
      message: "faults not found.",
      name: "NotFoundError",
    };

    faultRepository.find.mockResolvedValue(mockFaults);

    const res = await request(app).get("/api/v1/fault");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(mockRes);
  });
});

// GET all faults by id
describe("GET /api/v1/fault/user/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return all fault by user id", async () => {
    const userId = "65de252ea3d05e2037bf355b";
    const mockFaults = [
      {
        id: "1",
        domainId: "1",
        domainNameEng: "Electric",
        faultTypeId: "101",
        faultTypeNameEng: "Exposed socket",
        reportByUser: "1",
      },
      {
        id: "2",
        domainId: "1",
        domainNameEng: "Electric",
        faultTypeId: "101",
        faultTypeNameEng: "Exposed socket",
        reportByUser: "2",
      },
    ];

    const mockRes = {
      data: {
        faults: mockFaults,
      },
      results: mockFaults.length,
      status: "success",
    };

    faultRepository.find.mockResolvedValue(mockFaults);
    const res = await request(app).get(`/api/v1/fault/user/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });

  it("should return not found error (404)", async () => {
    const userId = "65de252ea3d05e2037bf355r";
    const mockFaults = [];

    const mockRes = {
      name: "NotFoundError",
      status: "fail",
      message: "fault not found.",
      stack: null,
    };

    faultRepository.find.mockResolvedValue(mockFaults);
    const res = await request(app).get(`/api/v1/fault/user/${userId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(mockRes);
  });
});

// GET fault by id
describe("GET /api/v1/fault/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return a fault by fault id", async () => {
    const faultId = "65de252ea3d05e2037bf355d";
    const mockFaults = [
      {
        id: "1",
        domainId: "1",
        domainNameEng: "Electric",
        faultTypeId: "101",
        faultTypeNameEng: "Exposed socket",
        reportByUser: "1",
      },
    ];

    const mockRes = {
      data: {
        fault: mockFaults,
      },
      status: "success",
    };

    faultRepository.retrieve.mockResolvedValue(mockFaults);
    const res = await request(app).get(`/api/v1/fault/${faultId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });

  it("should return not found error (404)", async () => {
    const faultId = "1";
    const mockFaults = [];

    const mockRes = {
      data: null,
      status: "error",
      message: "not found fault",
    };

    faultRepository.retrieve.mockResolvedValue(mockFaults);
    const res = await request(app).get(`/api/v1/fault/${faultId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(mockRes);
  });
});

// POST fault
describe("POST /api/v1/fault/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should create a fault", async () => {
    const mockFault = {
      // id: "1",
      domainId: "1",
      domainNameEng: "Electric",
      faultTypeId: "101",
      faultTypeNameEng: "Exposed socket",
      buildingNAme: "Fernik",
      outSide: false,
      outSideId: null,
      outSideName: null,
      floor: 0,
      spaceTypeId: "1",
      spaceTypeNameEng: "classroom",
      spaceNumber: "202",
      spaceName: "class 202",
      description: "Exposed socket",
      status: "closed",
      urgency: 3,
      reportByUser: "1",
    };

    const mockRes = {
      data: {
        fault: mockFault,
      },
      status: "success",
    };

    faultRepository.create.mockResolvedValue(mockFault);
    const res = await request(app).post("/api/v1/fault").send(mockFault);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockRes);
  });
});

// PUT fault
describe("PUT /api/v1/fault/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should update a fault", async () => {
    const mockFault = [
      {
        id: "1",
        domainId: "1",
        domainNameEng: "Electric",
        faultTypeId: "101",
        faultTypeNameEng: "Exposed socket",
        buildingNAme: "Fernik",
        outSide: false,
        outSideId: null,
        outSideName: null,
        floor: 0,
        spaceTypeId: "1",
        spaceTypeNameEng: "classroom",
        spaceNumber: "202",
        spaceName: "class 202",
        description: "Exposed socket",
        status: "closed",
        urgency: 3,
        reportByUser: "1",
      },
    ];

    const mockRes = {
      data: {
        fault: mockFault,
      },
      status: "success",
    };

    faultRepository.create.mockResolvedValue(mockFault);

    const res = await request(app).put("/api/v1/fault/:id");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });
}, 30000);

// DELETE fault
describe("DELETE /api/v1/fault/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should delete a fault", async () => {
    const mockFault = [
      {
        id: "1",
        domainId: "1",
        domainNameEng: "Electric",
        faultTypeId: "101",
        faultTypeNameEng: "Exposed socket",
        buildingNAme: "Fernik",
        outSide: false,
        outSideId: null,
        outSideName: null,
        floor: 0,
        spaceTypeId: "1",
        spaceTypeNameEng: "classroom",
        spaceNumber: "202",
        spaceName: "class 202",
        description: "Exposed socket",
        status: "closed",
        urgency: 3,
        reportByUser: "1",
      },
    ];

    const mockRes = {
      data: null,
      status: "success",
    };

    faultRepository.create.mockResolvedValue(mockFault.id);

    const res = await request(app).delete("/api/v1/fault/:id");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });
}, 30000);
