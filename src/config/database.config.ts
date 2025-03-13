import { join } from 'path'; // Importa la función 'join' del módulo 'path' para construir rutas de archivos.
import { TypeOrmModuleOptions } from '@nestjs/typeorm'; // Importa la interfaz 'TypeOrmModuleOptions' para definir las opciones de configuración de TypeORM.

// Configuración de la conexión a la base de datos de autenticación.
export const AuthDatabaseConfig: TypeOrmModuleOptions = {
  name: 'authConnection', // Nombre de la conexión.
  type: 'mysql', // Tipo de base de datos (MySQL).
  host: process.env.AUTH_DATABASE_HOST, // Host de la base de datos obtenido de las variables de entorno.
  port: +process.env.AUTH_DATABASE_PORT, // Puerto de la base de datos obtenido de las variables de entorno y convertido a número.
  username: process.env.AUTH_DATABASE_USERNAME, // Nombre de usuario de la base de datos obtenido de las variables de entorno.
  password: process.env.AUTH_DATABASE_PASSWORD, // Contraseña de la base de datos obtenido de las variables de entorno.
  database: process.env.AUTH_DATABASE_NAME, // Nombre de la base de datos obtenido de las variables de entorno.
  entities: [join(__dirname, '..', 'auth', '*.entity.{js, ts}')], // Rutas a las entidades de la base de datos. Busca archivos .entity.js y .entity.ts en el directorio 'auth'.
  synchronize: true, // Sincroniza automáticamente el esquema de la base de datos con las entidades (no recomendado para producción).
};

// Configuración de la conexión a la base de datos del mundo.
export const WorldDatabaseConfig: TypeOrmModuleOptions = {
  name: 'worldConnection', // Nombre de la conexión.
  type: 'mysql', // Tipo de base de datos (MySQL).
  host: process.env.WORLD_DATABASE_HOST, // Host de la base de datos obtenido de las variables de entorno.
  port: +process.env.WORLD_DATABASE_PORT, // Puerto de la base de datos obtenido de las variables de entorno y convertido a número.
  username: process.env.WORLD_DATABASE_USERNAME, // Nombre de usuario de la base de datos obtenido de las variables de entorno.
  password: process.env.WORLD_DATABASE_PASSWORD, // Contraseña de la base de datos obtenido de las variables de entorno.
  database: process.env.WORLD_DATABASE_NAME, // Nombre de la base de datos obtenido de las variables de entorno.
  entities: [join(__dirname, '..', 'world', '*.entity.{js, ts}')], // Rutas a las entidades de la base de datos. Busca archivos .entity.js y .entity.ts en el directorio 'world'.
  synchronize: true, // Sincroniza automáticamente el esquema de la base de datos con las entidades (no recomendado para producción).
};

// Configuración de la conexión a la base de datos de personajes.
export const CharactersDatabaseConfig: TypeOrmModuleOptions = {
  name: 'charactersConnection', // Nombre de la conexión.
  type: 'mysql', // Tipo de base de datos (MySQL).
  host: process.env.CHARACTERS_DATABASE_HOST, // Host de la base de datos obtenido de las variables de entorno.
  port: +process.env.CHARACTERS_DATABASE_PORT, // Puerto de la base de datos obtenido de las variables de entorno y convertido a número.
  username: process.env.CHARACTERS_DATABASE_USERNAME, // Nombre de usuario de la base de datos obtenido de las variables de entorno.
  password: process.env.CHARACTERS_DATABASE_PASSWORD, // Contraseña de la base de datos obtenido de las variables de entorno.
  database: process.env.CHARACTERS_DATABASE_NAME, // Nombre de la base de datos obtenido de las variables de entorno.
  entities: [join(__dirname, '..', 'characters', '*.entity.{js, ts}')], // Rutas a las entidades de la base de datos. Busca archivos .entity.js y .entity.ts en el directorio 'characters'.
  synchronize: true, // Sincroniza automáticamente el esquema de la base de datos con las entidades (no recomendado para producción).
};

// Configuración de la conexión a la base de datos del sitio web.
export const WebsiteDatabaseConfig: TypeOrmModuleOptions = {
  name: 'websiteConnection', // Nombre de la conexión.
  type: 'mysql', // Tipo de base de datos (MySQL).
  host: process.env.WEB_SITE_DATABASE_HOST, // Host de la base de datos obtenido de las variables de entorno.
  port: +process.env.WEB_SITE_DATABASE_PORT, // Puerto de la base de datos obtenido de las variables de entorno y convertido a número.
  username: process.env.WEB_SITE_DATABASE_USERNAME, // Nombre de usuario de la base de datos obtenido de las variables de entorno.
  password: process.env.WEB_SITE_DATABASE_PASSWORD, // Contraseña de la base de datos obtenido de las variables de entorno.
  database: process.env.WEB_SITE_DATABASE_NAME, // Nombre de la base de datos obtenido de las variables de entorno.
  entities: [join(__dirname, '..', 'website', '*.entity.{js, ts}')], // Rutas a las entidades de la base de datos. Busca archivos .entity.js y .entity.ts en el directorio 'website'.
  synchronize: true, // Sincroniza automáticamente el esquema de la base de datos con las entidades (no recomendado para producción).
};