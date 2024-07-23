import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly config: ConfigService,
    private readonly db: SequelizeHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  public check() {
    const PORT = this.config.get<number>('AUTH_PORT');
    const HOST = this.config.get<string>('AUTH_HOST');
    return this.health.check([
      () => this.http.pingCheck('auth', `http://${HOST}:${PORT}/auth`),
      () => this.db.pingCheck('database'),
    ]);
  }
}
