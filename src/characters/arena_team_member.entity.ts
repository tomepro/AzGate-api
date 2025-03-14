// Importa las clases necesarias de 'typeorm'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({ synchronize: false })
export class ArenaTeamMember extends BaseEntity {
  // Define la columna primaria generada automáticamente 'arenaTeamId' de tipo número
  @PrimaryGeneratedColumn()
  arenaTeamId: number;

  // Define la columna primaria 'guid' de tipo número
  @PrimaryColumn()
  guid: number;

  // Define la columna 'weekGames' de tipo número
  @Column()
  weekGames: number;

  // Define la columna 'weekWins' de tipo número
  @Column()
  weekWins: number;

  // Define la columna 'seasonGames' de tipo número
  @Column()
  seasonGames: number;

  // Define la columna 'seasonWins' de tipo número
  @Column()
  seasonWins: number;

  // Define la columna 'personalRating' de tipo número
  @Column()
  personalRating: number;
}