import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => { // Describe un conjunto de pruebas end-to-end para el controlador 'AppController'. Utiliza la función 'describe' de Jest para agrupar pruebas.
  let app: INestApplication; // delcaración de la variable 'app' de tipo 'INestApplication'. que se utilizará para almacenar la aplicación de NestJS.

  beforeEach(async () => { // Define una función asíncrona que se ejecuta antes de cada prueba.
    const moduleFixture: TestingModule = await Test.createTestingModule({ // Crea un módulo de pruebas de NestJS.
      imports: [AppModule], // Importa el módulo principal de la aplicación.
    }).compile(); // Compila el módulo de pruebas.

    app = moduleFixture.createNestApplication(); // Crea una instancia de la aplicación de NestJS. Para ello, obtiene la aplicación del módulo de pruebas.
    await app.init(); // Inicializa la aplicación de NestJS.
  });

  it('/ (GET)', () => { // Define una prueba que verifica que se pueda realizar una petición GET a la raíz de la aplicación.
    return request(app.getHttpServer()) // Realiza una petición GET al servidor HTTP de la aplicación.
      .get('/') // Realiza una petición GET a la raíz de la aplicación.
      .expect(200) // Espera que la respuesta tenga un código de estado 200.
      .expect('Hello World!'); // Espera que la respuesta sea 'Hello World!'.
  });
});
