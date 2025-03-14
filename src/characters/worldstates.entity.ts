// Importa las clases necesarias de 'typeorm'
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

// Define la entidad 'Worldstates' y desactiva la sincronización automática con la base de datos
@Entity({ synchronize: false })
export class Worldstates extends BaseEntity {
  // Define la columna primaria 'entry' de tipo número
  @PrimaryColumn()
  entry: number;

  // Define la columna 'value' de tipo número
  @Column()
  value: number;

  // Define la columna 'comment' de tipo string
  @Column()
  comment: string;
}