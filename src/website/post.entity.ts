import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number; // Columna que representa el ID único del post, generado automáticamente y sin signo.

  @Column()
  title: string; // Columna que almacena el título del post.

  @Column({ type: 'text' })
  body: string; // Columna que almacena el contenido del post.

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date; // Columna que almacena la fecha y hora en que se creó el post, se genera automáticamente.

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date; // Columna que almacena la fecha y hora en que se actualizó el post por última vez, se actualiza automáticamente.
}
