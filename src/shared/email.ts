import { createTransport } from 'nodemailer';
import { fromString } from 'html-to-text';
import { Account } from '../auth/account.entity';

interface IEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}

export class Email {
  private readonly to: string;
  private readonly username: string;
  private readonly url: string;
  private readonly from: string;

  constructor(account: Account, url: string) {
    this.to = account.reg_mail; // Almacena el correo electrónico del destinatario
    this.username = account.username; // Almacena el nombre de usuario del destinatario
    this.url = url; // Almacena la URL para el restablecimiento de contraseña
    this.from = process.env.MAIL_FROM; // Almacena el correo electrónico del remitente
  }

  // Método estático para crear un nuevo transporte de correo y enviar el correo
  private static newTransport(mailOptions: IEmail) {
    return createTransport({
      host: process.env.MAIL_HOST, // Configura el host del servidor de correo
      port: +process.env.MAIL_PORT, // Configura el puerto del servidor de correo
      auth: {
        user: process.env.MAIL_USERNAME, // Configura el nombre de usuario para la autenticación
        pass: process.env.MAIL_PASSWORD, // Configura la contraseña para la autenticación
      },
    }).sendMail(mailOptions); // Envía el correo con las opciones especificadas
  }

  // Método privado para enviar el correo con la plantilla y el asunto especificados
  private async send(template: string, subject: string): Promise<void> {
    const mailOptions: IEmail = {
      from: this.from, // Establece el remitente del correo
      to: this.to, // Establece el destinatario del correo
      subject, // Establece el asunto del correo
      html: template, // Establece el contenido HTML del correo
      text: fromString(template), // Convierte el contenido HTML a texto plano
    };
    await Email.newTransport(mailOptions); // Envía el correo utilizando el transporte configurado
  }

  // Método para enviar el correo de restablecimiento de contraseña
  async sendPasswordReset(): Promise<void> {
    const template = `
            <h1>Forgot your password?</h1>
            <p>Submit a patch request with your new password and password confirm to: <a href="${this.url}">Reset my password</a></p>
            <p>Your password reset token (valid for only 10 minutes)</p>
            <p>If you didn't forget your password, please ignore this email</p>
        `; // Plantilla HTML para el correo de restablecimiento de contraseña

    await this.send(template, 'AzerothJS Reset Password'); // Envía el correo de restablecimiento de contraseña con la plantilla y el asunto especificados
  }
}
