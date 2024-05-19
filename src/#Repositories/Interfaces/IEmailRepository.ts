import { EmailModel } from "../../Models/emailModel";

export interface IEmailRepository{
    create(model: EmailModel): Promise<void>;
    retrieveCountEmails(senderIdModel: number): Promise<number>;
    retrieveAll(): Promise<EmailModel[]>;
}