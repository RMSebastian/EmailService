import { sequelize } from "../Databases/database"; 
import { EmailModel } from "../Models/emailModel";
beforeAll(async () => {
    await sequelize.sync();
});
describe("Testing Email Service", () => {


    test("Creating a normal email without errors", () => {
        const emailModel = new EmailModel();

        emailModel.id = 1;
        emailModel.senderId = 1;
        emailModel.headline = "Test Headline";
        emailModel.content = "Test Content";

        expect(emailModel).toBeDefined();
        expect(emailModel.id).toBe(1);
        expect(emailModel.senderId).toBe(1);
        expect(emailModel.headline).toBe("Test Headline");
        expect(emailModel.content).toBe("Test Content");

        expect(() => {
            emailModel.SetReceiver("reciever@gmail.com");
        }).not.toThrow();
        expect(() => {
            emailModel.SetSender("sender@gmail.com");
        }).not.toThrow();
    });

    test("Creating an email with a missing '@' and '.com'", () => {
        const emailModel = new EmailModel();

        //No Try-catch functions are they
        expect(() => {
            emailModel.SetReceiver("receiver.com");
        }).toThrow("Invalid email address");
        expect(() => {
            emailModel.SetSender("sender.com");
        }).toThrow("Invalid email address");
    });
});
afterAll(async () => {
    await sequelize.close();
});