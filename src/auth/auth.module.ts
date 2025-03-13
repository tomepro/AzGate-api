import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller'; // Importa el controlador de autenticación
import { AuthService } from './auth.service'; // Importa el servicio de autenticación
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el módulo TypeOrm de NestJS
import { AccountRepository } from './account.repository'; // Importa el repositorio de cuentas
import { AccountPasswordRepository } from './account_password.repository'; // Importa el repositorio de contraseñas de cuentas

@Module({
  imports: [
    // Configura los repositorios AccountRepository y AccountPasswordRepository con la conexión 'authConnection'
    TypeOrmModule.forFeature(
      [AccountRepository, AccountPasswordRepository],
      'authConnection',
    ),
  ],
  controllers: [AuthController], // Define el controlador de autenticación
  providers: [AuthService], // Define el servicio de autenticación
})
export class AuthModule {}
