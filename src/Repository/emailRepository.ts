import { EmailModel } from "../Database/database";
import { IRepository } from "./iRepository";

class EmailRepository implements IRepository<EmailModel>{
    async create(model: EmailModel): Promise<void> {
        try{
            EmailModel.create({
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
    retrieveAll(): Promise<EmailModel[]> {
        try{
            const searchedModel = EmailModel.findAll();
            return searchedModel;
        }catch(err){
            throw new Error("📭❌ Retrieve All Error");
        }
    }

}