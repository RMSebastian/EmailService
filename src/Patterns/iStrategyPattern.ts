export interface iStrategyPattern<T>{
    execute(object: T): Promise<void>;
}