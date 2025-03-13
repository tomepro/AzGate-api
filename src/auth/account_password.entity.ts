import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccountPassword extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number; // Columna que representa el ID único de la cuenta, generado automáticamente, es un valor sin signo.

  @Column({ type: 'timestamp', nullable: true, default: null })
  password_changed_at: Date; // Columna que almacena la fecha y hora en que se cambió la contraseña por última vez.

  @Column({ type: 'timestamp', nullable: true, default: null })
  password_reset_expires: Date; // Columna que almacena la fecha y hora en que expira el token de restablecimiento de contraseña.

  @Column({ nullable: true, default: null, collation: 'utf8_general_ci' })
  password_reset_token: string; // Columna que almacena el token de restablecimiento de contraseña.
}
