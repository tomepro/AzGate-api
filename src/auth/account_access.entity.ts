import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ synchronize: false })
export class AccountAccess extends BaseEntity {
  @PrimaryColumn()
  id: number; // Columna que representa el ID único de la cuenta.

  @Column()
  gmlevel: number; // Columna que almacena el nivel de Game Master (GM) de la cuenta.

  @Column()
  RealmID: number; // Columna que almacena el ID del reino al que pertenece la cuenta.

  @Column()
  comment: string; // Columna que almacena comentarios adicionales sobre la cuenta.
}
