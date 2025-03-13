import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post) // Define la clase PostRepository como un repositorio de la entidad Post. Esto permite que TypeORM realice operaciones de base de datos en la tabla de publicaciones.
export class PostRepository extends Repository<Post> {} // Define una clase PostRepository que extiende la clase Repository de TypeORM y especifica la entidad Post como su tipo genérico. Esto proporciona métodos para realizar operaciones de base de datos en la tabla de publicaciones.
