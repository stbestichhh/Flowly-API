import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IjwtPayload } from '@app/common/interfaces';

export const CurrentUser = createParamDecorator(
  (data: keyof IjwtPayload, context: ExecutionContext) => {
    const user: IjwtPayload = context.switchToHttp().getRequest().user;
    return data ? user[data] : user;
  },
);
