import { sequelize } from "../Databases/database";
import { EmailModel } from "../Models/emailModel";

class EmailRepository{
    async create(model: EmailModel): Promise<void> {
        try{
            EmailModel.create({
                senderId: model.senderId,
                sender: model.sender,
                receiver: model.receiver,
                headline: model.headline,
                content: model.content,
            });
        }catch(err){
            throw new Error("📥❌ Save Error");
        }
    }
    async update(model: EmailModel): Promise<void> {
        try{
            const newModel = await EmailModel.findOne({where: {id: model.id}})
            if(!newModel) throw new Error("📯❌ Not found the model for update")
           this.create(model);
        }catch(err){
            throw new Error("📯❌ Update Error");
        }
    }
    async delete(idModel: number): Promise<void> {
        try{
            const newModel = await EmailModel.findOne({where: {id: idModel}})
            if(!newModel) throw new Error("💥❌ Not found the model for delete")
            newModel.destroy();
        }catch(err){
            throw new Error("💥❌ Delete Error");
        }
    }
    async retrieveById(idModel: number): Promise<EmailModel> {
        try{
            const searchedModel = await EmailModel.findOne({where: {id: idModel}})
            if(!searchedModel) throw new Error("📤❌ Not found the model for retrieve by id")
            return searchedModel;
        }catch(err){
            throw new Error("📤❌ Retrieve by ID Error");
        }
    }
    async retrieveCountEmails(idModel: number): Promise<number> {
        try{
            const query: string=
            `
            SELECT * FROM "Emails"
            WHERE "senderId" = :senderId
            AND "createdAt" >= :initDate
            AND "createdAt" <= :endDate;
          `;

            const endDate: Date = new Date();

            const initDate: Date = new Date();

            initDate.setHours(0,0,0,0);

            const calls: any[] = await sequelize.query(query, {
                replacements: {
                senderId: idModel,
                initDate: initDate,
                endDate: endDate
                },
                raw: true
            });
            return calls[0].length; //Return the arrays of emails, not the Results
        }catch(error){
            throw new Error("📤❌ Retrieve Count Error" + error);
        }
    }

    retrieveAll(): Promise<EmailModel[]> {
        try{
            const searchedModel = EmailModel.findAll();
            return searchedModel;
        }catch(err){
            throw new Error("📭❌ Retrieve All Error");
        }
    }

}

export default new EmailRepository();