import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import {
	carMock,
    carMockCreate,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId,
    carMockForDelete,
} from '../../mocks/carMock';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);
 
	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'update').resolves(carMockForChangeWithId);
		sinon.stub(carModel, 'getById')
			.onCall(0).resolves(carMockWithId) 
			.onCall(1).resolves(null)
			.onCall(2).resolves(carMockWithId)
			.onCall(3).resolves(carMockWithId); 
		sinon.stub(carModel, 'getAll').resolves(carMock);
		sinon.stub(carModel, 'delete').resolves(carMockForDelete);
	});
	after(() => {
		sinon.restore()
	});

    describe('Get All cars', () => {
		it('Success', async () => {
			const cars = await carService.getAll();

			expect(cars).to.be.deep.equal(carMock);
		});
	});

	describe('Create car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMockCreate);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('Get car by id', () => {
		it('Success', async () => {
			const carCreated = await carService.getById(carMockWithId._id);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.getById(carMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Update car', () => {
        it('successfully changed', async () => {
			const carsChanged = await carService.update('62cf1fc6498565d94eba52cd', carMockForChange);
            
			expect(carsChanged).to.be.deep.equal(carMockForChangeWithId);
		});
	});

	describe('Delete car', () => {
		it('Success', async () => {
		  const carDeleted = await carService.delete('62ea7068a3cc0327ef894793');
		  expect(carDeleted).to.be.deep.equal(carMockForDelete);
		});
	});
});