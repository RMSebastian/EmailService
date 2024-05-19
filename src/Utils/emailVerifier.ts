export function validateEmail(person: string): string{
    try{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(emailRegex.test(person)){
            return person;
        }else{
            throw new Error("Invalid email adress");
        }
    }catch(error){
        throw error;
    }

}