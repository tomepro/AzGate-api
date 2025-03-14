// Importa las clases necesarias de 'typeorm'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Define la entidad 'Characters' y desactiva la sincronización automática con la base de datos
@Entity({ synchronize: false })
export class Characters extends BaseEntity {
  // Define la columna primaria generada automáticamente 'guid' de tipo número
  @PrimaryGeneratedColumn()
  guid: number;

  // Define la columna 'account' de tipo número
  @Column()
  account: number;

  // Define la columna 'name' de tipo string
  @Column()
  name: string;

  // Define la columna 'race' de tipo número
  @Column()
  race: number;

  // Define la columna 'class' de tipo número
  @Column()
  class: number;

  // Define la columna 'gender' de tipo número
  @Column()
  gender: number;

  // Define la columna 'level' de tipo número
  @Column()
  level: number;

  // Define la columna 'xp' de tipo número
  @Column()
  xp: number;

  // Define la columna 'money' de tipo número
  @Column()
  money: number;

  // Define la columna 'skin' de tipo número
  @Column()
  skin: number;

  // Define la columna 'face' de tipo número
  @Column()
  face: number;

  // Define la columna 'hairStyle' de tipo número
  @Column()
  hairStyle: number;

  // Define la columna 'hairColor' de tipo número
  @Column()
  hairColor: number;

  // Define la columna 'facialStyle' de tipo número
  @Column()
  facialStyle: number;

  // Define la columna 'bankSlots' de tipo número
  @Column()
  bankSlots: number;

  // Define la columna 'restState' de tipo número
  @Column()
  restState: number;
}