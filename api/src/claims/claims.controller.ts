import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { Prisma, User } from '@tpoai/data-commons';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Private } from 'users/auth/private.decorator';
import { ReqUser } from 'users/auth/req-user.decorator';

@ApiTags('Reclamos')
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @ApiOperation({ summary: '[Solo users] Crear un nuevo reclamo' })
  @Private()
  @Post()
  create(@Body() data: Prisma.ClaimUncheckedCreateInput) {
    return this.claimsService.create(data);
  }

  @ApiOperation({ summary: '[Solo admins] Ver todos los reclamos' })
  @Private({ adminOnly: true })
  @Get('all')
  findAll() {
    return this.claimsService.findAll();
  }

  @ApiOperation({ summary: '[Solo users] Ver reclamos donde estás' })
  @Private()
  @Get()
  findMany(@Query() query: Prisma.ClaimWhereInput, @ReqUser() user: User) {
    return this.claimsService.findMany(user, query);
  }

  @ApiOperation({ summary: '[Solo users] Ver detalles de un reclamo' })
  @Private()
  @Get(':id')
  findOne(@Param('id') id: string, @ReqUser() user: User) {
    return this.claimsService.findOne(+id, user);
  }

  @ApiOperation({ summary: '[Solo admins] Actualizar un reclamo' })
  @Private({ adminOnly: true })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClaimDto: Prisma.ClaimUpdateInput,
  ) {
    return this.claimsService.update(+id, updateClaimDto);
  }

  @ApiOperation({ summary: '[Solo users] Borrar un reclamo' })
  @Private()
  @Delete(':id')
  delete(@Param('id') id: string, @ReqUser() user: User) {
    return this.claimsService.delete(+id, user);
  }
}
