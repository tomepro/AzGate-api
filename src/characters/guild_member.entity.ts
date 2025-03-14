// Importa las clases necesarias de 'typeorm'
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

// Define la entidad 'GuildMember' y desactiva la sincronización automática con la base de datos
@Entity({ synchronize: false })
export class GuildMember extends BaseEntity {
  // Define la columna 'guildid' de tipo número
  @Column()
  guildid: number;

  // Define la columna primaria 'guid' de tipo número
  @PrimaryColumn()
  guid: number;

  // Define la columna 'rank' de tipo número
  @Column()
  rank: number;

  // Define la columna 'pnote' de tipo string
  @Column()
  pnote: string;

  // Define la columna 'offnote' de tipo string
  @Column()
  offnote: string;
}