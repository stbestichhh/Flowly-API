import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getById(id: string) {
    return await this.userRepository.findByPk(id);
  }

  public async getAll() {
    return await this.userRepository.findAll();
  }

  public async create(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  public async update(id: string, dto: UpdateUserDto) {
    return await this.userRepository.update(id, dto);
  }

  public async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
