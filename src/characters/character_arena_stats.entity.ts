// Importa las clases necesarias de 'typeorm'
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ synchronize: false })
export class CharacterArenaStats extends BaseEntity {
  // Define la columna primaria 'guid' de tipo número
  @PrimaryColumn()
  guid: number;

  // Define la columna primaria 'slot' de tipo número
  @PrimaryColumn()
  slot: number;

  // Define la columna 'matchMakerRating' de tipo número
  @Column()
  matchMakerRating: number;

  // Define la columna 'maxMMR' de tipo número
  @Column()
  maxMMR: number;
}