import { Model, ModelCtor } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import {
  ForbiddenException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AbstractDto } from '@app/common/dto';
import { CreationAttributes } from 'sequelize/types/model';
import { SetOptions, UpdateOptions, ValidationError, WhereOptions } from 'sequelize';

export abstract class AbstractRepository<TModel extends Model> {
  private readonly logger = new Logger(AbstractRepository.name);

  protected constructor(protected readonly model: ModelCtor<TModel>) {}

  async create(dto: CreationAttributes<TModel>) {
    return (await this.model
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
        if (e instanceof ValidationError) {
          throw new ForbiddenException(`${this.model.name} already exists`);
        }
        this.logger.error(e);
        throw new InternalServerErrorException();
      })) as TModel;
  }

  async findByPk(id: string) {
    const entity = await this.model.findByPk(id, {
      include: { all: true },
    });

    if (!entity) {
      throw new NotFoundException(`Entity not found by id: ${id}`);
    }

    return entity as TModel;
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

    return entity as TModel;
  }

  async findAll(options?: WhereOptions<TModel>) {
    const entities = await this.model.findAll({
      include: { all: true },
      where: options,
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
