import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Payload } from '@nestjs/microservices';
import { EmailDto } from './dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  public async sendEMail(@Payload() dto: EmailDto) {
    return await this.notificationsService.sendEmail(dto);
  }
}
