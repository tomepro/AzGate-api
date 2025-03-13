import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AccountDto {
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[A-Za-z0-9_]+$/, { message: 'Please enter a valid username' })
  readonly username: string; // Campo que almacena el nombre de usuario. Debe tener entre 4 y 20 caracteres y solo puede contener letras, números y guiones bajos.

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  readonly firstName: string; // Campo que almacena el primer nombre del usuario. Debe tener entre 2 y 50 caracteres y ser una cadena de texto.

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  readonly lastName: string; // Campo que almacena el apellido del usuario. Debe tener entre 2 y 50 caracteres y ser una cadena de texto.

  @IsPhoneNumber()
  readonly phone: string; // Campo que almacena el número de teléfono del usuario. Debe ser un número de teléfono válido.

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.&\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  readonly password: string; // Campo que almacena la contraseña del usuario. Debe tener entre 8 y 20 caracteres, incluir al menos una letra mayúscula, una letra minúscula y un número o carácter especial.

  @IsString()
  readonly passwordConfirm: string; // Campo que almacena la confirmación de la contraseña del usuario. Debe ser una cadena de texto.

  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string; // Campo que almacena el correo electrónico del usuario. Debe ser una dirección de correo electrónico válida.
}
