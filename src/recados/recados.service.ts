import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor (@InjectRepository(Recado) private readonly recadoRepository: Repository<Recado>) {}

  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Joana',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];

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

  update(id: string, updateRecadoDto: UpdateRecadoDto) {
    const recadosExistenteIndex = this.recados.findIndex(
      (item) => item.id === +id,
    );

    if (recadosExistenteIndex < 0) {
      throw new NotFoundException("Recado não encontrado");
    }

    if (recadosExistenteIndex >= 0) {
      const recadoExistente = this.recados[recadosExistenteIndex];

      this.recados[recadosExistenteIndex] = {
        ...recadoExistente,
        ...updateRecadoDto,
      };
    }

    return this.recados[recadosExistenteIndex];
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
