import { IUserRepository } from "../#Repositories/Interfaces/IUserRepository";
import { sequelize } from "../Databases/database"; 
import { Role } from "../Enums/Roles";
import { UserModel } from "../Models/userModel";
beforeAll(async () => {
    await sequelize.sync();
});

class MockUserRepository implements IUserRepository{
    create = jest.fn();
    retrieveAll = jest.fn();
    retrieveByName = jest.fn();
}

const mockUserRepository = new MockUserRepository();

describe("Testing User Moderl", () => {

    

    test("Creating a normal email without errors", () => {
        
        mockUserRepository.retrieveByName.mockResolvedValue("");

        
        const userModel = new UserModel();
        
        userModel.id = 1;
        userModel.SetUsername("dalas@gmail.com");
        userModel.password = "Nelson";
        userModel.role = Role.Admin;
        

        expect(()=>{
            userModel.SetUsername("dalas@gmail.com")
        }).not.toThrow()
        expect(()=>{
            userModel.SetUsername("ds")
        }).toThrow()

        expect(userModel.password).toBeDefined();
        expect(userModel.id).toBe(1);
        expect(userModel.role).toBe(Role.Admin);
    });
});
afterAll(async () => {
    await sequelize.close();
});