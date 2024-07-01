import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { Role } from '@app/common/database';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async getOne(options: WhereOptions<Role>) {
    return await this.roleRepository.findOne(options);
  }

  public async getById(id: string) {
    return await this.roleRepository.findByPk(id);
  }

  public async getAll() {
    return await this.roleRepository.findAll();
  }

  public async create(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  public async delete(id: string) {
    return await this.roleRepository.delete(id);
  }
}
