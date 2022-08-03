import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import CarController from '../../../controllers/Car';
import CarService from '../../../services/Car';
import CarModel from '../../../models/Car';
import {
	carMock,
  carMockCreate,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId,
  carMockForDelete,
} from '../../mocks/carMock';

describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  before(() => {
    sinon.stub(carService, 'getAll').resolves(carMock);
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'getById').resolves(carMockWithId);
    sinon.stub(carService, 'update').resolves(carMockForChangeWithId); //rever
    sinon.stub(carService, 'delete').resolves(carMockForDelete);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  });

  describe('Get all car', () => {
    it('Success', async () => {
      await carController.getAll(req, res, next);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('Create car', () => {
    it('Success', async () => {
      req.body = carMockCreate;
      await carController.create(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Get car by id', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.getById(req, res, next);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  //Problem is here!
  describe('Update car', () => {
    it('Success', async () => {
      req.params = { id: carMockForChangeWithId._id }
      req.body = carMockForChange;
      
      
      await carController.update(req, res, next);
  
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockForChange)).to.be.true;
    });
  });

  describe('Delete car', () => {
    it('Success', async () => {
      req.params = { id: carMockForChangeWithId._id }
      await carController.delete(req, res, next);
  
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockForChangeWithId)).to.be.true;
    });
  });
});