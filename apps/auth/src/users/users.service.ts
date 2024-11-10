import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    async create(createUserDto:createUserDto){
        
    }
}
