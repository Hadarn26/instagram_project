import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        return await this.usersService.getUser(id)
    }

    @Get(':id/posts')
    async getUserPosts(@Param('id') id: number) {
        return await this.usersService.getUserPosts(id)
    }

}