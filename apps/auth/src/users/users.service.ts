import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    async create(createUserDto:createUserDto){
      return this.usersRepository.create(createUserDto)  
    }
    async findAll(){
      return this.usersRepository.find({})  
    }

    // async findOne(){
    //   return this.userRepository.  
    // }

}
