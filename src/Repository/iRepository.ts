export interface IRepository<T>{
    create(model: T): Promise<void>;
    update(model: T): Promise<void>;
    delete(idModel: number): Promise<void>;
    retrieveById(idModel: number): Promise<T>;
    retrieveAll(): Promise<T[]>;
}