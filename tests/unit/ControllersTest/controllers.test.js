const sinon = require("sinon");
const { expect } = require("chai");
const productsServices = require("../../../services/productsServices");
const productsController = require("../../../controllers/productsController");

const ERROR_MESSAGE = 'Product not found';

describe("Busca todos os produtos do controller", () => {
  describe("Se retornar null", async () => {
    const req = {};
    const res = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "getAll")
        .resolves({ code: 404, message: ERROR_MESSAGE });
    });
    after(() => {
      productsServices.getAll.restore();
    });
    it("deve retornar null", async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith('Product not found')).to.be.equal(true);
    });
  });

  describe("Se o filtro de produto é feito", async () => {
    const products = [
      [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ],
    ];
    const req = {};
    const res = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "getAll")
        .resolves(products);
    });
    after(() => {
      productsServices.getAll.restore();
    });
    it("Retorna um array de produtos", async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(products)).to.be.equal(true);
    });
  });
});


describe("Busca todos os produtos do controller'", () => {
  describe("quando retorna null", async () => {
    const req = {};
    const res = {};
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "getById")
        .resolves({ code: 404, message: ERROR_MESSAGE });
    });
    after(() => {
      productsServices.getById.restore();
    });
    it("deve retornar null", async () => {
      await productsController.getById(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: ERROR_MESSAGE })).to.be.equal(
        true
      );
    });
  });

  describe("Se o filtro de produto é feito", async () => {
    const products =
    {
      id: 1,
      name: "Martelo de Thor",
    };
    const req = {};
    const res = {};
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "getById")
        .resolves(products);
    });
    after(() => {
      productsServices.getById.restore();
    });
    it("Retorna um array de produtos", async () => {
      await productsController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(products)).to.be.equal(true);
    });
  });
});