export interface IEmailSender<T>{
    execute(object: T): Promise<void>;
}