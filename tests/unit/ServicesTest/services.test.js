const sinon = require("sinon");
const { expect } = require("chai");
const productsServices = require("../../../services/productsServices");
const productsModel = require("../../../models/productsModel");

describe("Busca todos os produtos", () => {
  describe("quando retorna null", async () => {
    before(async () => {
      const products = null;
      sinon.stub(productsModel, "getAll").resolves(products);
    });

    after(async () => {
      productsModel.getAll.restore();
    });

    it("deve retornar null", async () => {
      const response = await productsServices.getAll();
      expect(response).to.have.a.property("code");
      expect(response).to.have.a.property("message");
    });
  });

  describe("quando é pesquisado com sucesso", async () => {
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
    before(async () => {
      sinon.stub(productsModel, "getAll").resolves(products);
    });

    after(async () => {
      productsModel.getAll.restore();
    });

    it("Retorna um array", async () => {
      const response = await productsServices.getAll();
      expect(response).to.be.an("array");
    });

    it("Nao retorna um array vazio", async () => {
      const response = await productsServices.getAll();
      expect(response).to.not.be.empty;
    });
  });
});

describe("Busca um produto pelo ID", () => {
  describe("quando é pesquisado em caso de erro", async () => {
    before(async () => {
      const products = null;
      sinon.stub(productsModel, "getById").resolves(products);
    });

    after(async () => {
      productsModel.getById.restore();
    });

    it("deve retornar null", async () => {
      const response = await productsServices.getById(1);
      expect(response).to.have.a.property("code");
      expect(response).to.have.a.property("message");
    });
  });

  describe("quando é pesquisado com sucesso", async () => {
    const id = 1;
    const products = [
      [
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ],
    ];
    before(async () => {
      sinon.stub(productsModel, "getById").resolves(products);
    });

    after(async () => {
      productsModel.getById.restore();
    });

    it("Retorna um objeto", async () => {
      const response = await productsServices.getById(id);
      expect(response).to.be.an("array");
    });

    it("Nao retorna vazio", async () => {
      const response = await productsModel.getById(id);
      expect(response).to.not.be.empty;
    });
  });
});