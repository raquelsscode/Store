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

describe('Insere um novo filme no BD', () => {
  describe('quando o nome nao é informado', () => {
    const product = {};
    before(async () => {
      sinon.stub(productsModel, "createProducts").resolves(product);
    });

    after(async () => {
      productsModel.createProducts.restore();
    });

    it("deve retornar message se o nome não for passado", async () => {
      const response = await productsServices.createProducts();
      expect(response).to.have.a.property("code");
      expect(response).to.be.contain({ "message": '"name" is required'});
    });

  });

  describe('quando o nome informado não é válido', () => {
    const product = 'lua'
    before(async () => {
      sinon.stub(productsModel, "createProducts").resolves(product);
    });

    after(async () => {
      productsModel.createProducts.restore();
    });

    it("deve retornar message", async () => {
      const response = await productsServices.createProducts(product);
      expect(response).to.have.a.property("code");
      expect(response).to.be.contain({ "message": '"name" length must be at least 5 characters long' });
    });

  });


  describe('quando é inserido com sucesso', () => {
    const product = {
      name: 'ProdutoY'
    };

    before(() => {
      const ID_EXAMPLE = 3;

      sinon.stub(productsModel, 'createProducts')
        .resolves({ id: ID_EXAMPLE });
    });

    after(() => {
      productsModel.createProducts.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.createProducts(product);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await productsServices.createProducts(product);

      expect(response).to.have.a.property('id');
    });

  });
});