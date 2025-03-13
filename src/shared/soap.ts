import { request } from 'http';
import { Logger } from '@nestjs/common';

export class Soap {
  // Método estático para enviar un comando SOAP
  static command(command: string): void {
    const req = request(
      {
        hostname: process.env.SOAP_HOST_NAME, // Configura el nombre del host del servidor SOAP
        port: +process.env.SOAP_PORT, // Configura el puerto del servidor SOAP
        method: 'POST', // Configura el método HTTP como POST
        auth: `${process.env.SOAP_USERNAME}:${process.env.SOAP_PASSWORD}`, // Configura la autenticación básica con el nombre de usuario y la contraseña
      },
      (res) => {
        if (res.statusCode !== 200) {
          Logger.error(`${res.statusMessage} ${res.statusCode}`, null, 'Soap'); // Registra un error si la respuesta no es 200 OK
        }
      },
    );

    req.write(Soap.execute(command)); // Escribe el comando SOAP en la solicitud
    req.end(); // Finaliza la solicitud
  }

  // Método privado para generar el cuerpo del mensaje SOAP
  private static execute(command: string): string {
    return `
        <?xml version="1.0" encoding="utf-8"?>
        <SOAP-ENV:Envelope
        xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance"
        xmlns:xsd="http://www.w3.org/1999/XMLSchema"
        xmlns:ns1="${process.env.SOAP_URI}">
    
        <SOAP-ENV:Body>
            <ns1:executeCommand><command>${command}</command></ns1:executeCommand>
        </SOAP-ENV:Body>
    
        </SOAP-ENV:Envelope>
    `; // Genera el cuerpo del mensaje SOAP con el comando proporcionado
  }
}
