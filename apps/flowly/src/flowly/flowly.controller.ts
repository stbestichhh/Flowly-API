import { Controller, Get } from '@nestjs/common';

@Controller('flowly')
export class FlowlyController {
  @Get()
  public get() {
    return 'OK';
  }
}
