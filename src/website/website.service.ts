import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';

@Injectable() // El decorador @Injectable() indica que la clase es un proveedor de NestJS y puede ser inyectada en otros componentes.
export class WebsiteService {
  constructor( // Constructor que inyecta el repositorio PostRepository en el servicio WebsiteService.
    @InjectRepository(PostRepository, 'websiteConnection') // Inyecta el repositorio PostRepository con la conexión 'websiteConnection'.
    private postRepository: PostRepository, // Define una propiedad privada postRepository que almacena el repositorio PostRepository.
  ) {}
}
