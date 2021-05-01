import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// We can algo create our own custom decorators
// This way, we can extract properties from the request, and reuse it across all our controllers
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
