import { Injectable } from '@nestjs/common';
import { EmailDto } from './dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailService: MailerService) {}

  public async sendEmail(dto: EmailDto) {
    return await this.mailService.sendMail({
      from: 'noreply@flowly.com',
      to: dto.receiver,
      subject: dto.subject,
      text: dto.message,
    });
  }
}
