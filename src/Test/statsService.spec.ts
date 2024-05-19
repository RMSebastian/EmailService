import { IEmailRepository } from "../#Repositories/Interfaces/IEmailRepository";
import { IUserRepository } from "../#Repositories/Interfaces/IUserRepository";
import { StatsService } from "../#Services/statsService";
import { sequelize } from "../Databases/database";
import { Role } from "../Enums/Roles";
import { EmailModel } from "../Models/emailModel";
import { UserModel } from "../Models/userModel";
beforeAll(async ()=>{
    await sequelize.sync();
})
class MockEmailRepository implements IEmailRepository{
    create = jest.fn();
    retrieveAll = jest.fn();
    retrieveCountEmails = jest.fn();
}
const mockEmailRepository = new MockEmailRepository();

class MockUserRepository implements IUserRepository{
    create = jest.fn();
    retrieveAll = jest.fn();
    retrieveByName = jest.fn();
}
const mockUserRepository = new MockUserRepository();
const userModel = new UserModel();
        
userModel.id = 1;
userModel.SetUsername("dalas@gmail.com");
userModel.password = "Nelson";
userModel.role = Role.User;

const userModelTwo = new UserModel();

userModel.id = 2;
userModel.SetUsername("man@gmail.com");
userModel.password = "Manfred";
userModel.role = Role.User;

const emailModel = new EmailModel();
emailModel.id = 1;
emailModel.senderId = 1;
emailModel.headline = "Test Headline";
emailModel.content = "Test Content";
emailModel.SetSender("sender@gmail.com");
emailModel.SetReceiver("receiver@gmail.com");

const emailModelTwo = new EmailModel();
emailModel.id = 2;
emailModel.senderId = 1;
emailModel.headline = "Test Headline";
emailModel.content = "Test Content";
emailModel.SetSender("sender@gmail.com");
emailModel.SetReceiver("receiver@gmail.com");

const emailModelThree = new EmailModel();
emailModel.id = 3;
emailModel.senderId = 2;
emailModel.headline = "Test Headline";
emailModel.content = "Test Content";
emailModel.SetSender("sender@gmail.com");
emailModel.SetReceiver("receiver@gmail.com");
const userModels: UserModel[] = [userModel, userModelTwo]

const emailModelGroupOne: EmailModel[] = [emailModel,emailModelTwo];
const emailModelGroupTwo: EmailModel[] = [emailModelThree];

const statsService: StatsService = new StatsService(mockUserRepository, mockEmailRepository)

describe("Testing Stat Service",()=>{
    test("Recovery of Data",async()=>{
        mockUserRepository.retrieveAll.mockReturnValue(userModels);
        mockEmailRepository.retrieveCountEmails
        .mockReturnValueOnce(emailModelGroupOne.length) 
        .mockReturnValueOnce(emailModelGroupTwo.length) 

        const data: {name: string, amount: number}[] = await statsService.GetStats();

        expect(data).toEqual([
            { name: userModels[0].username, amount: 2 },
            { name: userModels[1].username, amount: 1 }
        ]);
    })

    test("Recovery of Users Null",async()=>{
        mockUserRepository.retrieveAll.mockReturnValue(null);

        await expect(statsService.GetStats()).rejects.toThrow();
    })

    test("Exposed Half users",async()=>{
        mockUserRepository.retrieveAll.mockReturnValue(userModels);
        mockEmailRepository.retrieveCountEmails
        .mockReturnValueOnce(emailModelGroupOne.length) 
        .mockReturnValueOnce(0) 
        const data: {name: string, amount: number}[] = await statsService.GetStats();
        expect(data).toEqual([
            { name: userModels[0].username, amount: 2 },
        ]);
    })
    test("Expect null user email",async()=>{
        mockUserRepository.retrieveAll.mockReturnValue(userModels);
        mockEmailRepository.retrieveCountEmails
        .mockReturnValueOnce(0) 
        .mockReturnValueOnce(0) 
        await expect(statsService.GetStats()).rejects.toThrow();
    })

})

afterAll(async ()=>{
    await sequelize.close();
})
