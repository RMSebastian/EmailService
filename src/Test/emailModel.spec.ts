import { sequelize } from "../Databases/database"; 
import { EmailModel } from "../Models/emailModel";

describe("Testing Email Service", () => {
    beforeAll(async () => {
        await sequelize.sync();
    });

    test("Creating a normal email without errors", () => {
        const emailModel = new EmailModel();

        emailModel.id = 1;
        emailModel.senderId = 1;
        emailModel.sender = "sender@gmail.com";
        emailModel.headline = "Test Headline";
        emailModel.content = "Test Content";

        expect(emailModel).toBeDefined();
        expect(emailModel.SetReceiver("receiver@gmail.com")).not.toThrow;
    });
    test("Creating an email with missing '@' and '.com'", () => {
        const emailModel = new EmailModel();

        expect(()=>{
            emailModel.SetReceiver("receiver.com");
        }).toThrow();
        expect(()=>{
            emailModel.SetReceiver(" receiver@com");
        }).toThrow();
        expect(()=>{
            emailModel.SetReceiver(" .comreceiver@com");
        }).toThrow();
    });
});