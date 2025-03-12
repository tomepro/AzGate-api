import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from './dto/account.dto';
import { AccountPasswordRepository } from './account_password.repository';
import { AccountPasswordDto } from './dto/account_password.dto';
import { EmailDto } from './dto/email.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    // Inyecta el repositorio de cuentas utilizando la conexión 'authConnection'
    @InjectRepository(AccountRepository, 'authConnection')
    private readonly accountRepository: AccountRepository,
    // Inyecta el repositorio de contraseñas utilizando la conexión 'authConnection'
    @InjectRepository(AccountPasswordRepository, 'authConnection')
    private readonly accountPasswordRepository: AccountPasswordRepository,
  ) {}

  /**
   * Método para registrar una nueva cuenta.
   * Recibe un objeto AccountDto con los datos de la cuenta y un objeto Response para enviar la respuesta.
   * Llama al método signUp del repositorio de cuentas (AccountRepository).
   */
  async signUp(accountDto: AccountDto, response: Response): Promise<void> {
    return this.accountRepository.signUp(accountDto, response);
  }

  /**
   * Método para iniciar sesión.
   * Recibe un objeto AccountDto con los datos de la cuenta y un objeto Response para enviar la respuesta.
   * Llama al método signIn del repositorio de cuentas (AccountRepository).
   */
  async signIn(accountDto: AccountDto, response: Response): Promise<void> {
    return this.accountRepository.signIn(accountDto, response);
  }

  /**
   * Método para actualizar la contraseña de una cuenta.
   * Recibe un objeto AccountPasswordDto con los datos de la nueva contraseña, un objeto Response para enviar la respuesta
   * y el accountId de la cuenta a actualizar.
   * Llama al método updatePassword del repositorio de cuentas (AccountRepository).
   */
  async updatePassword(
    accountPasswordDto: AccountPasswordDto,
    response: Response,
    accountId: number,
  ): Promise<void> {
    return this.accountRepository.updatePassword(
      accountPasswordDto,
      response,
      accountId,
    );
  }

  /**
   * Método para actualizar el correo electrónico de una cuenta.
   * Recibe un objeto EmailDto con los datos del nuevo correo electrónico y el accountId de la cuenta a actualizar.
   * Llama al método updateEmail del repositorio de cuentas (AccountRepository).
   */
  async updateEmail(emailDto: EmailDto, accountId: number) {
    return this.accountRepository.updateEmail(emailDto, accountId);
  }

  /**
   * Método para desbanear una cuenta.
   * Recibe el accountId de la cuenta a desbanear.
   * Llama al método unban del repositorio de cuentas (AccountRepository).
   */
  async unban(accountId: number) {
    return this.accountRepository.unban(accountId);
  }

  /**
   * Método para manejar el olvido de contraseña.
   * Recibe un objeto AccountDto con los datos de la cuenta y un objeto Request para manejar la solicitud.
   * Llama al método forgotPassword del repositorio de contraseñas (AccountPasswordRepository).
   */
  async forgotPassword(accountDto: AccountDto, request: Request) {
    return this.accountPasswordRepository.forgotPassword(accountDto, request);
  }

  /**
   * Método para restablecer la contraseña.
   * Recibe un objeto AccountPasswordDto con los datos de la nueva contraseña y un token para verificar la solicitud.
   * Llama al método resetPassword del repositorio de contraseñas (AccountPasswordRepository).
   */
  async resetPassword(accountPasswordDto: AccountPasswordDto, token: string) {
    return this.accountPasswordRepository.resetPassword(
      accountPasswordDto,
      token,
    );
  }
}