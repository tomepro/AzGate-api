// Importa las clases necesarias de 'typeorm'
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ synchronize: false })
export class CharacterBanned extends BaseEntity {
  // Define la columna primaria 'guid' de tipo número
  @PrimaryColumn()
  guid: number;

  // Define la columna primaria 'bandate' de tipo número
  @PrimaryColumn()
  bandate: number;

  // Define la columna 'unbandate' de tipo número
  @Column()
  unbandate: number;

  // Define la columna 'bannedby' de tipo string
  @Column()
  bannedby: string;

  // Define la columna 'banreason' de tipo string
  @Column()
  banreason: string;

  // Define la columna 'active' de tipo número
  @Column()
  active: number;
}