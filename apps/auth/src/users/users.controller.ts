import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}
   @Post()
   async createUser(@Body() createUserDto:createUserDto){
    return this.userService.create(createUserDto)
   } 
}
