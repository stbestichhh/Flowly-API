import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';
import { WhereOptions } from 'sequelize';
import { User } from '@app/common/database';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getById(id: string) {
    return await this.userRepository.findByPk(id);
  }

  public async getOne(options: WhereOptions<User>) {
    return await this.userRepository.findOne(options);
  }

  public async getAll() {
    return await this.userRepository.findAll();
  }

  public async create(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    return await this.userRepository.create({ ...dto, password: hash });
  }

  public async update(id: string, dto: UpdateUserDto) {
    return await this.userRepository.update(id, dto);
  }

  public async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
