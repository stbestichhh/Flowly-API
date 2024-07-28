import { Injectable, Logger } from '@nestjs/common';
import { EmailDto } from './dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly mailService: MailerService) {}

  public async sendEmail(dto: EmailDto) {
    await this.mailService.sendMail({
      to: dto.receiver,
      subject: dto.subject,
      template: path.resolve('libs/common/src/email/templates/template.hbs'),
      context: {
        message: dto.message,
      },
    }).then(() => {
      this.logger.log({ status: 'OK', data: dto });
    });
  }
}
