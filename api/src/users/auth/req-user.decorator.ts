import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@tpoai/data-commons';

export const ReqUser = createParamDecorator(
  (ctx: ExecutionContext) => ctx.switchToHttp().getRequest()?.User as User,
);
