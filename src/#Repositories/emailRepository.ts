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
    /**
     * Look for the amount of emails sent in a day by a user 
     * @param senderIdModel needs an email-IdSender for comparison
     * @returns the amount of emails sent by the asked sender
     */
    async retrieveCountEmails(senderIdModel: number): Promise<number> {
        try{

            //Creating the petition for sequelize
            const query: string=
            `
            SELECT * FROM "Emails"
            WHERE "senderId" = :senderId
            AND "createdAt" >= :initDate
            AND "createdAt" <= :endDate;
          `;

          //Set the actual and begin time of the currentDay (Realtime)
            const endDate: Date = new Date();

            const initDate: Date = new Date();

            initDate.setHours(0,0,0,0);

            //Consults ORM with a query, retrieves results and metadata
            const calls: any[] = await sequelize.query(query, {
                //replace the :"" with an actual value
                replacements: {
                senderId: senderIdModel,
                initDate: initDate,
                endDate: endDate
                },
                //Return va non-map value, i just need the results lenght
                raw: true
            });
            return calls[0].length; //Return the arrays of emails, not the metadad
        }catch(error){

            //Throw back an error in case of an error
            throw new Error("📤❌ Retrieve Count Error" + error);
        }
    }

    async retrieveAll(): Promise<EmailModel[]> {
        try{
            const searchedModel = EmailModel.findAll();
            return searchedModel;
        }catch(err){
            throw new Error("📭❌ Retrieve All Error");
        }
    }

}

export default new EmailRepository();