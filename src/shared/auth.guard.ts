import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Account } from '../auth/account.entity';
import { AccountPassword } from '../auth/account_password.entity';
import { AccountInformation } from '../auth/account_information.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  private decoded: any;

  // Método que determina si se permite o no la activación de una ruta
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // Obtiene el objeto de solicitud HTTP
    return await this.validateToken(request); // Valida el token de la solicitud
  } // Método que determina si se permite o no la activación de una ruta. Obtiene el objeto de solicitud HTTP y llama al método validateToken para validar el token de la solicitud.

  // Método privado para validar el token de la solicitud
  private async validateToken(request: any): Promise<boolean> {
    let token: string;

    // Obtiene el token de los encabezados de autorización o de las cookies
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    )
      token = request.headers.authorization.split(' ')[1];
    else if (request.cookies?.jwt) {
      token = request.cookies.jwt;
    }

    // Si no hay token, lanza una excepción de no autorizado
    if (!token) {
      throw new UnauthorizedException([
        'You are not logged in! Please log in to get access.',
      ]);
    }

    // Verifica el token y maneja posibles errores
    try {
      this.decoded = verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || this.decoded === undefined) {
        throw new UnauthorizedException([
          'Invalid Token. Please log in again!',
        ]);
      }

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException([
          'Your token has expired! Please log in again',
        ]);
      }

      if (error) {
        throw new InternalServerErrorException([
          'Something went wrong! Please try again later',
        ]);
      }
    }

    // Verifica si la cuenta existe en la base de datos
    const accountExists = await getRepository(
      Account,
      'authConnection',
    ).findOne({
      where: { id: this.decoded.id },
    });

    if (!accountExists) {
      throw new UnauthorizedException([
        'The account belonging to this token does no longer exist.',
      ]);
    }

    delete accountExists.salt;
    delete accountExists.verifier;

    // Verifica si la contraseña ha sido cambiada recientemente
    const accountPassword = await getRepository(
      AccountPassword,
      'authConnection',
    ).findOne({
      where: { id: this.decoded.id },
    });

    if (
      request.url === '/auth/updateMyPassword' &&
      accountPassword &&
      accountPassword.password_changed_at
    ) {
      const changedTimestamp =
        accountPassword.password_changed_at.getTime() / 1000;

      if (this.decoded.iat < changedTimestamp) {
        throw new UnauthorizedException([
          'User recently changed password! Please log in again',
        ]);
      }
    }

    // Obtiene la información de la cuenta y la agrega a la solicitud
    const accountInformation = await getRepository(
      AccountInformation,
      'authConnection',
    ).findOne({
      where: { id: this.decoded.id },
    });

    request.account = { ...accountExists, ...accountInformation };

    return true; // Permite la activación de la ruta
  } // Método privado para validar el token de la solicitud. Obtiene el token de los encabezados de autorización o de las cookies. Si no hay token, lanza una excepción de no autorizado. Verifica el token y maneja posibles errores. Verifica si la cuenta existe en la base de datos. Si la contraseña ha sido cambiada recientemente, lanza una excepción de no autorizado. Obtiene la información de la cuenta y la agrega a la solicitud. Si todo es válido, permite la activación de la ruta.
}