import { Model, ModelCtor } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AbstractDto } from '@app/common/dto';
import { CreationAttributes } from 'sequelize/types/model';
import { ValidationError, WhereOptions } from 'sequelize';

export class AbstractRepository<TModel extends Model> {
  constructor(protected readonly model: ModelCtor<TModel>) {}

  async create(dto: CreationAttributes<TModel>) {
    return await this.model
      .create(
        {
          ...dto,
          id: uuidv4(),
        },
        {
          include: { all: true },
        },
      )
      .catch((e) => {
        console.error(e);
        if (e instanceof ValidationError) {
          throw new ForbiddenException(`${this.model.name} already exists`);
        }
        throw new InternalServerErrorException();
      });
  }

  async findByPk(id: string) {
    const entity = await this.model.findByPk(id, {
      include: { all: true },
    });

    if (!entity) {
      throw new NotFoundException(`Entity not found by id: ${id}`);
    }

    return entity;
  }

  async findOne(options: WhereOptions<TModel>) {
    const entity = await this.model.findOne({
      where: options,
      include: { all: true },
    });

    if (!entity) {
      throw new NotFoundException(
        `Entity of type: ${this.model.name} not found by properties: ${Object.keys(options).join(', ')}`,
      );
    }

    return entity;
  }

  async findAll() {
    const entities = await this.model.findAll({
      include: { all: true },
    });

    if (!entities.length) {
      throw new NotFoundException(
        `Entities of type: ${this.model.name} not found`,
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
