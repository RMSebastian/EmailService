export interface IUserService{
    signUp(): Promise<string>;
    signIn(): Promise<string>;
}