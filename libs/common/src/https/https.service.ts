import { Logger } from '@nestjs/common';
import * as pem from 'pem';
import { ConfigService } from '@nestjs/config';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

export class HttpsService {
  private readonly configService: ConfigService;
  private readonly logger: Logger;
  private certificate_key: HttpsOptions;
  private readonly expiration: number;

  constructor() {
    this.configService = new ConfigService();
    this.logger = new Logger(HttpsService.name);
    this.expiration = this.configService.get<number>('CERTIFICATE_EXPIRATION');
    this.createCertificate();
  }

  public getCertificate() {
    return this.certificate_key;
  }

  private createCertificate() {
    pem.createCertificate(
      { days: this.expiration, selfSigned: true },
      (error, keys) => {
        if (error) {
          throw error;
        }

        this.certificate_key = { key: keys.clientKey, cert: keys.certificate };
        this.logger.log({
          message: 'Certificate has been created',
          data: this.certificate_key,
        });
      },
    );
  }
}
