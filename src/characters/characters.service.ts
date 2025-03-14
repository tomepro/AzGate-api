import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Characters } from './characters.entity';
import { Like, Repository } from 'typeorm';
import { RecoveryItemDTO } from './dto/recovery_item.dto';
import { RecoveryItem } from './recovery_item.entity';
import { Soap } from '../shared/soap';
import { CharactersDto } from './dto/characters.dto';
import { Misc } from '../shared/misc';
import { CharacterBanned } from './character_banned.entity';
import { Worldstates } from './worldstates.entity';

@Injectable()
export class CharactersService {
  constructor(
    // Inyecta el repositorio de 'Characters' usando la conexión 'charactersConnection'
    @InjectRepository(Characters, 'charactersConnection')
    private readonly charactersRepository: Repository<Characters>,
    // Inyecta el repositorio de 'RecoveryItem' usando la conexión 'charactersConnection'
    @InjectRepository(RecoveryItem, 'charactersConnection')
    private readonly recoveryItemRepository: Repository<RecoveryItem>,
    // Inyecta el repositorio de 'CharacterBanned' usando la conexión 'charactersConnection'
    @InjectRepository(CharacterBanned, 'charactersConnection')
    private readonly characterBannedRepository: Repository<CharacterBanned>,
    // Inyecta el repositorio de 'Worldstates' usando la conexión 'charactersConnection'
    @InjectRepository(Worldstates, 'charactersConnection')
    private readonly worldstatesRepository: Repository<Worldstates>,
  ) {}

  // Método para buscar estados del mundo basado en un parámetro
  async search_worldstates(param: Worldstates): Promise<Worldstates[]> {
    return await this.worldstatesRepository.find({
      comment: Like(`%${param.comment}%`),
    });
  }

  // Método para obtener la lista de ítems de recuperación basado en guid y accountId
  async recoveryItemList(
    guid: number,
    accountId: number,
  ): Promise<RecoveryItem[]> {
    const characters = await this.charactersRepository.findOne({
      select: ['guid'],
      where: { account: accountId },
    });

    // Lanza una excepción si el personaje no se encuentra
    if (characters?.guid !== +guid) {
      throw new NotFoundException(['Account with that character not found']);
    }

    return await this.recoveryItemRepository.find({ where: { Guid: guid } });
  }
}