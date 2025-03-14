// Importa las clases necesarias de 'typeorm'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export class ArenaTeam extends BaseEntity {
  // Define la columna primaria generada automáticamente 'arenaTeamId' de tipo número
  @PrimaryGeneratedColumn()
  arenaTeamId: number;

  // Define la columna 'name' de tipo string
  @Column()
  name: string;

  // Define la columna 'captainGuid' de tipo número
  @Column()
  captainGuid: number;

  // Define la columna 'type' de tipo número
  @Column()
  type: number;

  // Define la columna 'rating' de tipo número
  @Column()
  rating: number;

  // Define la columna 'seasonGames' de tipo número
  @Column()
  seasonGames: number;

  // Define la columna 'seasonWins' de tipo número
  @Column()
  seasonWins: number;

  // Define la columna 'weekGames' de tipo número
  @Column()
  weekGames: number;

  // Define la columna 'weekWins' de tipo número
  @Column()
  weekWins: number;

  // Define la columna 'rank' de tipo número
  @Column()
  rank: number;

  // Define la columna 'backgroundColor' de tipo número
  @Column()
  backgroundColor: number;

  // Define la columna 'emblemStyle' de tipo número
  @Column()
  emblemStyle: number;

  // Define la columna 'emblemColor' de tipo número
  @Column()
  emblemColor: number;

  // Define la columna 'borderStyle' de tipo número
  @Column()
  borderStyle: number;

  // Define la columna 'borderColor' de tipo número
  @Column()
  borderColor: number;
}