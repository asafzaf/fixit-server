const request = require("supertest");
const app = require("../app/app");
const faultRepository = require("../repositories/fault.repository");
const { NotFoundError, BadRequestError } = require("../errors/errors");

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
}, 30000);

// GET all faults by id
describe("GET /api/v1/fault/user/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return all fault by id", async () => {
    const userId = "1";
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

    faultRepository.find.mockResolvedValue(mockFaults);

    const res = await request(app).get("/api/v1/fault");
    const test = res.data;
    console.log(test);
    // const fa = res.data.faults.filter(
    //   (fault) => fault.reportByUser.toString() === userId
    // );
    const mockRes = {
      data: {
        fa: fa,
      },
      results: 1,
      status: "success",
    };
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });
}, 30000);

// GET fault by id
describe("GET /api/v1/fault/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return a fault by id", async () => {
    const userId = "1";
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
      //   results: 1,
      status: "success",
    };

    faultRepository.retrieve.mockResolvedValue(mockFaults);

    const res = await request(app).get("/api/v1/fault/:id");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });
}, 30000);

// POST fault
describe("POST /api/v1/fault/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should create a fault", async () => {
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

    const res = await request(app).post("/api/v1/fault/");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockRes);
  });
}, 30000);

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
