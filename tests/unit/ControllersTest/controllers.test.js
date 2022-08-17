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

describe('Ao chamar o controller de create', () => {
    describe("quando o name não é informado", async () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon
          .stub(productsServices, "createProducts")
          .resolves({ code: 400, message: '"name" is required' });
      });

      after(() => {
        productsServices.createProducts.restore();
      });

      it("é chamado o status com o código 400", async () => {
        await productsController.createProducts(request, response);
        expect(response.status.calledWith(400)).to.be.equal(true);
      });
    });


    describe("quando o name é Inválido", async () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = { name: "abc" };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon
          .stub(productsServices, "createProducts")
          .resolves({
            code: 422,
            message: '"name" length must be at least 5 characters long',
          });
      });

      after(() => {
        productsServices.createProducts.restore();
      });

      it("é chamado o status com o código 422", async () => {
        await productsController.createProducts(request, response);
        expect(response.status.calledWith(422)).to.be.equal(true);
        expect(response.json.calledWith({ message: '"name" length must be at least 5 characters long',
        })).to.be.equal(true);
      });
    });
  });


describe("quando é inserido com sucesso", async () => {
  const response = {};
  const request = {};
  const newProduct = {
    id: 1,
    name: "ProductZ",
  };

  before(() => {
    request.body = {
      name: "ProductZ"
    };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsServices, "createProducts").resolves(newProduct);
  });

  after(() => {
    productsServices.createProducts.restore();
  });

  it("é chamado o status com o código 201", async () => {
    await productsController.createProducts(request, response);

    expect(response.status.calledWith(201)).to.be.equal(true);
  });
});