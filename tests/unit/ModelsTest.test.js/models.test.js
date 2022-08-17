const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');

const productsModel = require('../../../models/productsModel');



describe("Busca todos os produtos", () => {
  describe("Caso Erro", async () => {
    before(async () => {
      const products = [[]];
      sinon.stub(connection, "query").resolves(products);
    });
    after(async () => {
      connection.query.restore();
    });
    it("retorna null", async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.equal(null);
    });
  });

  describe('Caso OK', async() => {
    const products = [[
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
    ]];
    before(async() => {
      sinon.stub(connection, 'query').resolves(products)
    })
    after(async() => {
      connection.query.restore();
    });
    it('retorna um array', async function () {
      const resultado = await productsModel.getAll();
      expect(resultado).to.be.an('array');
    });
    it('retorna os produtos', async () => {
      const response = await productsModel.getAll();
      expect(response[0]).includes.all.keys("id", "name");
      expect(response[0]).to.have.a.property("id");
    });
  });

describe("Filtra um produto pelo id", () => {
  describe("Caso ERRO", async () => {
    before(async () => {
      const products = [[]];
      sinon.stub(connection, "query").resolves(products);
    });
      after(async () => {
          connection.query.restore();
    });
        it("retorna null", async () => {
          const response = await productsModel.getById(1);
          expect(response).to.be.equal(null);
    });
  });

  describe("Caso OK", async () => {
      const id = 1;
      const products = [[{
          id: 1,
          name: "Martelo de Thor",
        }]];
        before(async () => {
          sinon.stub(connection, "query").resolves(products);
        });
        after(async () => {
          connection.query.restore();
        });
        it("Retorna um objeto", async () => {
          const response = await productsModel.getById(id);
          expect(response).to.be.a("object");
        });
        it("Retorna os produtos", async () => {
          const response = await productsModel.getById(id);
          expect(response).includes.all.keys("id", "name");
          expect(response).to.have.a.property("id");
        });
    });
  });
});