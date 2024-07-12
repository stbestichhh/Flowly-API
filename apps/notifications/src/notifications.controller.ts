import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailDto } from './dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notify_email')
  public async sendEMail(@Payload() dto: EmailDto) {
    return await this.notificationsService.sendEmail(dto);
  }
}
