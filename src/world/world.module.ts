import { Module } from '@nestjs/common';
import { WorldController } from './world.controller';
import { WorldService } from './world.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])], // Importa el módulo TypeOrm y configura las entidades relacionadas con el mundo del juego (actualmente vacío).
  controllers: [WorldController], // Define el controlador WorldController para manejar las solicitudes HTTP relacionadas con el mundo del juego.
  providers: [WorldService], // Define el servicio WorldService que contiene la lógica de negocio relacionada con el mundo del juego.
})
export class WorldModule {}
