interface IService<T> {
  create(obj:T):Promise<T>,
  getById(_id:string):Promise<T>,
  update(_id: string, body: T): Promise<T | null>,
  getAll(): Promise<T[]>,
  delete(_id: string): Promise<T | null>,
}
    
export default IService;