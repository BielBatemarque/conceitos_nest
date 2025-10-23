import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor (@InjectRepository(Recado) private readonly recadoRepository: Repository<Recado>) {}

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados; 
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id: id,
      }
    })
    if (recado) return recado
    
    // throw new HttpException("Recado não encontrado", HttpStatus.NOT_FOUND)
    throw new NotFoundException("Recado nao encontrado");
  }

  async create(body: CreateRecadoDto) {
    const newRecado = {
      ...body,
      lido: false,
      data: new Date()
    };
    const recado = this.recadoRepository.create(newRecado);
    return await this.recadoRepository.save(recado);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido ,
      texto: updateRecadoDto?.texto
    }
    const recado = await this.recadoRepository.preload({
      id:id,
      ...partialUpdateRecadoDto
    });

    if (!recado) {
      throw new NotFoundException("Recado não encontrado");
    }

    return await this.recadoRepository.save(recado);

  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOne({
      where:{
        id: id
      }
    });
    
    if (!recado) {
      throw new NotFoundException("Recado não encontrado");
    }
    return this.recadoRepository.remove(recado);
  }
}
