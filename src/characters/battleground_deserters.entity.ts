// Importa las clases necesarias de 'typeorm'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export class BattlegroundDeserters extends BaseEntity {
  // Define la columna primaria generada automáticamente 'guid' de tipo número
  @PrimaryGeneratedColumn()
  guid: number;

  // Define la columna 'type' de tipo número
  @Column()
  type: number;

  // Define la columna 'datetime' de tipo string
  @Column()
  datetime: string;
}