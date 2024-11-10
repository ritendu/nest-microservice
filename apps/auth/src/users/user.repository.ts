import { AbstractRepository } from "@app/common";
import { UserDocument } from "./models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReservationsRepository } from "apps/reservations/src/reservations.repository";
import { Logger } from "@nestjs/common";

export class UserRepository extends AbstractRepository<UserDocument>{
 protected readonly logger = new Logger(ReservationsRepository.name);    
constructor(@InjectModel(UserDocument.name)
userModel:Model<UserDocument>
){
    super(userModel)
}
}