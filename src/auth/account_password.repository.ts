import { createHash, randomBytes } from 'crypto';
import { EntityRepository, getRepository, MoreThan, Repository } from 'typeorm';

import { AccountPassword } from './account_password.entity';
import { AccountDto } from './dto/account.dto';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Account } from './account.entity';
import { Email } from '../shared/email';
import { AccountPasswordDto } from './dto/account_password.dto';
import { Request } from 'express';
import { Misc } from '../shared/misc';

@EntityRepository(AccountPassword)
export class AccountPasswordRepository extends Repository<AccountPassword> {
  private accountRepo = getRepository(Account, 'authConnection');

  // Método para manejar el olvido de contraseña
  /* Recibe un objeto AccountDto con los datos de la cuenta y un objeto 
      Request para manejar la solicitud. Busca la cuenta en la base de datos 
      utilizando el correo electrónico proporcionado. 
      Si la cuenta existe, genera un token de restablecimiento de contraseña 
      y lo guarda en la base de datos. Luego, envía un correo electrónico 
      con la URL de restablecimiento de contraseña. 
      Si ocurre un error al enviar el correo electrónico, elimina el token de 
      restablecimiento de contraseña de la base de datos y lanza una excepción. */
  async forgotPassword(accountDto: AccountDto, request: Request) {
    const account = await this.accountRepo.findOne({
      reg_mail: accountDto.email,
    });

    if (!account) {
      throw new NotFoundException(['There is no account with email address']);
    }

    const resetToken: string = randomBytes(32).toString('hex'); // Genera un token de restablecimiento de contraseña
    const passwordResetExpires: any = new Date(
      Date.now() + 10 * 60 * 1000,
    ).toISOString(); // Establece la expiración del token a 10 minutos
    const passwordResetToken: string = createHash('sha256')
      .update(resetToken)
      .digest('hex'); // Crea un hash del token de restablecimiento de contraseña

    const accountPassword = this.create();
    accountPassword.id = account.id;
    accountPassword.password_reset_expires = passwordResetExpires;
    accountPassword.password_reset_token = passwordResetToken;
    await this.save(accountPassword); // Guarda el token de restablecimiento de contraseña en la base de datos

    try {
      const resetURL = `${request.protocol}://${request.get(
        'host',
      )}/auth/resetPassword/${resetToken}`; // Crea la URL de restablecimiento de contraseña
      await new Email(account, resetURL).sendPasswordReset(); // Envía el correo electrónico de restablecimiento de contraseña
      return { status: 'success', message: ['Token sent to email'] };
    } catch (error) {
      await this.delete(account.id); // Elimina el token de restablecimiento de contraseña en caso de error

      if (error)
        throw new InternalServerErrorException([
          'There was an error sending the email. Try again later!',
        ]);
    }
  } // Método para manejar el olvido de contraseña. Recibe un objeto AccountDto con los datos de la cuenta y un objeto Request para manejar la solicitud. Busca la cuenta en la base de datos utilizando el correo electrónico proporcionado. Si la cuenta existe, genera un token de restablecimiento de contraseña y lo guarda en la base de datos. Luego, envía un correo electrónico con la URL de restablecimiento de contraseña. Si ocurre un error al enviar el correo electrónico, elimina el token de restablecimiento de contraseña de la base de datos y lanza una excepción.

  // Método para restablecer la contraseña
  /* Recibe un objeto AccountPasswordDto con los datos de la nueva contraseña 
      y un token para verificar la solicitud. Crea un hash del token de 
      restablecimiento de contraseña y busca la información de restablecimiento de contraseña 
      en la base de datos. Si el token es válido y no ha expirado, verifica que las 
      nuevas contraseñas coincidan. Luego, calcula el verificador SRP6 para la nueva contraseña 
      y guarda la nueva contraseña en la base de datos. 
      Finalmente, actualiza la información de restablecimiento de contraseña en la base de datos 
      y devuelve un mensaje de éxito. */
  async resetPassword(accountPasswordDto: AccountPasswordDto, token: string) {
    const { password, passwordConfirm } = accountPasswordDto;
    const hashedToken: string = createHash('sha256')
      .update(token)
      .digest('hex'); // Crea un hash del token de restablecimiento de contraseña

    const accountPassword = await this.findOne({
      where: {
        password_reset_token: hashedToken,
        password_reset_expires: MoreThan(new Date()),
      },
    });

    if (!accountPassword) {
      throw new BadRequestException(['Token is invalid or has expired']);
    }

    if (passwordConfirm !== password) {
      throw new BadRequestException(['Password does not match']);
    }

    const account = await this.accountRepo.findOne({
      where: { id: accountPassword.id },
    });

    account.verifier = Misc.calculateSRP6Verifier(
      account.username,
      password,
      account.salt,
    ); // Calcula el verificador SRP6 para la nueva contraseña
    await this.accountRepo.save(account); // Guarda la nueva contraseña en la base de datos

    accountPassword.password_changed_at = new Date(Date.now() - 1000);
    accountPassword.password_reset_expires = null;
    accountPassword.password_reset_token = null;
    await this.save(accountPassword); // Actualiza la información de restablecimiento de contraseña en la base de datos

    return {
      status: 'success',
      message: ['Your password has been reset successfully!'],
    };
  } // Método para restablecer la contraseña. Recibe un objeto AccountPasswordDto con los datos de la nueva contraseña y un token para verificar la solicitud. Crea un hash del token de restablecimiento de contraseña y busca la información de restablecimiento de contraseña en la base de datos. Si el token es válido y no ha expirado, verifica que las nuevas contraseñas coincidan. Luego, calcula el verificador SRP6 para la nueva contraseña y guarda la nueva contraseña en la base de datos. Finalmente, actualiza la información de restablecimiento de contraseña en la base de datos y devuelve un mensaje de éxito.
}