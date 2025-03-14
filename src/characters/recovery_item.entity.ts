// Importa las clases necesarias de 'typeorm'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Define la entidad 'RecoveryItem' y desactiva la sincronización automática con la base de datos
@Entity({ synchronize: false })
export class RecoveryItem extends BaseEntity {
  // Define la columna primaria generada automáticamente 'Id' de tipo número
  @PrimaryGeneratedColumn()
  Id: number;

  // Define la columna 'Guid' de tipo número
  @Column()
  Guid: number;

  // Define la columna 'ItemEntry' de tipo número
  @Column()
  ItemEntry: number;

  // Define la columna 'Count' de tipo número
  @Column()
  Count: number;
}