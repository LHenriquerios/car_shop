import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../errors/catalog';
import {
	carMock,
    carMockCreate,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId,
    carMockForDelete,
} from '../../mocks/carMock';

describe('Car Model', () => {
	const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
        sinon.stub(Model, 'find').resolves(carMock);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId);
		sinon.stub(Model, 'findByIdAndRemove').resolves(carMockForDelete);
	});

	after(() => {
		sinon.restore();
	});

    describe('get all car', () => {
		it('successfully found all', async () => {
			const getAll = await carModel.read();
			expect(getAll).to.be.deep.equal(carMock);
		});
	});


	describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMockCreate);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

	describe('searching a car by id', () => {
		it('successfully found', async () => {
			const carFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

	describe('changing a car', () => {
		it('successfully changed', async () => {
			const carsChanged = await carModel.update('62cf1fc6498565d94eba52cd', carMockForChange);
			expect(carsChanged).to.be.deep.equal(carMockForChangeWithId);
		});

		it('_id not found to change', async () => {
			try {
				await carModel.update('123ERRADO', carMockForChange);
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

    describe('delete a car', () => {
		it('successfully delete', async () => {
			const carsDeleted = await carModel.delete('62ea735ba3cc0327ef8947a0');
			expect(carsDeleted).to.be.deep.equal(carMockForDelete);
		});

		it('_id not found to delete', async () => {
			try {
				await carModel.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

});