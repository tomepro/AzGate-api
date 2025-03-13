import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AccountInformation extends BaseEntity {
  @PrimaryColumn({ unsigned: true, default: 0 })
  id: number; // Columna que representa el ID único de la cuenta, es un valor sin signo y tiene un valor predeterminado de 0.

  @Column({ type: 'varchar', default: '', length: 50 })
  first_name: string; // Columna que almacena el primer nombre del usuario, es de tipo varchar con una longitud máxima de 50 caracteres y tiene un valor predeterminado de una cadena vacía.

  @Column({ type: 'varchar', default: '', length: 50 })
  last_name: string; // Columna que almacena el apellido del usuario, es de tipo varchar con una longitud máxima de 50 caracteres y tiene un valor predeterminado de una cadena vacía.

  @Column({ type: 'varchar', default: '', length: 25, unique: true })
  phone: string; // Columna que almacena el número de teléfono del usuario, es de tipo varchar con una longitud máxima de 25 caracteres, es único y tiene un valor predeterminado de una cadena vacía.

  @Column({ type: 'int', default: 0, unsigned: true })
  coins: number; // Columna que almacena la cantidad de monedas del usuario, es de tipo int, es un valor sin signo y tiene un valor predeterminado de 0.

  @Column({ type: 'int', default: 0, unsigned: true })
  points: number; // Columna que almacena la cantidad de puntos del usuario, es de tipo int, es un valor sin signo y tiene un valor predeterminado de 0.
}
