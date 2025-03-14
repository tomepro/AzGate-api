// Importa los módulos necesarios de '@nestjs/common'
import { Module } from '@nestjs/common';
// Importa el controlador de 'Characters'
import { CharactersController } from './characters.controller';
// Importa el servicio de 'Characters'
import { CharactersService } from './characters.service';
// Importa el módulo de TypeORM de '@nestjs/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm';
// Importa las entidades necesarias
import { Characters } from './characters.entity';
import { RecoveryItem } from './recovery_item.entity';
import { CharacterBanned } from './character_banned.entity';
import { Worldstates } from './worldstates.entity';

@Module({
  // Importa el módulo de TypeORM y configura las entidades y la conexión
  imports: [
    TypeOrmModule.forFeature(
      [Characters, RecoveryItem, CharacterBanned, Worldstates],
      'charactersConnection',
    ),
  ],
  // Define los controladores del módulo
  controllers: [CharactersController],
  // Define los proveedores del módulo
  providers: [CharactersService],
})
export class CharactersModule {}