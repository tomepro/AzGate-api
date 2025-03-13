import 'dotenv/config'; // Carga las variables de entorno desde un archivo .env
import { NestFactory } from '@nestjs/core'; // Importa NestFactory para crear una instancia de la aplicación NestJS
import { AppModule } from './app.module'; // Importa el módulo principal de la aplicación
import { Logger } from '@nestjs/common'; // Importa el servicio de registro de NestJS
import * as helmet from 'helmet'; // Importa Helmet para mejorar la seguridad de la aplicación
import * as rateLimit from 'express-rate-limit'; // Importa express-rate-limit para limitar la tasa de solicitudes
import * as compression from 'compression'; // Importa compression para comprimir las respuestas HTTP

async function bootstrap() {
  const logger = new Logger('bootstrap'); // Crea una instancia del logger con el contexto 'bootstrap'
  const app = await NestFactory.create(AppModule); // Crea una instancia de la aplicación NestJS utilizando el módulo principal AppModule.
  const port = process.env.WEBSITE_PORT || 3000; // Obtiene el puerto desde las variables de entorno o usa el puerto 3000 por defecto.

  app.enableCors(); // Habilita CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde otros dominios.
  app.use(helmet()); // Usa Helmet para mejorar la seguridad de la aplicación configurando varios encabezados HTTP.

  // Si el entorno es de producción, aplica limitación de tasa de solicitudes
  if (process.env.NODE_ENV === 'production') {
    app.use(
      rateLimit({
        max: 100, // Máximo de 100 solicitudes
        windowMs: 60 * 60 * 1000, // Por ventana de 1 hora
        message: 'Too many requests from this IP, Please try again in an hour!', // Mensaje de error cuando se excede el límite
      }),
    ); // Si el entorno es de producción, aplica limitación de tasa de solicitudes para proteger contra ataques de denegación de servicio (DoS).
  }

  app.use(compression()); // Usa compression para comprimir las respuestas HTTP, mejorando el rendimiento de la aplicación.
  await app.listen(port); // Inicia la aplicación y escucha en el puerto especificado.

  logger.log(`Application listening on port ${port}`); // Registra un mensaje indicando en qué puerto está escuchando la aplicación.
}
bootstrap(); // Llama a la función bootstrap para iniciar la aplicación