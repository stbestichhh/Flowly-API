import { Model, ModelCtor } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { AbstractDto } from '@app/common/dto';
import { CreationAttributes } from 'sequelize/types/model';

export class AbstractRepository<TModel extends Model> {
  constructor(protected readonly model: ModelCtor<TModel>) {}

  async create(dto: CreationAttributes<TModel>) {
    return await this.model.create({
      ...dto,
      id: uuidv4(),
    });
  }

  async findByPk(id: string) {
    const entity = await this.model.findByPk(id);

    if (!entity) {
      throw new NotFoundException(`Entity not found by id: ${id}`);
    }

    return entity;
  }

  async findAll() {
    const entities = await this.model.findAll();

    if (!entities) {
      throw new NotFoundException(
        `Entities of type: ${typeof this.model} not found`,
      );
    }

    return entities;
  }

  async update(id: string, dto: AbstractDto) {
    const entity = await this.findByPk(id);

    return await entity.set(dto).save();
  }

  async delete(id: string) {
    const entity = await this.findByPk(id);

    return await entity.destroy();
  }
}
