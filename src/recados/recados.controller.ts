import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.recadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }
}
