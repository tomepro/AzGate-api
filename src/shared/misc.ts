import { AccountInformation } from '../auth/account_information.entity';
import { BadRequestException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { BigInteger } from 'jsbn';
import * as sha1 from 'js-sha1';
import { getRepository } from 'typeorm';

export class Misc {
  // Método para restar una cantidad de monedas de la cuenta de un usuario
  static async setCoin(coin: number, accountId: number): Promise<void> {
    const accountInformationRepo = getRepository(
      AccountInformation,
      'authConnection',
    );

    const accountInformation = await accountInformationRepo.findOne({
      where: { id: accountId },
    });

    if (!accountInformation || accountInformation.coins < coin) {
      throw new BadRequestException([`You dont have enough coin (${coin})`]);
    }

    accountInformation.coins -= coin;
    await accountInformationRepo.save(accountInformation);
  } // Método para restar una cantidad de monedas de la cuenta de un usuario. Recibe la cantidad de monedas y el ID de la cuenta. Verifica si la cuenta existe y si tiene suficientes monedas. Si no, lanza una excepción. Si tiene suficientes monedas, las resta y guarda la información actualizada en la base de datos.

  // Método para calcular el verificador SRP6
  static calculateSRP6Verifier(
    username: string,
    password: string,
    salt?: Buffer,
  ): Buffer {
    if (!salt) {
      salt = randomBytes(32);
    }

    const N = new BigInteger(
      '894B645E89E1535BBDAD5B8B290650530801B18EBFBF5E8FAB3C82872A3E9BB7',
      16,
    );
    const g = new BigInteger('7', 16);

    const h1 = Buffer.from(
      sha1.arrayBuffer(`${username}:${password}`.toUpperCase()),
    );

    const h2 = Buffer.from(
      sha1.arrayBuffer(Buffer.concat([salt, h1])),
    ).reverse();

    const h2bigint = new BigInteger(h2.toString('hex'), 16);

    const verifierBigint = g.modPow(h2bigint, N);

    let verifier: Buffer = Buffer.from(verifierBigint.toByteArray()).reverse();

    verifier = verifier.slice(0, 32);
    if (verifier.length != 32) {
      verifier = Buffer.concat([verifier], 32);
    }

    return verifier;
  } // Método para calcular el verificador SRP6. Recibe el nombre de usuario, la contraseña y opcionalmente la sal. Si no se proporciona la sal, genera una nueva. Calcula el verificador utilizando el algoritmo SRP6 y devuelve el verificador como un Buffer.

  // Método para obtener los datos de registro SRP6
  static GetSRP6RegistrationData(
    username: string,
    password: string,
  ): Array<Buffer> {
    const salt = randomBytes(32);

    const verifier = this.calculateSRP6Verifier(username, password, salt);

    return [salt, verifier];
  } // Método para obtener los datos de registro SRP6. Recibe el nombre de usuario y la contraseña. Genera una nueva sal y calcula el verificador SRP6. Devuelve un array con la sal y el verificador.

  // Método para verificar el verificador SRP6
  static verifySRP6(
    username: string,
    password: string,
    salt: Buffer,
    verifier: Buffer,
  ): boolean {
    const generated: Buffer = this.calculateSRP6Verifier(
      username,
      password,
      salt,
    );

    return Buffer.compare(generated, verifier) === 0 ? true : false;
  } // Método para verificar el verificador SRP6. Recibe el nombre de usuario, la contraseña, la sal y el verificador. Calcula el verificador utilizando el algoritmo SRP6 y lo compara con el verificador proporcionado. Devuelve true si coinciden y false si no.
}