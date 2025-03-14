// Importa las clases necesarias de 'typeorm'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Define la entidad 'Guild' y desactiva la sincronización automática con la base de datos
@Entity({ synchronize: false })
export class Guild extends BaseEntity {
  // Define la columna primaria generada automáticamente 'guildid' de tipo número
  @PrimaryGeneratedColumn()
  guildid: number;

  // Define la columna 'name' de tipo string
  @Column()
  name: string;

  // Define la columna 'leaderguid' de tipo número
  @Column()
  leaderguid: number;

  // Define la columna 'EmblemStyle' de tipo número
  @Column()
  EmblemStyle: number;

  // Define la columna 'EmblemColor' de tipo número
  @Column()
  EmblemColor: number;

  // Define la columna 'BorderStyle' de tipo número
  @Column()
  BorderStyle: number;

  // Define la columna 'BorderColor' de tipo número
  @Column()
  BorderColor: number;

  // Define la columna 'BackgroundColor' de tipo número
  @Column()
  BackgroundColor: number;

  // Define la columna 'info' de tipo string
  @Column()
  info: string;

  // Define la columna 'motd' de tipo string
  @Column()
  motd: string;

  // Define la columna 'createdate' de tipo número
  @Column()
  createdate: number;

  // Define la columna 'BankMoney' de tipo número
  @Column()
  BankMoney: number;
}