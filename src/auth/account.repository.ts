import { sign } from 'jsonwebtoken';
import { EntityRepository, getRepository, Repository } from 'typeorm';

import { Account } from './account.entity';
import { AccountDto } from './dto/account.dto';
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountPasswordDto } from './dto/account_password.dto';
import { AccountPassword } from './account_password.entity';
import { EmailDto } from './dto/email.dto';
import { Response } from 'express';
import { AccountBanned } from './account_banned.entity';
import { AccountInformation } from './account_information.entity';
import { Misc } from '../shared/misc';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  private accountInformationRepo = getRepository(
    AccountInformation,
    'authConnection',
  );

  private accountPasswordRepo = getRepository(
    AccountPassword,
    'authConnection',
  );

  private accountBannedRepo = getRepository(AccountBanned, 'authConnection');

  // Método para registrar una nueva cuenta
  async signUp(accountDto: AccountDto, response: Response): Promise<void> {
    const {
      username,
      firstName,
      lastName,
      phone,
      password,
      email,
      passwordConfirm,
    } = accountDto;
    const account = this.create();

    const emailExists = await this.findOne({ reg_mail: email });
    const phoneExists = await this.accountInformationRepo.findOne({ phone });

    if (emailExists) {
      throw new ConflictException(['Email address already exists']);
    }

    if (phoneExists) {
      throw new ConflictException(['Phone already exists']);
    }

    if (passwordConfirm !== password) {
      throw new BadRequestException(['Password does not match']);
    }

    const [salt, verifier] = Misc.GetSRP6RegistrationData(username, password);

    account.username = username.toUpperCase();
    account.salt = salt;
    account.verifier = verifier;
    account.reg_mail = email.toUpperCase();

    try {
      await this.save(account);

      const accountInformation = new AccountInformation();
      accountInformation.id = account.id;
      accountInformation.first_name = firstName;
      accountInformation.last_name = lastName;
      accountInformation.phone = phone;
      await this.accountInformationRepo.save(accountInformation);

      AccountRepository.createToken(account, HttpStatus.CREATED, response); // Finalmente, crea un token JWT y lo envía en la respuesta.
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(['Username already exists']);
      } else {
        throw new InternalServerErrorException([
          'Something went wrong! Please try again later.',
        ]);
      }
    }
  } // Método para registrar una nueva cuenta. Recibe un objeto AccountDto con los datos de la cuenta y un objeto Response para enviar la respuesta. Verifica si el correo electrónico o el teléfono ya existen, y si las contraseñas coinciden. Luego, crea una nueva cuenta y guarda la información de la cuenta en la base de datos.

  // Método para iniciar sesión
  async signIn(accountDto: AccountDto, response: Response): Promise<void> {
    const { username, password } = accountDto;
    const account = await this.findOne({ where: { username } });

    if (
      !account ||
      !Misc.verifySRP6(username, password, account.salt, account.verifier)
    ) {
      throw new UnauthorizedException(['Incorrect username or password']);
    }

    AccountRepository.createToken(account, HttpStatus.OK, response); // Si son correctos, crea un token JWT y lo envía en la respuesta.
  } // Método para iniciar sesión. Recibe un objeto AccountDto con los datos de la cuenta y un objeto Response para enviar la respuesta. Verifica si el nombre de usuario y la contraseña son correctos.

  // Método para actualizar la contraseña
  async updatePassword(
    accountPasswordDto: AccountPasswordDto,
    response: Response,
    accountId: number,
  ): Promise<void> {
    const { passwordCurrent, password, passwordConfirm } = accountPasswordDto;
    const account = await this.findOne({ where: { id: accountId } });

    if (
      !Misc.verifySRP6(
        account.username,
        passwordCurrent,
        account.salt,
        account.verifier,
      )
    ) {
      throw new UnauthorizedException(['Your current password is wrong!']);
    }

    if (passwordConfirm !== password) {
      throw new BadRequestException(['Password does not match']);
    }

    account.verifier = Misc.calculateSRP6Verifier(
      account.username,
      password,
      account.salt,
    );
    console.log(account.salt);
    await this.save(account);

    const accountPassword = new AccountPassword();
    accountPassword.id = account.id;
    accountPassword.password_changed_at = new Date(Date.now() - 1000);
    await this.accountPasswordRepo.save(accountPassword);

    AccountRepository.createToken(account, HttpStatus.OK, response); // Luego, actualiza la contraseña en la base de datos y crea un token JWT que se envía en la respuesta.
  } // Método para actualizar la contraseña. Recibe un objeto AccountPasswordDto con los datos de la nueva contraseña, un objeto Response para enviar la respuesta y el accountId de la cuenta a actualizar. Verifica si la contraseña actual es correcta y si las nuevas contraseñas coinciden.

  // Método para actualizar el correo electrónico
  async updateEmail(emailDto: EmailDto, accountId: number) {
    const { password, emailCurrent, email, emailConfirm } = emailDto;
    const account = await this.findOne({ where: { id: accountId } });

    if (emailCurrent.toUpperCase() !== account.reg_mail) {
      throw new BadRequestException(['Your current email is wrong!']);
    }

    if (emailConfirm.toUpperCase() !== email.toUpperCase()) {
      throw new BadRequestException(['Email does not match']);
    }

    if (email.toUpperCase() === account.reg_mail) {
      throw new ConflictException(['That email address already exists']);
    }

    if (
      !Misc.verifySRP6(
        account.username,
        password,
        account.salt,
        account.verifier,
      )
    ) {
      throw new UnauthorizedException(['Your current password is wrong!']);
    }

    account.reg_mail = email.toUpperCase();
    await this.save(account);

    return {
      status: 'success',
      message: ['Your email has been changed successfully!'],
    };
  } // Método para actualizar el correo electrónico. Recibe un objeto EmailDto con los datos del nuevo correo electrónico y el accountId de la cuenta a actualizar. Verifica si el correo electrónico actual es correcto, si las nuevas direcciones de correo electrónico coinciden y si la contraseña es correcta. Luego, actualiza el correo electrónico en la base de datos y devuelve un mensaje de éxito.

  // Método para desbanear una cuenta
  async unban(accountId: number) {
    const accountBanned = await this.accountBannedRepo.findOne({
      where: { id: accountId, active: 1 },
    });

    if (!accountBanned) {
      throw new BadRequestException(['Your account is not banned!']);
    }

    await Misc.setCoin(10, accountId);

    accountBanned.active = 0;
    await this.accountBannedRepo.save(accountBanned);

    return { status: 'success' };
  } // Método para desbanear una cuenta. Recibe el accountId de la cuenta a desbanear. Verifica si la cuenta está baneada. Si está baneada, desactiva el baneo y devuelve un mensaje de éxito.

  // Método para crear un token JWT
  private static createToken(
    account: any,
    statusCode: number,
    response: Response,
  ): void {
    const token = sign({ id: account.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    delete account.salt;
    delete account.verifier;

    response.status(statusCode).json({ status: 'success', token, account });
  } // Método para crear un token JWT. Recibe la cuenta, el código de estado y el objeto Response para enviar la respuesta. Crea un token JWT con el id de la cuenta y lo envía en la respuesta junto con la cuenta.
}