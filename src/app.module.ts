import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AuthDatabaseConfig,
  WorldDatabaseConfig,
  CharactersDatabaseConfig,
  WebsiteDatabaseConfig,
} from './config/database.config';
import { AuthModule } from './auth/auth.module'; 
import { WorldModule } from './world/world.module';
import { CharactersModule } from './characters/characters.module'; 
import { WebsiteModule } from './website/website.module';

@Module({
  imports: [
    // Configuración de la conexión a la base de datos de autenticación
    TypeOrmModule.forRoot(AuthDatabaseConfig), // Configura la conexión a la base de datos de autenticación utilizando la configuración especificada en AuthDatabaseConfig.
    // Configuración de la conexión a la base de datos del mundo
    TypeOrmModule.forRoot(WorldDatabaseConfig), // Configura la conexión a la base de datos del mundo utilizando la configuración especificada en WorldDatabaseConfig.
    // Configuración de la conexión a la base de datos de personajes
    TypeOrmModule.forRoot(CharactersDatabaseConfig), // Configura la conexión a la base de datos de personajes utilizando la configuración especificada en CharactersDatabaseConfig.
    // Configuración de la conexión a la base de datos del sitio web
    TypeOrmModule.forRoot(WebsiteDatabaseConfig), // Configura la conexión a la base de datos del sitio web utilizando la configuración especificada en WebsiteDatabaseConfig.
    // Importa el módulo de autenticación
    AuthModule, // Importa el módulo de autenticación, que contiene toda la lógica relacionada con la autenticación y autorización de usuarios.
    // Importa el módulo del mundo
    WorldModule, // Importa el módulo del mundo, que contiene toda la lógica relacionada con la gestión del mundo del juego.
    // Importa el módulo de personajes
    CharactersModule, // Importa el módulo de personajes, que contiene toda la lógica relacionada con la gestión de los personajes del juego.
    // Importa el módulo del sitio web
    WebsiteModule, // Importa el módulo del sitio web, que contiene toda la lógica relacionada con la gestión del sitio web.
  ],
})
export class AppModule {}