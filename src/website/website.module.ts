import { Module } from '@nestjs/common';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository], 'websiteConnection')], // Importa el módulo TypeOrm y configura el repositorio PostRepository con la conexión 'websiteConnection'.
  controllers: [WebsiteController], // Define el controlador WebsiteController para manejar las solicitudes HTTP relacionadas con el sitio web.
  providers: [WebsiteService], // Define el servicio WebsiteService que contiene la lógica de negocio relacionada con el sitio web.
})
export class WebsiteModule {}
