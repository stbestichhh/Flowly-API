import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async getById(id: string) {
    return await this.taskRepository.findByPk(id);
  }

  public async create(dto: CreateTaskDto) {
    return await this.taskRepository.create(dto);
  }

  async update(id: string, dto: UpdateTaskDto) {
    return await this.taskRepository.update(id, dto);
  }

  public async completeTask(id: string) {
    return await this.taskRepository.update(id, { completed: true });
  }

  async delete(id: string) {
    return await this.taskRepository.delete(id);
  }
}
