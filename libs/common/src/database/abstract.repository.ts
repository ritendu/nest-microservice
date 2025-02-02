import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractDocument>{
protected abstract readonly logger:Logger
constructor(protected readonly model:Model<TDocument>){}

async create(document:Omit<TDocument,'_id'>):Promise<TDocument>{
    const createDocument = new this.model({
        ...document,
        _id:new Types.ObjectId()
    })
    return (await createDocument.save()).toJSON() as unknown as TDocument
}

async findOne(filterQuery:FilterQuery<TDocument>):Promise<TDocument>{
const document = await this.model.findOne(filterQuery).lean(true);
if(!document) {
    this.logger.warn("Document was not found");
    throw new NotFoundException(404,'Document not found')
}

return document as TDocument
}

async findOneAndUpdate(filterQuery:FilterQuery<TDocument>,updateQuery:UpdateQuery<TDocument>):Promise<TDocument>{
    const document = await this.model.findOneAndUpdate(filterQuery,updateQuery,{new:true}).lean<TDocument>(true);
    if(!document) {
        this.logger.warn("Document was not found");
        throw new NotFoundException(404,'Document not found')
    }
    return document
}
async find(filterQuery:FilterQuery<TDocument>):Promise<TDocument[]>{
return await this.model.find(filterQuery).lean<TDocument[]>(true)
}

async findOneAndDelete(filterQuery:FilterQuery<TDocument>){

}

}