import { IUserRepository } from "../#Repositories/Interfaces/IUserRepository";
import { IUserService } from "../#Services/Interfaces/IUserService";
import { UserService } from "../#Services/userService";
import { sequelize } from "../Databases/database";
import { Role } from "../Enums/Roles";
import { UserModel } from "../Models/userModel";
import jwt from "jsonwebtoken";

beforeAll(async ()=>{
    await sequelize.sync();
})

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
userModel.role = Role.Admin;

const userService: IUserService = new UserService(userModel, mockUserRepository);

describe("Testing Email Service",()=>{
    beforeEach(() => {
        // Limpia el estado de los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    test("Test token provided SignUp",async ()=>{
        mockUserRepository.retrieveByName.mockResolvedValue(null);
        mockUserRepository.create.mockResolvedValue(userModel);

        const token: string = await userService.signUp();

        expect(mockUserRepository.retrieveByName).toHaveBeenCalledWith(userModel.username);
        expect(token).toBeDefined();
        expect(mockUserRepository.create).toHaveBeenCalledWith(userModel);

        const decodedToken = jwt.verify(token, process.env.SECRET_JWT as string);
        expect(decodedToken).toHaveProperty('id', String(userModel.id));
        expect(decodedToken).toHaveProperty('username', userModel.username);
        expect(decodedToken).toHaveProperty('role', userModel.role);
    })

    test("Test token provided SignIn", async () =>{
        mockUserRepository.retrieveByName.mockResolvedValue(userModel);
        mockUserRepository.create(userModel);

        const token = await userService.signIn();

        expect(mockUserRepository.retrieveByName).toHaveBeenCalledWith(userModel.username);
        expect(token).toBeDefined();
        expect(mockUserRepository.create).toHaveBeenCalledWith(userModel);

        const decodedToken = jwt.verify(token, process.env.SECRET_JWT as string);
        expect(decodedToken).toHaveProperty('id', String(userModel.id));
        expect(decodedToken).toHaveProperty('username', userModel.username);
        expect(decodedToken).toHaveProperty('role', userModel.role);
    });

    test("RetrieveByName with something", async ()=>{
        mockUserRepository.retrieveByName
        .mockResolvedValue(null)
        .mockResolvedValueOnce(userModel);
        
        await expect(userService.signUp()).rejects.toThrow();

        await expect(userService.signIn()).rejects.toThrow();
    })


});
afterAll(async () => {
    await sequelize.close();
});