import { ICar } from "../../interfaces/ICar";

const carMock:ICar[] & { _id: string }[] = [
	{
		"_id": "62ea7068a3cc0327ef894793",
		"model": "Ferrari Maranello",
		"year": 1963,
		"color": "red",
		"buyValue": 3500000,
		"doorsQty": 2,
		"seatsQty": 2
	},
	{
		"_id": "62ea70a3a3cc0327ef894796",
		"model": "Ferrari Marshmello",
		"year": 2001,
		"color": "white",
		"buyValue": 35000,
		"doorsQty": 4,
		"seatsQty": 3
	},
	{
		"_id": "62ea735ba3cc0327ef8947a0",
		"model": "Fiat Uno",
		"year": 2001,
		"color": "blue",
		"buyValue": 3500,
		"doorsQty": 4,
		"seatsQty": 4
	}
]

const carMockCreate:ICar = {
    "model": "Ferrari Maranello",
    "year": 1963,
    "color": "red",
    "buyValue": 3500000,
    "doorsQty": 2,
    "seatsQty": 2
};

const carMockWithId:ICar & { _id:string } = {
    "_id": "62ea7068a3cc0327ef894793",
    "model": "Ferrari Maranello",
    "year": 1963,
    "color": "red",
    "buyValue": 3500000,
    "doorsQty": 2,
    "seatsQty": 2
};

const carMockForChange:ICar = {
    "model": "Fiat Uno",
    "year": 2001,
    "color": "blue",
    "buyValue": 3500,
    "seatsQty": 4,
    "doorsQty": 4
};

const carMockForChangeWithId:ICar & { _id:string } = {
    "_id": "62ea735ba3cc0327ef8947a0",
    "model": "Fiat Uno",
    "year": 2001,
    "color": "blue",
    "buyValue": 3500,
    "seatsQty": 4,
    "doorsQty": 4
};

const carMockForDelete:ICar = {
    "model": "Fiat Uno",
    "year": 2001,
    "color": "blue",
    "buyValue": 3500,
    "seatsQty": 4,
    "doorsQty": 4
};

export {
	carMock,
    carMockCreate,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId,
    carMockForDelete,
};