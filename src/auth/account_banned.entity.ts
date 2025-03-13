import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ synchronize: false })
export class AccountBanned extends BaseEntity {
  @PrimaryColumn()
  id: number; // Columna que representa el ID único de la cuenta.

  @PrimaryColumn()
  bandate: number; // Columna que almacena la fecha en que la cuenta fue baneada.

  @Column()
  unbandate: number; // Columna que almacena la fecha en que la cuenta será desbaneada.

  @Column()
  bannedby: string; // Columna que almacena el nombre de la persona que baneó la cuenta.

  @Column()
  banreason: string; // Columna que almacena la razón del baneo.

  @Column()
  active: number; // Columna que indica si el baneo está activo (1) o no (0).
}
