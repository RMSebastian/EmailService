import { IEmailRepository } from "../#Repositories/Interfaces/IEmailRepository";
import { IEmailSender } from "../#Services/Interfaces/IEmailSender";
import { EmailService } from "../#Services/emailService";
import { sequelize } from "../Databases/database";
import { EmailModel } from "../Models/emailModel";

beforeAll(async () => {
    await sequelize.sync();
});
class MockEmailRepository implements IEmailRepository {
    retrieveCountEmails = jest.fn();
    create = jest.fn();
    retrieveAll = jest.fn();
}
const mockEmailRepository = new MockEmailRepository();


class MockEmailSender implements IEmailSender<EmailModel>{
    execute = jest.fn()
}
const mockEmailSender = new MockEmailSender();
const mockEmailSenderTwo = new MockEmailSender();


const emailModel = new EmailModel();
emailModel.id = 1;
emailModel.senderId = 1;
emailModel.headline = "Test Headline";
emailModel.content = "Test Content";
emailModel.SetSender("sender@gmail.com");
emailModel.SetReceiver("receiver@gmail.com");

const emailService: EmailService = new EmailService(
    emailModel,
    mockEmailRepository,
    [mockEmailSender, mockEmailSenderTwo]
);



describe("Testing Email Service", () => {
    beforeEach(() => {
        // Limpia el estado de los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    test("Send email successfully", async () => {
        
        mockEmailRepository.retrieveCountEmails.mockResolvedValue(10); 
        mockEmailSender.execute.mockResolvedValue(undefined); 
        
        await emailService.sendEmail();

        expect(mockEmailRepository.create).toHaveBeenCalledWith(emailModel);
    });

    test("Send email throws error when email count exceeds limit", async () => {
        
        mockEmailRepository.retrieveCountEmails.mockResolvedValue(10001); 

        await expect(emailService.sendEmail()).rejects.toThrow("Enough messages for you pal");

        expect(mockEmailRepository.create).not.toHaveBeenCalled();
    });

    test("Send email throws error when no email sender is available", async () => {
        
        mockEmailRepository.retrieveCountEmails.mockResolvedValue(10);
        mockEmailSender.execute.mockRejectedValue(new Error("Email sender service failed"));
        mockEmailSenderTwo.execute.mockResolvedValue(undefined);

        await emailService.sendEmail();
        
        expect(mockEmailRepository.create).toHaveBeenCalledWith(emailModel);
    });
});

afterAll(async () => {
    await sequelize.close();
});
