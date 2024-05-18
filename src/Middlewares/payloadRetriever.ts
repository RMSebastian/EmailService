import jwt from 'jsonwebtoken';

export async function RetrievePayload(token:string):Promise<{username: string, id:string, role: string} | null> {
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT as string);

        const{username, id, role} = decodedToken as {username: string, id:string, role: string}

        return {username, id, role} ;
    }catch(error){
        console.error("Error al enviar el correo electrónico de MailGun:", error);
        throw error;
    }
    
}