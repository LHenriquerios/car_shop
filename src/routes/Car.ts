import { Router } from 'express';
import CarController from '../controllers/Car';
import CarModel from '../models/Car';
import CarService from '../services/Car';

const route = Router();
 
const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/cars', (req, res, next) => carController.create(req, res, next));
route.get('/cars', (req, res, next) => carController.getAll(req, res, next));
route.get('/cars/:id', (req, res, next) => 
  carController.getById(req, res, next));
route.put('/cars/:id', (req, res, next) => 
  carController.update(req, res, next));
route.delete('/cars/:id', (req, res, next) => 
  carController.delete(req, res, next));

export default route;