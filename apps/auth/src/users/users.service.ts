import { Inject, Injectable } from '@nestjs/common';
import { BanUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';
import { Sequelize, WhereOptions } from 'sequelize';
import { User } from '@app/common/database';
import * as bcrypt from 'bcrypt';
import { AddRoleDto } from './dto/add-role.dto';
import { RoleRepository } from '../roles/role.repository';
import { RolesEnum } from '@app/common/enums';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleReposity: RoleRepository,
    private readonly sequelize: Sequelize,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  public async getById(id: string) {
    return await this.userRepository.findByPk(id);
  }

  public async getOne(options: WhereOptions<User>) {
    return await this.userRepository.findOne(options);
  }

  public async getAll() {
    const usersFromCahche = await this.cacheManager.get('users');

    if (usersFromCahche) {
      return usersFromCahche;
    }

    const users = await this.userRepository.findAll();
    await this.cacheManager.set('users', users, 0);

    return users;
  }

  public async create(dto: CreateUserDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const user = await this.userRepository.create(
        {
          ...dto,
          password: await this.hashPassword(dto.password),
        },
        transaction,
      );

      const role = await this.roleReposity.findOne(
        { value: RolesEnum.USER },
        transaction,
      );

      await user.$set('roles', [role.id], { transaction });
      user.roles = [role];

      await this.cacheManager.reset();

      await transaction.commit();

      return user;
    } catch (e) {
      await transaction.rollback();
      console.error(e);
    }
  }

  public async update(id: string, dto: UpdateUserDto) {
    if (dto.password) {
      dto.password = await this.hashPassword(dto.password);
    }

    await this.cacheManager.reset();

    return await this.userRepository.update(id, dto);
  }

  public async delete(id: string) {
    await this.cacheManager.reset();
    return await this.userRepository.delete(id);
  }

  public async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleReposity.findOne({ value: dto.role });

    await user.$add('role', role.id);

    await this.cacheManager.reset();

    return user;
  }

  public async banUser(dto: BanUserDto) {
    await this.cacheManager.reset();
    return await this.userRepository.update(dto.userId, dto);
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
