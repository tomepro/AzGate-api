import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // Columna que representa el ID único de la cuenta, generado automáticamente.

  @Column()
  username: string; // Columna que almacena el nombre de usuario de la cuenta.

  @Column()
  salt: Buffer; // Columna que almacena la sal utilizada para la verificación de la contraseña.

  @Column()
  verifier: Buffer; // Columna que almacena el verificador utilizado para la verificación de la contraseña.

  @Column()
  reg_mail: string; // Columna que almacena el correo electrónico registrado de la cuenta.
}
