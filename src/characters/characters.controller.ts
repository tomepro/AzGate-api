import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { getConnection } from 'typeorm';
import { Account } from '../auth/account.decorator';
import { AccountAccess } from '../auth/account_access.entity';
import { AuthGuard } from '../shared/auth.guard';
import { ArenaTeam } from './arena_team.entity';
import { ArenaTeamMember } from './arena_team_member.entity';
import { BattlegroundDeserters } from './battleground_deserters.entity';
import { CharacterArenaStats } from './character_arena_stats.entity';
import { Characters } from './characters.entity';
import { CharactersService } from './characters.service';
import { CharactersDto } from './dto/characters.dto';
import { RecoveryItemDTO } from './dto/recovery_item.dto';
import { Guild } from './guild.entity';
import { GuildMember } from './guild_member.entity';
import { RecoveryItem } from './recovery_item.entity';
import { Worldstates } from './worldstates.entity';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  // Endpoint para obtener los personajes en línea
  @Get('/online')
  async online() {
    // Obtiene los IDs de las cuentas con nivel de GM (Game Master)
    const accountGMs = await getConnection('authConnection')
      .getRepository(AccountAccess)
      .createQueryBuilder('account_access')
      .select(['id'])
      .where('gmlevel > 0')
      .getRawMany();

    const GmIds = accountGMs.map((aa) => aa.id);

    // Obtiene los personajes en línea que no son GMs
    const connection = getConnection('charactersConnection');
    const characters = await connection
      .getRepository(Characters)
      .createQueryBuilder('characters')
      .leftJoinAndSelect(GuildMember, 'gm', 'gm.guid = characters.guid')
      .leftJoinAndSelect(Guild, 'g', 'g.guildid = gm.guildid')
      .where('online = 1 AND account NOT IN (' + GmIds.join(',') + ')')
      .getMany();

    return characters;
  }
}