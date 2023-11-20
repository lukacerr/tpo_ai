import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { Prisma, User } from '@tpoai/data-commons';
import { Private } from 'users/auth/private.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReqUser } from 'users/auth/req-user.decorator';

@ApiTags('Edificios/unidades/comodidades')
@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @ApiOperation({ summary: '[Solo admins] Crear un nuevo edificio' })
  @Private({ adminOnly: true })
  @Post()
  create(@Body() data: Prisma.BuildingCreateInput) {
    return this.buildingsService.create(data);
  }

  @ApiOperation({ summary: 'Listar edificios donde estás' })
  @Private()
  @Get()
  findMany(@ReqUser() user: User) {
    return this.buildingsService.findMany(user);
  }

  @ApiOperation({ summary: 'Ver detalles de un edificio' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(+id);
  }

  @ApiOperation({ summary: '[Solo admins] Actualizar un edificio' })
  @Private({ adminOnly: true })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.BuildingUpdateInput) {
    return this.buildingsService.update(+id, data);
  }

  @ApiOperation({ summary: '[Solo admins] Borrar un edificio' })
  @Private({ adminOnly: true })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingsService.remove(+id);
  }
}
