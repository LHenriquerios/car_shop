import { Request, Response, NextFunction } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class FrameController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request & { body: ICar },
    res: Response<ICar>,
    next: NextFunction,
  ) {
    try {
      const results = await this._service.create(req.body);
      return res.status(201).json(results);
    } catch (err) {
      next(err);
    }
  }
  public async getById(
    req: Request,
    res: Response<ICar>,
    next: NextFunction,
  ) {
    try {
      const result = await this._service.readOne(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async getAll(
    req: Request,
    res: Response<ICar[]>,
    next: NextFunction,
  ) {
    try {
      const result = await this._service.read();
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    req: Request,
    res: Response<ICar | null>,
    next: NextFunction,
  ) {
    try {
      const result = await this._service.update(req.params.id, req.body);
      
      if (!result) throw new Error('EntityNotFound');

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async delete(
   
    req: Request, 
    res: Response<ICar | null>,
    next: NextFunction,
  ) {
    try {
      const result = await this._service.delete(req.params.id);
      if (!result) throw new Error('EntityNotFound');

      return res.status(204).json(result);
    } catch (err) {
      next(err);
    }
  }
}