import { Injectable } from '@nestjs/common';
import { EmailDto } from './dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailService: MailerService) {}

  public async sendEmail(dto: EmailDto) {
    return await this.mailService.sendMail({
      to: dto.receiver,
      subject: dto.subject,
      template: path.resolve('libs/common/src/email/templates/template.hbs'),
      context: {
        message: dto.message,
      },
    });
  }
}
