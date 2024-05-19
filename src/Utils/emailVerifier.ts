export function validateEmail(person: string): string{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(person)) {
        throw new Error("Invalid email address");
    }
    return person;

}