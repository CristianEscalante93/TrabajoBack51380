const chai= require('chai');
const supertest= require('supertest');
const { faker }= require('@faker-js/faker');
const UserController = require ("../src/controllers/user.controller.js")
const userController = new UserController

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing Ecommerce', () => {
  describe('Test de Productos', () => {
    it('En endpoint GET /api/products debe reflejarse los productos existentes', async () => {
      const response = await requester.get('/api/products');
      const { status, ok, _body } = response;
      
      expect(status).to.equal(200)
      expect((_body.payload.docs).length).to.not.equal(0);
      expect(_body.payload.docs[0]).to.have.property('_id');
    });
  });
  
  describe('Test de Carts', () => {
    it('En endpoint GET /api/carts debe reflejarse los carritos existentes', async () => {
      const response = await requester.get('/api/products');
      const { status, ok, _body } = response;
      
      expect(status).to.equal(200)
      expect((_body.payload.docs).length).to.not.equal(0);
      expect(_body.payload.docs[0]).to.have.property('_id');
    });
  });

  describe('Test de sessions', () => {
    const user = {
      firstName: 'Cristian',
      lastName: 'Escalante',
      age:30,
      email:'cris222@gmail.com' ,
      password: '123ccc',
    };

    it('En endpoint POST register', async () => {
      const response = await requester.post('/auth/register').send(user);
      const { status,request} = response;
      
      expect(status).to.equal(200)
      expect(request._data).to.have.property('email');
      expect(request._data).to.have.property('password');
      expect(request._data).to.have.property('lastName');
      expect(request._data).to.have.property('firstName');
      expect(request._data).to.have.property('age');
    });

    it('En endpoint POST login', async () => {
      const response = await requester.post('/auth/login').send({
        email: user.email,
        password: user.password,
      });
      const { status,request} = response;
    
      expect(status).to.equal(200)
      expect(request._data).to.have.property('email');
      expect(request._data).to.have.property('password');
    });

    it('En endpoint GET /api/sessions/ debe reflejarse las sessiones', async () => {
      const response = await requester.get('/api/sessions/current')
      const {status} = response;

      expect(status).to.equal(200)
    });

  });
});


