import { IsEmail } from 'class-validator';

export class EmailDto {
  readonly password: string; // Campo que almacena la contraseña del usuario.

  readonly emailCurrent: string; // Campo que almacena el correo electrónico actual del usuario.

  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string; // Campo que almacena el nuevo correo electrónico del usuario. Incluye una validación para asegurar que sea una dirección de correo electrónico válida.

  readonly emailConfirm: string; // Campo que almacena la confirmación del nuevo correo electrónico del usuario.
}
