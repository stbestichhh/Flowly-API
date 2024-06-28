import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';
import { WhereOptions } from 'sequelize';
import { User } from '@app/common/database';
import * as bcrypt from 'bcrypt';
import { AddRoleDto } from './dto/add-role.dto';
import { RoleRepository } from '../roles/role.repository';
import { RolesEnum } from '@app/common/enums';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleReposity: RoleRepository,
  ) {}

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
    const user = await this.userRepository.create({
      ...dto,
      password: await this.hashPassword(dto.password),
    });
    const role = await this.roleReposity.findOne({ value: RolesEnum.USER });

    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  public async update(id: string, dto: UpdateUserDto) {
    if (dto.password) {
      dto.password = await this.hashPassword(dto.password);
    }

    return await this.userRepository.update(id, dto);
  }

  public async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  public async addRole(id: string, dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(id);
    const role = await this.roleReposity.findOne({ value: dto.role });

    await user.$add('role', role.id);
    return user;
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
