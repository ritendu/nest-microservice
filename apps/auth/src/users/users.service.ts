import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { UsersRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/getUser.dto';
@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    async create(createUserDto:createUserDto){
      return this.usersRepository.create({...createUserDto,password:await bcrypt.hash(createUserDto.password,10)});  
    }

    async verifyUser(email:string,password:string){
     const user = await this.usersRepository.findOne({email:email});
     console.log(user,"user>>>")
     const passwordValid = await bcrypt.compare(password,user.password);
     console.log(passwordValid,"passwordValid>>>") 
     if(!passwordValid){
      throw new UnauthorizedException("Credentials not valid")
     }
     return user;
    }
    async findAll(){
      return this.usersRepository.find({})  
    }

    async getUser(getUserDto: GetUserDto) {
      console.log(getUserDto,"getUser")
      return this.usersRepository.findOne(getUserDto);
    }

}
