import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly config: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  public check() {
    const PORT = this.config.get('HTTP_PORT');
    return this.health.check([
      () => this.http.pingCheck('auth', `http://localhost:${PORT}/auth`),
    ]);
  }
}
