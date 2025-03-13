import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AccountDto } from './dto/account.dto';
import { AuthGuard } from '../shared/auth.guard';
import { Account } from './account.decorator';
import { getConnection } from 'typeorm';
import { Account as AccountEntity } from './account.entity';
import { AccountPasswordDto } from './dto/account_password.dto';
import { EmailDto } from './dto/email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Método para registrar una nueva cuenta
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) accountDto: AccountDto,
    @Res() response: Response,
  ): Promise<void> {
    return this.authService.signUp(accountDto, response); // Método para registrar una nueva cuenta. Recibe un objeto AccountDto con los datos de la cuenta y un objeto Response para enviar la respuesta. Llama al método signUp del servicio de autenticación (AuthService).
  }

  // Método para iniciar sesión
  @Post('/signin')
  async signIn(
    @Body() accountDto: AccountDto,
    @Res() response: Response,
  ): Promise<void> {
    return this.authService.signIn(accountDto, response); // Método para iniciar sesión. Recibe un objeto AccountDto con los datos de la cuenta y un objeto Response para enviar la respuesta. Llama al método signIn del servicio de autenticación (AuthService).
  }

  // Método para cerrar sesión
  @Get('/logout')
  logout(@Res() response: Response): void {
    response.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 10),
      httpOnly: true,
    }); // Método para cerrar sesión. Establece una cookie jwt con valor logout y una expiración de 10 milisegundos.
    response.status(HttpStatus.OK).json({ status: 'success' }); // Envía una respuesta con estado OK y un mensaje de éxito.
  }

  // Método para actualizar la contraseña del usuario autenticado
  @Patch('/updateMyPassword')
  @UseGuards(new AuthGuard())
  async updatePassword(
    @Body(ValidationPipe) accountPasswordDto: AccountPasswordDto,
    @Res() response: Response,
    @Account('id') accountId: number,
  ): Promise<void> {
    return this.authService.updatePassword(
      accountPasswordDto,
      response,
      accountId,
    ); // Método para actualizar la contraseña del usuario autenticado. Recibe un objeto AccountPasswordDto con los datos de la nueva contraseña, un objeto Response para enviar la respuesta y el accountId del usuario autenticado. Llama al método updatePassword del servicio de autenticación (AuthService).
  }

  // Método para actualizar el correo electrónico del usuario autenticado
  @Patch('/updateMyEmail')
  @UseGuards(new AuthGuard())
  async updateEmail(
    @Body(ValidationPipe) emailDto: EmailDto,
    @Account('id') accountId: number,
  ) {
    return this.authService.updateEmail(emailDto, accountId); // Método para actualizar el correo electrónico del usuario autenticado. Recibe un objeto EmailDto con los datos del nuevo correo electrónico y el accountId del usuario autenticado. Llama al método updateEmail del servicio de autenticación (AuthService).
  }

  // Método para desbanear una cuenta
  @Patch('/unban')
  @UseGuards(new AuthGuard())
  async unban(@Account('id') accountId: number): Promise<{ status: string }> {
    return this.authService.unban(accountId); // Método para desbanear una cuenta. Recibe el accountId de la cuenta a desbanear. Llama al método unban del servicio de autenticación (AuthService).
  }

  // Método para manejar el olvido de contraseña
  @Post('/forgotPassword')
  async forgotPassword(
    @Body() accountDto: AccountDto,
    @Req() request: Request,
  ) {
    return this.authService.forgotPassword(accountDto, request); // Método para manejar el olvido de contraseña. Recibe un objeto AccountDto con los datos de la cuenta y un objeto Request para manejar la solicitud. Llama al método forgotPassword del servicio de autenticación (AuthService).
  }

  // Método para restablecer la contraseña
  @Patch('/resetPassword/:token')
  async resetPassword(
    @Body(ValidationPipe) accountPasswordDto: AccountPasswordDto,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(accountPasswordDto, token); // Método para restablecer la contraseña. Recibe un objeto AccountPasswordDto con los datos de la nueva contraseña y un token para verificar la solicitud. Llama al método resetPassword del servicio de autenticación (AuthService).
  }

  // Método para obtener estadísticas de actividad de cuentas
  @Get('/pulse/:days')
  async pulse(@Param('days') days: number): Promise<AccountEntity[]> {
    return await getConnection('authConnection')
      .getRepository(AccountEntity)
      .createQueryBuilder('auth')
      .select(['COUNT(*) AS accounts', 'COUNT(DISTINCT(last_ip)) AS IPs'])
      .where('DATEDIFF(NOW(), last_login) < ' + days)
      .getRawMany(); // Método para obtener estadísticas de actividad de cuentas. Recibe el número de días days para filtrar las cuentas que han iniciado sesión en ese período. Realiza una consulta a la base de datos para obtener el número de cuentas y direcciones IP únicas que han iniciado sesión en los últimos days días.
  }
}