import { Controller } from '@nestjs/common';
import { WebsiteService } from './website.service';

@Controller('website')
export class WebsiteController { // Define un controlador para manejar las solicitudes HTTP relacionadas con el sitio web. Asocia el controlador con la ruta '/website'.
  constructor(private websiteService: WebsiteService) {} // Constructor que inyecta el servicio WebsiteService en el controlador. Se utiliza para acceder a los métodos del servicio desde el controlador.
}
