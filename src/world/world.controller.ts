import { Controller } from '@nestjs/common';
import { WorldService } from './world.service';

@Controller('world') // Define un controlador para manejar las solicitudes HTTP relacionadas con el mundo. Asocia el controlador con la ruta '/world'.
export class WorldController {
  constructor(private worldService: WorldService) {} //Constructor que inyecta el servicio WorldService en el controlador. Se utiliza para acceder a los métodos del servicio desde el controlador.
  // TODO 
}
