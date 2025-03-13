import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Crea un decorador personalizado llamado 'Account'
export const Account = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest(); // Obtiene el objeto de solicitud HTTP
  return data ? req.account[data] : req.account; // Devuelve la información de la cuenta del usuario autenticado
});
