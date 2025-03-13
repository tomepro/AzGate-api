import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AccountPasswordDto {
  readonly passwordCurrent: string; // Campo que almacena la contraseña actual del usuario.

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.&\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  readonly password: string; // Campo que almacena la nueva contraseña del usuario. Debe tener entre 8 y 20 caracteres, incluir al menos una letra mayúscula, una letra minúscula y un número o carácter especial.

  @IsString()
  readonly passwordConfirm: string; // Campo que almacena la confirmación de la nueva contraseña del usuario. Debe ser una cadena de texto.
}
