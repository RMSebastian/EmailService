import { IEmailSender } from "../#Services/Interfaces/IEmailSender";
import mockEmailServiceError from "../#Services/__Mocks__/mockEmailServiceError";
import mockEmailServiceSuccess from "../#Services/__Mocks__/mockEmailServiceSuccess";
import { EmailModel } from "../Models/emailModel";

export const port: number = 3000;
export const emailAmountPerUser = 15;
export const emailSenders: IEmailSender<EmailModel>[] = [mockEmailServiceSuccess, mockEmailServiceError]