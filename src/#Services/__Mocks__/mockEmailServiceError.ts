import { IEmailSender } from '../Interfaces/IEmailSender';
import { EmailModel } from '../../Models/emailModel';
class MockEmailServiceError implements IEmailSender<EmailModel>{
    async execute(email: EmailModel): Promise<void> {
        throw new Error("error");
    }
}

export default new MockEmailServiceError();