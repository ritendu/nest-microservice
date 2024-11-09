import {Injectable} from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private reservationRepository:ReservationsRepository){}

  async create(createReservationDto:CreateReservationDto){
  return this.reservationRepository.create({
    ...createReservationDto,
    timestamp:new Date(),
    userId:'123'
  })  
  }

  async findAll(){
    return this.reservationRepository.find({})
  }

  async findOne(_id:string){
    return this.reservationRepository.findOne({_id});
  }

  async update(_id:string,updateReservationData:UpdateReservationDto){
    return this.reservationRepository.findOneAndUpdate({_id},{$set:{updateReservationData}})
  }

  async remove(_id:string){
    return this.reservationRepository.findOneAndDelete({_id})
  }

  getHello(){
    return 'Hello World'
  }
}
